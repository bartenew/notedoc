<template>
  <md-field>
    <md-input
      placeholder="Search..."
      type="search"
      icon="magnify"
      v-model="search"
      icon-clickable
    >
    </md-input>
  </md-field>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';

const notesState = getModule(Notes);

@Component
export default class SearchNote extends Vue {
  private search = '';

  @Watch('search')
  applyFilter() {
    notesState.applySearch(this.search);
  }
}
</script>

<style scoped lang="scss"></style>
