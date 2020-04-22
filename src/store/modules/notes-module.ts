import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Note from '@/models/Note';
import Store from '../store';
import NoteFormat from '@/models/NoteFormat';
import googleService from '@/google-service.ts'

function uuid() {
  let u='',i=0;
  while(i++<36) {
      const c='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1],r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
      u+=(c=='-'||c=='4')?c:v.toString(16)
  }
  return u;
}


@Module({ name: "notes-state", store: Store, dynamic: true, namespaced: true })
export default class Notes extends VuexModule {
  notes: Note[] = [];
  filter = '';

  get filteredNotes() {
    return this.notes.filter(n => n.body.includes(this.filter))
  }

  @Action
  async deleteNote(deletedNote: Note) {
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
  updateNote(updatedNote: Note) {
    const foundNote = this.notes.filter(n => n.id == updatedNote.id)[0]
    if (foundNote) {
      foundNote.body = updatedNote.body;
      foundNote.driveFileId = updatedNote.driveFileId;
    }
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
      id: uuid(),
      body: body,
      format: format,
      tags: tags,
      createdAt: new Date(),
    };

    this.context.commit('addNote', newNote)
    googleService.syncNote(newNote).then(driveNote => this.updateNote(driveNote));
  }

  @Action({ commit: 'setFilter' })
  applySearch(searchInput: string) {
    return searchInput;
  }
}