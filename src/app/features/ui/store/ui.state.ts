import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UiStateModel } from './ui.types';
import { SetNavDrawer } from './ui.actions';

@State<UiStateModel>({
  name: 'ui',
  defaults: {
    navDrawerOpen: true,
  }
})
export class UiState {
  @Selector()
  static getNavDrawerOpen(state: UiStateModel) {
    return state.navDrawerOpen;
  }

  @Action(SetNavDrawer)
  setNavDrawer(ctx: StateContext<UiStateModel>, action: SetNavDrawer) {
    const state = ctx.getState();

    if (action.state === undefined) {
      const navDrawerOpen = !state.navDrawerOpen;
      ctx.patchState({
        navDrawerOpen,
      });
    } else {
      ctx.patchState({
        navDrawerOpen: action.state,
      });
    }

  }
}
