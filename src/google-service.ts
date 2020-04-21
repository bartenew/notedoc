import Note from './models/Note';
import NoteFormat from './models/NoteFormat';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';
import UserState from '@/store/modules/user-module';

const userState = getModule(UserState);
const notesState = getModule(Notes);

declare global {
  interface Window {
    gapiLoaded: any;
  }
}
export class GoogleService {
  gapi: any;
  private DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  ];
  private CLIENT_ID =
    '454534668790-mbbh75m09a1cta477m87mbplbv6n4unm.apps.googleusercontent.com';
  private SCOPES = [
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
  ];
  constructor() {
    this.loadGapi();
  }
  //https://github.com/bosancz/bosan.cz/blob/2356157ed2fa30c2d253cc439dd314361a428b67/client-admin/src/
  async loadGapi() {
    // wait for the GAPI <script> to be loaded
    const gapi: any = await new Promise(resolve => {
      if (window.gapi) {
        resolve(window.gapi);
      } else {
        window.gapiLoaded = function() {
          resolve(window.gapi);
        };
      }
    });
    // once gapi is loaded, initialize auth
    await new Promise(resolve => {
      gapi.load('client:auth2', resolve);
    });

    try {
      await gapi.client.init({
        discoveryDocs: this.DISCOVERY_DOCS,
        clientId: this.CLIENT_ID,
        scope: this.SCOPES.join(' '),
      });
    } catch (googleErr) {
      const err = Error(googleErr.details);
      throw err;
    }
    this.gapi = gapi;
    this.isSignedIn().then(val => {
      userState.updateSignIn(val);
      val && this.syncNotesFromDrive();
    });
  }

  getAuthClient(): gapi.auth2.GoogleAuth {
    return this.gapi.auth2.getAuthInstance();
  }

  getDriveClient(): gapi.client.drive.FilesResource {
    return this.gapi.client.drive.files;
  }

  async signIn(): Promise<string> {
    const auth2 = this.getAuthClient();
    await auth2.signIn();
    const token = auth2.currentUser.get().getAuthResponse(true).id_token;
    userState.updateSignIn(true);
    this.syncNotesFromDrive();
    return token;
  }

  async signOut(): Promise<void> {
    const auth2 = this.getAuthClient();
    if (auth2) await auth2.signOut();
    userState.updateSignIn(false);
  }

  async isSignedIn(): Promise<boolean> {
    const auth2 = this.getAuthClient();
    return auth2 ? await auth2.isSignedIn.get() : false;
  }

  syncAllNotes(notes: Note[]) {
    notes.forEach(this.syncNote);
  }

  async syncNote(note: Note) {
    if (note.driveFileId) {
      await this.updateNote(note);
    } else {
      const metadata = {
        name: note.id + '.adoc',
        mimeType: 'text/plain;charset=UTF-8',
        parents: ['appDataFolder'],
      };
      const fileId = (
        await this.getDriveClient().create({
          resource: metadata,
        })
      ).result.id;
      note.driveFileId = fileId;
      await this.updateNote(note);
    }
    return note;
  }

  private updateNote(note: Note) {
    return this.gapi.client.request({
      path: '/upload/drive/v3/files/' + note.driveFileId,
      method: 'PATCH',
      params: {
        uploadType: 'media',
      },
      body: note.body,
    });
  }

  syncNotesFromDrive(): Promise<Note[]> {
    return new Promise<Note[]>(resolve => {
      this.getDriveClient()
        .list({
          spaces: 'appDataFolder',
          fields: '*',
        })
        .then(resp => {
          const files = resp.result.files;
          if (!files) throw new Error('no files');

          const notes: Note[] = [];

          files
            .filter(file => file.fileExtension == 'adoc')
            .forEach(async file => {
              const note: Note = {
                body: await this.getNoteContent(file.id),
                createdAt: new Date(),
                tags: [],
                id: file.id + '',
                driveFileId: file.id,
                format: NoteFormat.ASCIIDOC,
              };
              notesState.addNote(note);
            });
          resolve(notes);
        });
    });
  }
  async getNoteContent(driveId?: string): Promise<string> {
    if (!driveId) return '';
    return (
      await this.getDriveClient().get({
        fileId: driveId,
        alt: 'media',
      })
    ).body;
  }

  deleteNote(note: Note) {
    if (note.driveFileId) {
      return this.getDriveClient().delete({ fileId: note.driveFileId });
    }
  }
}
const googleService = new GoogleService();

export default googleService;
