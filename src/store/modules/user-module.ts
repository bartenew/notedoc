import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../store';

const UPDATE_SIGN_IN = 'UPDATE_SIGN_IN';

@Module({
  name: 'user-state',
  store: Store,
  dynamic: true,
  namespaced: true,
})
export default class UserState extends VuexModule {
  isSignedIn = false

  @Mutation
  [UPDATE_SIGN_IN](isSignedIn: boolean) {
    this.isSignedIn = isSignedIn;
  }

  @Action
  updateSignIn(isSignedIn: boolean) {
    this.context.commit(UPDATE_SIGN_IN, isSignedIn);
  }
}
