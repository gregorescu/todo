import { createAction, props } from '@ngrx/store';

export const CREATE_TODO = createAction('[Todo] CREATE_TODO', props<{todoData, listId, index, oldLists}>());
export const CREATE_TODO_SUCCESS = createAction('[Todo] CREATE_TODO_SUCCESS', props<{newTodo, listId, index, oldLists}>());
export const CREATE_TODO_ERROR = createAction('[Todo] CREATE_TODO_ERROR');

export const DELETE_TODO = createAction('[Todo] DELETE_TODO');
export const DELETE_TODO_SUCCESS = createAction('[Todo] DELETE_TODO_SUCCESS', props<{newLists}>());
export const DELETE_TODO_ERROR = createAction('[Todo] DELETE_TODO_ERROR');

export const UPDATE_TODO = createAction('[Todo] UPDATE_TODO');
export const UPDATE_TODO_SUCCESS = createAction('[Todo] UPDATE_TODO_SUCCESS', props<{newLists}>());
export const UPDATE_TODO_ERROR = createAction('[Todo] UPDATE_TODO_ERROR');