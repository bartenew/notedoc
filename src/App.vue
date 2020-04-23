<template>
  <md-app id="app" md-mode="reveal">
    <md-app-toolbar class="md-primary">
      <router-link to="/">
        <img
          src="/favicon.ico"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </router-link>
      <md-button v-if="!isSignedIn" @click="signIn">
        <strong>Sign in</strong>
      </md-button>
      <md-button v-else @click="signOut">
        <strong>Sign Out</strong>
      </md-button>
      Write Notes in adoc
    </md-app-toolbar>
    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import googleService from '@/google-service.ts';
import { getModule } from 'vuex-module-decorators';
import UserState from '@/store/modules/user-module';

const userState = getModule(UserState);

@Component({})
export default class App extends Vue {
  get isSignedIn() {
    return userState.isSignedIn;
  }

  signIn() {
    googleService.signIn();
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
</style>
