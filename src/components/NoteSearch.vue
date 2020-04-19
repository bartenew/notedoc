<template>
  <b-field>
    <b-input
      placeholder="Search..."
      type="search"
      icon="magnify"
      v-model="search"
      icon-clickable
    >
    </b-input>
  </b-field>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';

const notesState = getModule(Notes);

@Component
export default class NoteAdd extends Vue {
  private search = '';

  @Watch('search')
  applyFilter() {
    notesState.applySearch(this.search);
  }
}
</script>

<style scoped lang="scss"></style>
