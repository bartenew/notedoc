<template>
  <div class="home">
    <NoteAdd />
    <div class="section">
      <NoteSearch />
    </div>
    <div class="rows is-multiline">
      <ThumbNote
        class="column is-full"
        :note="note"
        v-for="note in notes"
        :key="note.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Note from '@/models/Note';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';
import ThumbNote from '../components/ThumbNote.vue';
import NoteAdd from '../components/NoteAdd.vue';
import NoteSearch from '../components/NoteSearch.vue';

const notesState = getModule(Notes);

@Component({
  components: { ThumbNote, NoteAdd, NoteSearch },
})
export default class Home extends Vue {

  get notes(): Note[] {
    return notesState.filteredNotes;
  }
}
</script>
<style scoped lang="scss">

</style>
