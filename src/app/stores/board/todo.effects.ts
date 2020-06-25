
import { TodoState, TodoListState } from './todo.state';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/';

import * as TodoActions from './todo.action';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { TodoServiceService } from 'src/app/todo-service.service';
import Todo from 'src/app/models/todo.model';

const serverAddress:string = "http://127.0.0.1:5000";

@Injectable()
export class TodoEffects {  
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private todoService: TodoServiceService
  ) { }  

  
//   @Effect()
//   GetTodos$: Observable<Action> = this.actions$.pipeofType<TodoActions.GetTodos>(TodoActions.GET_TODOS).mergeMap(action =>
//       this.http.get(serverAddress + '/api/todos').map((data: Response) => {

//           console.log(data);
//           return new TodoActions.GetTodosSuccess(data["data"]["docs"] as TodoState[]);
//         })
//         .catch(() => of(new TodoActions.GetTodoError()))
//     );

//   @Effect()
//   GetTodos$: Observable<Action> = this.actions$.pipe(
//       ofType(TodoActions.GET_TODOS),
//       switchMap(() =>
//         // call the service
//         this.todoService.getTodos().pipe(
//             map(results => new TodoActions.GetTodosSuccess(results["done"]["list"])),
//             // return a Failed action when something went wrong
//             catchError(error => of(new TodoActions.GetTodoError())),
//         )
//     )
//   );

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

                return new TodoActions.GetTodoListsSuccess(parsedResults);
            }),
            // return a Failed action when something went wrong
            catchError(error => of(new TodoActions.GetTodoListsError())),
        )
    )
  );

  @Effect()
  CreateTodo$: Observable<Action> = this.actions$.pipe(
      ofType<TodoActions.CreateTodo>(TodoActions.CREATE_TODO),
      mergeMap((action) => {
        return this.todoService.addToList(action.listId, action.payload).pipe(
            map((result) => {
                return new TodoActions.CreateTodoSuccess(result as Todo, action.listId, action.index);
            }),
            // return a Failed action when something went wrong
            catchError(error => of(new TodoActions.CreateTodoError())),
        )
      }
    )
  );

  @Effect()
  DeleteTodo$: Observable<Action> = this.actions$.pipe(
      ofType<TodoActions.DeleteTodo>(TodoActions.DELETE_TODO),
      mergeMap((action) => {
        return this.todoService.removeFromList(action.todoId, action.listId).pipe(
            map(() => {
                return new TodoActions.DeleteTodoSuccess(action.todoId, action.listId);
            }),
            // return a Failed action when something went wrong
            catchError(error => of(new TodoActions.DeleteTodoError())),
        )
      }
    )
  );

  @Effect()
  UpdateTodo$: Observable<Action> = this.actions$.pipe(
      ofType<TodoActions.UpdateTodo>(TodoActions.UPDATE_TODO),
      mergeMap((action) => {
        return this.todoService.updateTaskInList(action.payload, action.listId).pipe(
            map(() => {
                return new TodoActions.UpdateTodoSuccess(action.payload, action.listId);
            }),
            // return a Failed action when something went wrong
            catchError(error => of(new TodoActions.UpdateTodoError())),
        )
      }
    )
  );

}