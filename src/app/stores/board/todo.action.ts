import { createAction, props } from '@ngrx/store';

export const GET_TODO_LISTS = createAction('[Todo] GET_TODO_LISTS');
export const GET_TODO_LISTS_SUCCESS = createAction('[Todo] GET_TODO_LISTS_SUCCESS', props<{newLists}>());
export const GET_TODO_LISTS_ERROR = createAction('[Todo] GET_TODO_LISTS_ERROR');
