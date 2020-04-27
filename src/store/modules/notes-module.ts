import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Note from '@/models/Note';
import Store from '../store';
import googleService from '@/google-service.ts';
import { uuid } from '@/store/utils';
import { DEFAULT_NOTE_BODY } from '@/store/default-note';

const RESET_STATE = 'RESET_STATE';
const SAVE_NOTE = 'SAVE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const SET_DRIVE_SYNCED = 'SET_DRIVE_SYNCED';
const UPDATE_IN_EDIT_NOTE = 'UPDATE_IN_EDIT_NOTE';
const CHANGE_ADOC_THEME = 'CHANGE_ADOC_THEME';


@Module({ name: 'notes-state', store: Store, dynamic: true, namespaced: true })
export default class Notes extends VuexModule {
  notes: Note[] = [];
  filter = '';
  isDriveSynced = false;
  inEditNote: Note = new Note(uuid(), DEFAULT_NOTE_BODY, new Date());
  adocTheme = 'asciidoctor';

  @Mutation
  // eslint-disable-next-line
  [RESET_STATE](payload: any) {
    this.inEditNote = new Note(uuid(), DEFAULT_NOTE_BODY, new Date());
    if (payload.editorOnly) {
      return;
    }
    this.notes = [];
    this.filter = '';
    this.isDriveSynced = false;
    this.inEditNote = new Note(uuid(), DEFAULT_NOTE_BODY, new Date());
    this.adocTheme = 'default-theme';
  }

  @Mutation
  [CHANGE_ADOC_THEME](theme: string) {
    this.adocTheme = theme;
  }

  @Mutation
  [UPDATE_IN_EDIT_NOTE](note: Note) {
    this.inEditNote = note;
  }

  @Mutation
  [SET_DRIVE_SYNCED](status: boolean) {
    this.isDriveSynced = status;
  }

  @Mutation
  [SAVE_NOTE](note: Note) {
    const foundNote = this.notes.find(n => n.id == note.id);
    if (foundNote) {
      foundNote.body = note.body;
      foundNote.driveFileId = note.driveFileId;
      foundNote.isSynced = note.isSynced;
    } else {
      this.notes.push(note);
    }
  }

  @Mutation
  [DELETE_NOTE](deletedNote: Note) {
    if (deletedNote.driveFileId == this.inEditNote.driveFileId) {
      this.inEditNote.driveFileId = null;
    }
    this.notes.splice(this.notes.indexOf(deletedNote), 1);
  }

  @Action
  async deleteNote(deletedNote: Note) {
    this.context.commit(DELETE_NOTE, deletedNote);
    await googleService.deleteNote(deletedNote);
  }

  @Action({ commit: UPDATE_IN_EDIT_NOTE })
  updateEditor(note: Note) {
    return note;
  }

  @Action({ commit: CHANGE_ADOC_THEME })
  changeAdocTheme(theme: string) {
    return theme;
  }

  @Action({ commit: RESET_STATE })
  resetState() {
    return {};
  }

  @Action({ commit: RESET_STATE })
  resetEditor() {
    // how to do spread operator???
    return { editorOnly: true };
  }

  @Action({ commit: SET_DRIVE_SYNCED })
  setDriveSynced(status: boolean) {
    return status;
  }

  @Action({ commit: SAVE_NOTE })
  async saveNote(note: Note) {
    note.isSynced = false;
    this.context.commit(SAVE_NOTE, note);
    return await googleService.syncNote(note);
  }
}
