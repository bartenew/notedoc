<template>
  <div
    class="md-layout"
    @keydown.enter.alt.exact="save"
    @keydown.meta.enter.exact="save"
  >

    <div class="md-layout-item md-size-45 md-small-size-100" @scroll.capture="scrollEditor">
      <prism-editor class="editor" language="adoc" v-model="note.body"></prism-editor>
    </div>
    <div class="md-layout-item md-size-5"></div>
    <AsciiDocPreview
      :body="note.body"
      class="md-layout-item md-size-45 md-small-size-100 preview"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';
import PrismEditor from 'vue-prism-editor';
import AsciiDocPreview from '@/components/AsciiDocPreview.vue';

const notesState = getModule(Notes);

@Component({
  components: {
    PrismEditor,
    AsciiDocPreview,
  },
})
export default class AddNote extends Vue {
  private tags: string[] = [];

  get note() {
    return notesState.inEditNote;
  }

  get editor(): Element {
    return this.$el.querySelector('.editor')!;
  }

  get preview(): Element {
    return this.$el.querySelector('.preview')!;
  }

  scrollEditor(e: Event) {
    const source = e.srcElement as Element;
    this.preview.scrollTop = source.scrollTop;
  }
  scrollPreview(e: Event) {
    const source = e.srcElement as Element;
    this.editor.scrollTop = source.scrollTop;
  }
}
</script>

<style scoped lang="scss">
.editor {
  height: 90vh;
}
.preview {
  height: 90vh;
  overflow: auto;
}
</style>
