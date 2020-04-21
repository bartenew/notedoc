<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-field>
        <md-textarea class="editor" v-model="note.body" />
      </md-field>
      <md-button class="md-primary md-raised save">Save</md-button>
    </div>
    <div class="md-layout-item md-size-5"></div>
    <div class="md-layout-item">
      <router-link to="/">
        <md-icon class="close md-size-1x">
          close
        </md-icon>
      </router-link>
      <div>
        <span class="modal-card-title">{{ createdDate }}</span>
      </div>
      <section v-html="body"></section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Note from '@/models/Note';
import NoteFormat from '@/models/NoteFormat';
import asciidoctor from 'asciidoctor';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';

const notesState = getModule(Notes);
const asciiConverter = asciidoctor();

@Component({})
export default class ShowNote extends Vue {
  get note(): Note {
    const note = notesState.notes.filter(
      note => note.id === this.$route.params.id,
    )[0];
    return note;
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
  @import url('https://raw.githubusercontent.com/darshandsoni/asciidoctor-skins/gh-pages/css/material-red.css');
}
.editor {
  width: 100%;
  height: 300px;
}
textarea {
  resize: vertical;
}
.close {
  float: right;
}
.save {
  float: right;
}
</style>
