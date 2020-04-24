<template>
  <div class="home">
    <div>
      <md-progress-bar
        md-mode="query"
        v-if="!notesState.isDriveSynced && userState.isSignedIn"
      ></md-progress-bar>
      <ThumbNote
        class="column is-full"
        :note="note"
        v-for="(note, idx) in notesState.notes"
        :key="idx"
      />
    </div>
    <md-divider></md-divider>
    <AddNote class="md-size-90"/>
    <div class="section">
      <!-- <SearchNote /> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators';
  import Notes from '@/store/modules/notes-module';
  import ThumbNote from '../components/ThumbNote.vue';
  import AddNote from '../components/AddNote.vue';
  import UserState from '../store/modules/user-module';

  @Component({
    components: { ThumbNote, AddNote },
  })
  export default class Home extends Vue {
    private notesState: Notes = getModule(Notes);
    private userState: UserState = getModule(UserState);
  }
</script>
<style scoped lang="scss"></style>
