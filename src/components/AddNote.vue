<template>
  <div class="md-layout">

    <div @scroll.capture="scrollEditor" class="md-layout-item md-size-45 md-small-size-100">
      <prism-editor class="editor" language="adoc" v-model="note.body"></prism-editor>
    </div>
    <div class="md-layout-item md-size-5"></div>
    <AsciiDocPreview
      @scroll.native="scrollPreview"
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

<style lang="scss" scoped>
  .editor {
    height: 90vh;
  }

  .preview {
    height: 90vh;
    overflow: auto;
  }
</style>
