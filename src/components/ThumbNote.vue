<template>
  <md-chip
    :class="[isInEdit() ? 'md-primary' : '']"
    @click="edit"
    @md-delete="remove"
    class="note"
    md-clickable
    md-deletable
    md-with-hover
  >
    <md-progress-spinner
      md-mode="indeterminate"
      v-if="!note.isSynced"
    ></md-progress-spinner>
    <div v-else>{{ createdDate }}</div>
    {{ body }}
  </md-chip>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Note from '@/models/Note';
  import { getModule } from 'vuex-module-decorators';
  import Notes from '@/store/modules/notes-module';

  const notesState = getModule(Notes);

  @Component({})
  export default class ThumbNote extends Vue {
    @Prop() private note!: Note;

    get createdDate() {
      return this.note.createdAt.toLocaleString();
    }

    get body(): string {
      return this.note.body.slice(0, 15) + '...';
    }

    isInEdit() {
      return this.note.id == notesState.inEditNote.id;
    }

    remove() {
      notesState.deleteNote(this.note);
    }

    edit() {
      notesState.updateEditor(this.note);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .note {
    width: 200px;
    height: 75px;
    margin-bottom: 10px;
  }
</style>
