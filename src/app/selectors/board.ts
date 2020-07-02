import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getBoard = createFeatureSelector('board');

export const getBoardState = createSelector(
  getBoard,
  (state) => {
      return state
    }
);
