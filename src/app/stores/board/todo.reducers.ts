import Todo from '../../models/todo.model';
import {
  initializeTodoState,
  TodoListState,
  TodoState
} from './todo.state';
import * as TodoActions from './todo.action';
import { Action, createReducer, on } from '@ngrx/store';

const defaultTodoStates: TodoState[] = [{
  ...Todo.generateMockTodo(),
  ...initializeTodoState()
}]

const defaultTodoListState: TodoListState = {
  id: "",
  items: defaultTodoStates,
  loading: false,
  pending: 0
}

const defaultState: any = {
  lists: [
    defaultTodoListState
  ]
};

const boardReducer = createReducer(
  defaultState,
  on(TodoActions.GET_TODO_LISTS, state => {
    return ({ ...state })
  } ),
  on(TodoActions.GET_TODO_LISTS_SUCCESS, (state, action) => {
    let newState = {
      ...state,
      lists: action.newLists
    }
    
    return ({ ...newState })
  }),
  on(TodoActions.GET_TODO_LISTS_ERROR, state => {
    return ({ ...state })
  }),
);

export function reducer(state: TodoListState, action: Action) {
  return boardReducer(state, action);
}
