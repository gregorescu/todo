
import { TodoListState } from './todo.state';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as TodoActions from './todo.action';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { TodoServiceService } from 'src/app/todo-service.service';

@Injectable()
export class TodoEffects {  
  constructor(
    private actions$: Actions,
    private todoService: TodoServiceService
  ) { }  

  
  @Effect()
  GetTodoLists$: Observable<Action> = this.actions$.pipe(
      ofType(TodoActions.GET_TODO_LISTS),
      switchMap(() =>
        // call the service
        this.todoService.getTodos().pipe(
            map((results) => {
                let parsedResults: TodoListState[] = [];
                for(let key in results) {
                    let todoListState:TodoListState = {
                        id: results[key].id,
                        items: results[key].list,
                        loading: false,
                        pending: 0
                    };
                    parsedResults.push(todoListState);
                }

                return TodoActions.GET_TODO_LISTS_SUCCESS({newLists: parsedResults});
            }),
            // return a Failed action when something went wrong
            catchError(error => TodoActions.GET_TODO_LISTS_ERROR()),
        )
    )
  );
}