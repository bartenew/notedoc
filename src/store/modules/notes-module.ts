import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Note from '@/models/Note';
import Store from '../store';
import NoteFormat from '@/models/NoteFormat';
import googleService from '@/google-service.ts'


@Module({ name: "notes-state", store: Store, dynamic: true, namespaced: true })
export default class Notes extends VuexModule {
  notes: Array<Note> = [];
  filter = '';

  get filteredNotes() {
    return this.notes.filter(n => n.body.includes(this.filter))
  }

  @Mutation
  deleteNote(deletedNote: Note) {
    googleService.deleteNote(deletedNote)?.then(resp => {
      if (resp.status == 204) {
        this.notes = this.notes.filter(note => note.id != deletedNote.id)
      }
    })
    
  }

  @Mutation
  addNote(note: Note) {
    this.notes.push(note);
  }

  @Mutation
  private setFilter(filter: string) {
    this.filter = filter
  }

  @Action
  newNote(body: string, tags: Array<string>) {
    const format =
       NoteFormat.ASCIIDOC;
    
    const newNote: Note = {
      id: "" + new Date().getTime(),
      body: body,
      format: format,
      tags: tags,
      createdAt: new Date(),
    };

    this.context.commit('addNote', newNote)
    googleService.syncNote(newNote)
  }

  @Action({ commit: 'setFilter' })
  applySearch(searchInput: string) {
    return searchInput;
  }
}
