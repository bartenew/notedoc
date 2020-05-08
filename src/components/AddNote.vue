<template>
  <div class="md-layout">

    <div @scroll.capture="syncScroll" class="md-layout-item md-size-45 md-small-size-100 editor--wrapper">
      <prism-editor class="editor" language="adoc" v-model="note.body"></prism-editor>
    </div>
    <div class="md-layout-item md-size-5"></div>

    <AsciiDocPreview
      @scroll.native="syncScroll"
      :theme="adocTheme"
      :body="note.body"
      class="md-layout-item md-size-50 md-small-size-100 preview"
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
    get note() {
      return notesState.inEditNote;
    }

    get adocTheme() {
      return notesState.adocTheme;
    }

    get editor(): Element {
      return this.$el.querySelector('.editor')!;
    }

    get preview(): Element {
      return this.$el.querySelector('.preview')!;
    }

    syncScroll(e: Event) {
      const source = e.srcElement as Element;
      console.log(source.classList)
      const scrollPct = Number((source.scrollTop / source.scrollHeight).toFixed(2));
      if (source.classList.contains("editor")) {
        this.preview.scrollTop = this.preview.scrollHeight * scrollPct;
      } else {
        this.editor.scrollTop = this.editor.scrollHeight * scrollPct;
      }
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
