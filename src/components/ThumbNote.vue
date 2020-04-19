<template>
  <section>
    <div class="note">
    <button @click="deleteNote">Delete</button>

      <div class="note-date">
        <b-tag> {{ createdDate }} </b-tag>
      </div>
      <div class="note-body" @click="openNote()">
        <p>
          {{ note.body }}
        </p>
      </div>

    </div>
  </section>
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

  deleteNote() {
    notesState.context.commit('deleteNote', this.note);
  }

  openNote() {
    this.$router.push({ path: `view/${this.note.id}` });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.note {
  box-shadow: 10px 10px 5px grey;
  border-radius: 5px;

  max-height: 15em;
  overflow: hidden;
}
.note-body {
  padding: 3em;
  cursor: pointer;
}
.note-date {
  float: right;
}

.delete-btn {
  float: right;
  cursor: pointer;
}
</style>
