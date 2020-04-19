import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Store from '../store';
import NoteFormat from '@/models/NoteFormat';
import Settings from '@/models/Settings';

@Module({
  name: 'settings-state',
  store: Store,
  dynamic: true,
  namespaced: true,
})
export default class SettingsModule extends VuexModule {
  settings: Settings = {
    defaultFormat: NoteFormat.ASCIIDOC,
  };

  @Mutation
  private updateSettings(settings: Settings) {
    this.settings = settings;
  }
}
