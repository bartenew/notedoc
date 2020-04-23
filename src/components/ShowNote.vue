<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-45" @scroll.capture="scrollEditor">
      <div>
        <prism-editor
          class="editor"
          language="adoc"
          v-model="note.body"
        ></prism-editor>
      </div>
      <div class="controls">
        <md-button to="/" class="md-raised back">Back</md-button>
        <md-button
          @click="update"
          v-if="note.isSynced"
          class="md-primary md-raised"
          >Save</md-button
        >
        <md-progress-spinner v-else md-mode="indeterminate" :md-diameter="45" />
      </div>
    </div>
    <div class="md-layout-item md-size-5"></div>
    <div
      class="md-layout-item md-size-45 preview"
      @scroll.capture="scrollPreview"
      ref="preview"
    >
      <router-link to="/">
        <md-icon class="close md-size-2x">
          close
        </md-icon>
      </router-link>
      <div>
        <span class="modal-card-title">{{ createdDate }}</span>
      </div>
      <div v-html="body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import PrismEditor from 'vue-prism-editor';
import asciidoctor from 'asciidoctor';
import { Component, Vue } from 'vue-property-decorator';
import Note from '@/models/Note';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';

const notesState = getModule(Notes);
const asciiConverter = asciidoctor();

@Component({
  components: {
    PrismEditor,
  },
})
export default class ShowNote extends Vue {
  get note(): Note {
    const foundNote = notesState.notes.find(n => n.id == this.$route.params.id);
    if (!foundNote) throw Error('Note not found ' + this.$route.params.id);
    return foundNote;
  }

  get body() {
    const options = {
      attributes: { icons: 'font', showtitle: true },
    };
    return asciiConverter.convert(this.note.body, options);
  }

  get createdDate() {
    return this.note.createdAt.toLocaleString();
  }

  get editor(): Element {
    return this.$el.querySelector('.editor')!;
  }

  get preview(): Element {
    return this.$refs.preview as Element;
  }

  scrollEditor(e: Event) {
    const source = e.srcElement as Element;
    console.log(source);
    console.log(this.editor);
    this.preview.scrollTop = source.scrollTop;
  }
  scrollPreview(e: Event) {
    const source = e.srcElement as Element;
    this.editor.scrollTop = source.scrollTop;
  }

  update() {
    notesState.updateNote(this.note);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.preview {
  word-wrap: break-word;
  overflow-y: scroll;
  height: 80vh;
}
.editor {
  height: 80vh;
}

.close {
  float: right;
}
.controls {
  float: right;
}
</style>
