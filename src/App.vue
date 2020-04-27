<template>
  <md-app id="app" md-mode="fixed">
    <md-app-toolbar class="md-primary md-layout">
      <router-link to="/">
        <img
          src="/favicon.ico"
          id="icon"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </router-link>

      <span class="md-display-1">Note[doc]</span>
      <div class="toolbar--buttons md-layout-item md-small-size-95">
        <md-button class="blue md-raised" @click="resetEditor">
          New Editor
        </md-button>
        <md-button class="blue md-raised" @click="saveNote">
          Save to Drive
        </md-button>
      </div>
      <div class="md-toolbar-section-end md-layout-item md-small-size-5">
        <div class="md-small-hide">
          <md-field class="themes--selector">
            <select v-model="adocTheme" @change="changeTheme">
              <option :value="theme" :key="idx" v-for="(theme, idx) in themeOptions">{{ theme }}</option>
            </select>
          </md-field>
        </div>
        <md-button class="login--button" v-if="!isSignedIn" @click="signIn">
          <strong>Sign in</strong>
        </md-button>
        <md-button class="login--button" v-else @click="signOut">
          <strong>Sign Out</strong>
        </md-button>
      </div>
    </md-app-toolbar>
    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import googleService from '@/google-service.ts';
  import { getModule } from 'vuex-module-decorators';
  import UserState from '@/store/modules/user-module';
  import Notes from './store/modules/notes-module';

  const userState = getModule(UserState);
  const notesState = getModule(Notes);

  @Component({})
  export default class App extends Vue {

    private adocTheme = 'asciidoctor';

    get isSignedIn(): boolean {
      return userState.isSignedIn;
    }

    get themeOptions() {
      return [
        'asciidoctor',
        'adoc-foundation',
        'gazette',
        'ubuntu',
        'notebook',
      ];


    }

    changeTheme() {
      notesState.changeAdocTheme(this.adocTheme);
    }

    resetEditor() {
      notesState.resetEditor();
    }

    saveNote() {
      if (!this.isSignedIn) {
        this.signIn().then(() => notesState.saveNote(notesState.inEditNote));
      }
      notesState.saveNote(notesState.inEditNote);
    }

    signIn(): Promise<string> {
      return googleService.signIn();
    }

    signOut() {
      googleService.signOut();
    }
  }
</script>
<style lang="scss">
  .language-adoc {
    white-space: pre-wrap !important; /* css-3 */
    white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
    white-space: -pre-wrap !important; /* Opera 4-6 */
    white-space: -o-pre-wrap !important; /* Opera 7 */
    word-wrap: break-word !important; /* Internet Explorer 5.5+ */
  }

  #app {
    height: 100vh;
  }

  .toolbar--buttons button {
    background-color: #5e70ca !important;
    color: #ffffff !important;
  }

  .toolbar--buttons {
    @media screen and (min-width: 64em) {
      margin-left: 8px;
    }
  }

  #icon {
    border-radius: 3px;
  }
</style>
