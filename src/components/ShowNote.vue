<template>
  <div>
    <header>
      <p class="modal-card-title">{{ createdDate }}</p>
    </header>
    <section v-html="body"></section>
    <footer>
      <router-link to="/">
        <button class="button" type="button">
          Close
        </button>
      </router-link>
    </footer>
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
    console.log(note);
    return note;
  }

  get body() {
    const options = {
      attributes: { icons: 'font' },
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
</style>
