<template>
  <div class="home">
    <NoteAdd />
    <div class="section">
      <SearchNote />
    </div>
    <md-divider></md-divider>
    <div>
      <md-progress-bar md-mode="query" v-if="!notesState.isDriveSynced"></md-progress-bar>
      <ThumbNote
        class="column is-full"
        :note="note"
        v-for="(note, idx) in notesState.filteredNotes"
        :key="idx"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';
import ThumbNote from '../components/ThumbNote.vue';
import NoteAdd from '../components/NoteAdd.vue';
import SearchNote from '../components/SearchNote.vue';


@Component({
  components: { ThumbNote, NoteAdd, SearchNote },
})
export default class Home extends Vue {
  private notesState: Notes = getModule(Notes);
}
</script>
<style scoped lang="scss"></style>
