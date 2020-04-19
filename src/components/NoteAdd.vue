<template>
    <form @submit="onSubmit">
      <b-field label="Note">
        <b-input v-model="body" rows="10" type="textarea"></b-input>
      </b-field>
      <div class="columns">
      <span class="column is-one-third" />
      <b-button class="is-large"
        type="is-primary column is-one-third"
        tag="input"
        native-type="submit"
        value="Save"
      />
    </div>
    </form>
    
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

  private onSubmit(e: Event) {
    e.preventDefault();
    notesState.newNote(this.body, this.tags);
  }
}
</script>

<style scoped lang="scss">

</style>
