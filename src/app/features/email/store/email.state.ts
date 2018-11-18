import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as shortid from 'shortid';
import { EmailStateModel, StandardComponent } from './email.types';
import { AddComponent, ModifyComponent, DeleteComponent, SelectComponent } from './email.actions';
​
@State<EmailStateModel>({
  name: 'email',
  defaults: {
    standardComponents: [
      {
        icon: 'input',
        text: 'Image, Text, Button',
        options: [
          'image',
          'text',
          'button',
        ]
      },
      {
        icon: 'text_fields',
        text: 'Image and Text',
        options: [
          'image',
          'text',
        ]
      },
      {
        icon: 'insert_photo',
        text: 'Image Only',
        options: [
          'image',
        ]
      },
      {
        icon: 'text_fields',
        text: 'Text Only',
        options: [
          'text',
        ]
      },
    ],
    currentComponents: [],
    selectedComponent: {},
  },
})
export class EmailState {
  @Selector()
  static getStandardComponents(state: EmailStateModel) {
      return state.standardComponents;
  }

  @Selector()
  static getCurrentComponents(state: EmailStateModel) {
      return state.currentComponents;
  }

  @Selector()
  static getSelectedComponent(state: EmailStateModel) {
      return state.selectedComponent;
  }

  @Action(AddComponent)
  addComponent(ctx: StateContext<EmailStateModel>, action: AddComponent) {
    const state = ctx.getState();
    action.component.id = shortid.generate();
    ctx.setState({
      ...state,
      currentComponents: state.currentComponents.concat(action.component)
    });
  }

  @Action(ModifyComponent)
  modifyComponent(ctx: StateContext<EmailStateModel>, action: ModifyComponent) {
    const state = ctx.getState();
    const index = state.currentComponents.findIndex(c => c.id === action.id);
    const component = Object.assign({}, state.currentComponents[index]);
    component[action.field] = action.value;

    ctx.patchState({
      currentComponents: [
        ...state.currentComponents.slice(0, index),
        component,
        ...state.currentComponents.slice(index + 1),
      ],
      selectedComponent: component,
    });
  }

  @Action(DeleteComponent)
  deleteComponent(ctx: StateContext<EmailStateModel>, action: DeleteComponent) {
    const state = ctx.getState();
    const index = state.currentComponents.findIndex(c => c.id === action.id);

    ctx.patchState({
      currentComponents: [
        ...state.currentComponents.slice(0, index),
        ...state.currentComponents.slice(index + 1),
      ],
      selectedComponent: {},
    });
  }

  @Action(SelectComponent)
  selectComponent(ctx: StateContext<EmailStateModel>, action: SelectComponent) {
    const state = ctx.getState();
    let component = {};

    /**
     * Will add the request component to the selectedComponent
     * only if an id is passed and the passed component is not
     * the current selectedComponent
     */
    if (action.id && action.id !== state.selectedComponent.id) {
      component = state.currentComponents.find(c => c.id === action.id);
    }

    ctx.patchState({
      selectedComponent: component,
    });
  }
}
