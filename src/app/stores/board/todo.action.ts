import {
  TodoState,
  TodoListState
} from './todo.state';
import Todo from '../../models/todo.model';
import {
  Action
} from '@ngrx/store';

export const GET_TODO = '[Todo] GET_TODO';
export const GET_TODO_SUCCESS = "[Todo] GET_TODO_SUCCESS";
export const GET_TODO_ERROR = "[Todo] GET_TODO_ERROR";
export const GET_TODOS = '[Todo] GET_TODOS';
export const GET_TODOS_SUCCESS = '[Todo] GET_TODOS_SUCCESS';
export const GET_TODOS_ERROR = '[Todo] GET_TODOS_ERROR';
export const GET_TODO_LISTS = '[Todo] GET_TODO_LISTS';
export const GET_TODO_LISTS_SUCCESS = '[Todo] GET_TODO_LISTS_SUCCESS';
export const GET_TODO_LISTS_ERROR = '[Todo] GET_TODO_LISTS_ERROR';

export const CREATE_TODO = '[Todo] CREATE_TODO';
export const CREATE_TODO_SUCCESS = "[Todo] CREATE_TODO_SUCCESS";
export const CREATE_TODO_ERROR = "[Todo] CREATE_TODO_ERROR";

export const DELETE_TODO = '[Todo] DELETE_TODO';
export const DELETE_TODO_SUCCESS = "[Todo] DELETE_TODO_SUCCESS";
export const DELETE_TODO_ERROR = "[Todo] DELETE_TODO_ERROR";

export const UPDATE_TODO = '[Todo] UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = "[Todo] UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_ERROR = "[Todo] UPDATE_TODO_ERROR";

export class GetTodoLists implements Action {
  readonly type = GET_TODO_LISTS;
}

export class GetTodoListsSuccess implements Action {
  readonly type = GET_TODO_LISTS_SUCCESS;

  constructor(public payload: TodoListState[]) {};
}

export class GetTodoListsError implements Action {
  readonly type = GET_TODO_LISTS_ERROR;
}

export class GetTodos implements Action {
  readonly type = GET_TODOS;
}

export class GetTodosSuccess implements Action {
  readonly type = GET_TODOS_SUCCESS;

  constructor(public payload: TodoState[]) {};
}

export class GetTodosError implements Action {
  readonly type = GET_TODOS_ERROR;
}

export class GetTodo implements Action {
  readonly type = GET_TODO;

  constructor(payload: string) {}
}

export class GetTodoSuccess implements Action {
  readonly type = GET_TODO_SUCCESS;

  constructor(public payload: Todo) {};
}

export class GetTodoError implements Action {
  readonly type = GET_TODO_ERROR;
}

export class CreateTodo implements Action {
  readonly type = CREATE_TODO;

  constructor(public payload: Todo, public listId: string, public index: number | null) {}
}

export class CreateTodoSuccess implements Action {
  readonly type = CREATE_TODO_SUCCESS;

  constructor(public payload: Todo, public listId: string, public index: number | null) {};
}

export class CreateTodoError implements Action {
  readonly type = CREATE_TODO_ERROR;
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public todoId: string, public listId: string) {}
}

export class DeleteTodoSuccess implements Action {
  readonly type = DELETE_TODO_SUCCESS;

  constructor(public todoId: string, public listId: string) {};
}

export class DeleteTodoError implements Action {
  readonly type = DELETE_TODO_ERROR;
}

export class UpdateTodo implements Action {
  readonly type = UPDATE_TODO;

  constructor(public payload:Todo, public listId: string) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = UPDATE_TODO_SUCCESS;

  constructor(public payload:Todo, public listId: string) {};
}

export class UpdateTodoError implements Action {
  readonly type = UPDATE_TODO_ERROR;
}

export type All = UpdateTodo | UpdateTodoSuccess | UpdateTodoError | DeleteTodo | DeleteTodoSuccess | DeleteTodoError | CreateTodo | CreateTodoSuccess | CreateTodoError | GetTodoLists | GetTodoListsSuccess | GetTodoListsError | GetTodo | GetTodoSuccess | GetTodoError | GetTodos | GetTodosSuccess | GetTodosError;
