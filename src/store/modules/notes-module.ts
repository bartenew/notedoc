import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Note from '@/models/Note';
import Store from '../store';
import NoteFormat from '@/models/NoteFormat';
import googleService from '@/google-service.ts';
import uuid from '../utils';

const ADD_NOTE = 'ADD_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const SET_FILTER = 'SET_FILTER';
const DELETE_NOTE = 'DELETE_NOTE';
const SET_DRIVE_SYNCED = 'SET_DRIVE_SYNCED';

@Module({ name: 'notes-state', store: Store, dynamic: true, namespaced: true })
export default class Notes extends VuexModule {
  notes: Note[] = [];
  filter = '';
  isDriveSynced = false;

  get filteredNotes() {
    return this.notes.filter(n => n.body.includes(this.filter));
  }

  @Mutation
  [SET_DRIVE_SYNCED](status: boolean) {
    this.isDriveSynced = status;
  }

  @Mutation
  [ADD_NOTE](note: Note) {
    this.notes.push(note);
  }

  @Mutation
  [UPDATE_NOTE](updatedNote: Note) {
    const foundNote = this.notes.find(n => n.id == updatedNote.id);
    if (foundNote) {
      foundNote.body = updatedNote.body;
      foundNote.driveFileId = updatedNote.driveFileId;
      foundNote.isSynced = updatedNote.isSynced;
    }
  }

  @Mutation
  [SET_FILTER](filter: string) {
    this.filter = filter;
  }

  @Mutation
  [DELETE_NOTE](deletedNote: Note) {
    this.notes.splice(this.notes.indexOf(deletedNote), 1);
  }

  @Action
  deleteNote(deletedNote: Note) {
    googleService.deleteNote(deletedNote)?.then(resp => {
      if (resp.status == 204) {
        this.context.commit(DELETE_NOTE, deletedNote);
      }
    });
  }

  @Action
  updateNote(updatedNote: Note) {
    updatedNote.isSynced = false;
    this.context.commit(UPDATE_NOTE, updatedNote);
    googleService
      .syncNote(updatedNote)
      .then(driveSyncedNote => this.context.commit(UPDATE_NOTE, driveSyncedNote));
  }

  @Action
  addNote(body: string, tags: Array<string>) {
    const format = NoteFormat.ASCIIDOC;

    const newNote = new Note(uuid(), body, format, new Date());

    this.context.commit(ADD_NOTE, newNote);
    googleService
      .syncNote(newNote)
      .then(driveNote => this.context.commit(UPDATE_NOTE, driveNote));
  }

  @Action({ commit: SET_FILTER })
  applySearch(searchInput: string) {
    return searchInput;
  }
}
