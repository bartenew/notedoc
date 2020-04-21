<template >
  <md-card md-with-hover class="note">
    <md-card-area class="note-body">
      <div class="note-date">
        <span> {{ createdDate }} </span>
      </div>
      <md-card-content>
        <div @click="edit">
          {{ body }}
        </div>
      </md-card-content>
    </md-card-area>
    <md-card-actions class="note-actions">
      <md-button @click="edit">Edit</md-button>
      <md-button @click="remove">Delete</md-button>
    </md-card-actions>
  </md-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Note from '@/models/Note';
import ShowNote from './ShowNote.vue';
import NoteFormat from '@/models/NoteFormat';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';

const notesState = getModule(Notes);

@Component({})
export default class ThumbNote extends Vue {
  @Prop() private note!: Note;
  private showShowNote = false;

  get createdDate() {
    return this.note.createdAt.toLocaleString();
  }

  get body(): string {
    return this.note.body.slice(0, 300) + '...';
  }

  remove() {
    notesState.deleteNote(this.note);
  }

  edit() {
    this.$router.push({ path: `view/${this.note.id}` });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.note-body {
  height: 200px;
}
.note {
  vertical-align: top;
  width: 400px;
  height: 250px;
  margin: 20px;
  display: inline-block;
  word-wrap: break-word;
  cursor: pointer;
  @import url('https://raw.githubusercontent.com/darshandsoni/asciidoctor-skins/gh-pages/css/material-red.css');
}
.note-actions {
  position: absolute;
  bottom: 0;
}
</style>
