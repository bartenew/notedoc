import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Note from '@/models/Note';
import Store from '../store';
import googleService from '@/google-service.ts';
import uuid from '../utils';

const RESET_STATE = 'RESET_STATE';
const SAVE_NOTE = 'SAVE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const SET_DRIVE_SYNCED = 'SET_DRIVE_SYNCED';
const UPDATE_IN_EDIT_NOTE = 'UPDATE_IN_EDIT_NOTE';

const DEFAULT_BODY = `Hello, AsciiDoc!
~~~~~~~~~~~~~~~~
- Take notes
- Save to Google Drive
- Preview rendered notes in Edit`;

@Module({ name: 'notes-state', store: Store, dynamic: true, namespaced: true })
export default class Notes extends VuexModule {
  notes: Note[] = [];
  filter = '';
  isDriveSynced = false;
  inEditNote: Note = new Note(uuid(), DEFAULT_BODY, new Date());

  @Mutation
  // eslint-disable-next-line
  [RESET_STATE](payload: any) {
    this.inEditNote = new Note(uuid(), DEFAULT_BODY, new Date());
    if(payload.editorOnly) {
      return;
    }
    this.notes = [];
    this.filter = '';
    this.isDriveSynced = false;
    this.inEditNote = new Note(uuid(), DEFAULT_BODY, new Date());
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

  @Action
  updateEditor(note: Note) {
    this.context.commit(UPDATE_IN_EDIT_NOTE, note);
  }

  @Action
  resetState() {
    this.context.commit(RESET_STATE);
  }
  @Action
  resetEditor() { // how to do spread operator???
    this.context.commit(RESET_STATE, { editorOnly: true })
  }

  @Action
  saveNote(note: Note) {
    note.isSynced = false;
    this.context.commit(SAVE_NOTE, note);
    googleService
      .syncNote(note)
      .then(driveSyncedNote => this.context.commit(SAVE_NOTE, driveSyncedNote));
  }
}
