<template>
  <div @keydown.enter.alt.exact="save" @keydown.meta.enter.exact="save">
    <div class="editor">
      <prism-editor language="adoc" v-model="body"></prism-editor>
    </div>
    <div class="columns">
      <span class="column is-one-third" />
      <md-button class="md-primary md-raised" @click="save">Save</md-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';
import PrismEditor from 'vue-prism-editor';

const notesState = getModule(Notes);

@Component({
  components: {
    PrismEditor,
  },
})
export default class NoteAdd extends Vue {
  private body = `Hello, AsciiDoc!
~~~~~~~~~~~~~~~~
- Take notes
- Save to Google Drive
- Preview rendered notes in Edit`;
  private tags: string[] = [];

  private save() {
    notesState.addNote(this.body, this.tags);
  }
}
</script>

<style scoped lang="scss">
.editor {
  height: 30vh;
}
</style>
