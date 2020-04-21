import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../store';

@Module({
  name: 'user-state',
  store: Store,
  dynamic: true,
  namespaced: true,
})
export default class UserState extends VuexModule {
  isSignedIn = false

  @Mutation
  public updateSignIn(isSignedIn: boolean) {
    this.isSignedIn = isSignedIn;
  }
}
