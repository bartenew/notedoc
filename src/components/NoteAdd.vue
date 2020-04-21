<template>
    <div @keydown.enter.alt.exact="save" @keydown.meta.enter.exact="save">
      <md-field label="Note">
        <md-textarea v-model="body" rows="10"></md-textarea>
      </md-field>
      <div class="columns">
      <span class="column is-one-third" />
      <md-button class="md-primary md-raised" @click="save">Save</md-button>
    </div>
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import Notes from '@/store/modules/notes-module';

const notesState = getModule(Notes);

@Component
export default class NoteAdd extends Vue {
  private body = '';
  private tags: string[] = [];

  private save() {
    notesState.newNote(this.body, this.tags);
  }
}
</script>

<style scoped lang="scss">

</style>
