
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/';
import * as ListActions from './list.action';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { TodoServiceService } from 'src/app/todo-service.service';
import Todo from 'src/app/models/todo.model';

const serverAddress:string = "http://127.0.0.1:5000";

@Injectable()
export class ListEffects {  
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private todoService: TodoServiceService
  ) { }  

  @Effect()
  CreateTodo$: Observable<Action> = this.actions$.pipe(
      ofType(ListActions.CREATE_TODO),
      switchMap((action) => {
        return this.todoService.addToList(action.listId, action.todoData).pipe(
            map((result) => {
                debugger
                return ListActions.CREATE_TODO_SUCCESS({
                  newTodo: result as Todo, 
                  listId: action.listId, 
                  index: action.index,
                  oldLists: action.oldLists
                });
            }),
            // return a Failed action when something went wrong
            catchError(error => ListActions.CREATE_TODO_ERROR()),
        )
      }
    )
  );

  @Effect()
  DeleteTodo$: Observable<Action> = this.actions$.pipe(
      ofType(ListActions.DELETE_TODO),
      mergeMap((action) => {
        return this.todoService.removeFromList(action.todoId, action.listId).pipe(
            map(() => {
                return ListActions.DELETE_TODO_SUCCESS(action.todoId, action.listId);
            }),
            // return a Failed action when something went wrong
            catchError(error => ListActions.CREATE_TODO_ERROR()),
        )
      }
    )
  );

  @Effect()
  UpdateTodo$: Observable<Action> = this.actions$.pipe(
      ofType(ListActions.UPDATE_TODO),
      mergeMap((action) => {
        return this.todoService.updateTaskInList(action.payload, action.listId).pipe(
            map(() => {
                return ListActions.DELETE_TODO_SUCCESS(action.payload, action.listId);
            }),
            // return a Failed action when something went wrong
            catchError(error => ListActions.CREATE_TODO_ERROR()),
        )
      }
    )
  );

}