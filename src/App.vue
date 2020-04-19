<template>
  <div id="app" class="container">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item href="/">
          <img
            src="/favicon.ico"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="/">
          Home
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" @click="login">
              <strong>Log in</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import googleService from '@/google-service.ts'

@Component({})
export default class App extends Vue {
  
  login() {
    googleService.signIn()
  }
}
</script>
<style lang="scss"></style>
