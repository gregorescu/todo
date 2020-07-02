import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { BoardComponent } from './board/board.component';
import { ItemStatusPipe } from './pipes/item-status.pipe';
import { ItemClassPipe } from './pipes/item-class.pipe';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, combineReducers, ActionReducerMap } from '@ngrx/store';

import { TodoEffects } from './stores/board/todo.effects';
import { ListEffects } from './stores/list/list.effects';

import { EffectsModule } from '@ngrx/effects';

import * as TodoReducer from './stores/board/todo.reducers';
import * as ListReducer from './stores/list/list.reducers';
import { TodoListState, TodoState } from './stores/board/todo.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    BoardComponent,
    ItemStatusPipe,
    ItemClassPipe,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // StoreModule.forRoot(reducersMap),
    StoreModule.forRoot({board: TodoReducer.reducer, lists: ListReducer.reducer}),
    EffectsModule.forRoot([TodoEffects, ListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
