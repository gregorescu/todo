import Todo from '../../models/todo.model';
import {
  initializeTodoState,
  TodoListState,
  TodoState
} from './todo.state';
import * as TodoActions from './todo.action';

export type Action = TodoActions.All;

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

export function TodoReducer(state = defaultState, action: Action) {
  console.log(state, action);

  switch (action.type) {
    case TodoActions.GET_TODO_LISTS: {
      return {
        ...state,
        loaded: false,
        loading: true
      }
    }

    case TodoActions.GET_TODO_LISTS_SUCCESS: {
      return {
        ...state,
        lists: [
          ...action.payload
        ],
        loading: false
      }
    }

    case TodoActions.CREATE_TODO: {
      return {
        ...state,
        loaded: false,
        loading: true
      }
    }

    case TodoActions.CREATE_TODO_SUCCESS: {
      let newState = {
        ...state,
        loaded: true,
        loading: false
      };

      newState.lists = [...newState.lists];

      let referenceList;
      for (let i = 0; i < newState.lists.length; i++) {
        if (newState.lists[i].id === action.listId) {
          referenceList = {
            ...newState.lists[i]
          };
          newState.lists[i] = referenceList;

          referenceList.items = [...referenceList.items];
          referenceList.items.push(action.payload);

          break;
        }
      }

      return newState;
    }


    case TodoActions.DELETE_TODO: {
      return {
        ...state,
        loaded: false,
        loading: true
      }
    }

    case TodoActions.DELETE_TODO_SUCCESS: {
      let newState = {
        ...state,
        loaded: true,
        loading: false
      };

      newState.lists = [...newState.lists];

      let referenceList;
      for (let i = 0; i < newState.lists.length; i++) {
        if (newState.lists[i].id === action.listId) {
          referenceList = {
            ...newState.lists[i]
          };
          newState.lists[i] = referenceList;

          referenceList.items = [...referenceList.items];
          for (let j = 0; j < referenceList.items.length; j++) {
            if (referenceList.items[j].id === action.todoId) {
              referenceList.items.splice(j, 1);
              break;
            }
          }

          break;
        }
      }

      return newState;
    }

    case TodoActions.UPDATE_TODO: {
      return {
        ...state,
        loaded: false,
        loading: true
      }
    }

    case TodoActions.UPDATE_TODO_SUCCESS: {
      let newState = {
        ...state,
        loaded: true,
        loading: false
      };

      newState.lists = [...newState.lists];

      let referenceList;
      for (let i = 0; i < newState.lists.length; i++) {
        if (newState.lists[i].id === action.listId) {
          referenceList = {
            ...newState.lists[i]
          };
          newState.lists[i] = referenceList;

          referenceList.items = [...referenceList.items];
          for (let j = 0; j < referenceList.items.length; j++) {
            if (referenceList.items[j].id === action.payload.id) {
              referenceList.items.splice(j, 1, action.payload);
              break;
            }
          }

          break;
        }
      }

      return newState;
    }

    // case TodoActions.GET_TODOS_SUCCESS: {
    //   return {
    //     ...state,
    //     todos: [
    //       ...action.payload,
    //       defaultTodoStates[0]
    //     ],
    //     loading: false
    //   };
    // }

    // case TodoActions.GET_TODOS: {
    //   return {
    //     ...state,
    //     loaded: false,
    //     loading: true
    //   };
    // }


    // case TodoActions.GET_TODOS_SUCCESS: {
    //   return {
    //     ...state,
    //     todos: [
    //       ...action.payload,
    //       defaultTodoStates[0]
    //     ],
    //     loading: false
    //   };
    // }

    // case TodoActions.DELETE_TODO: {

    //   return {
    //     ...state,
    //     ...state.todos.splice(state.todos.indexOf(action.payload), 1)
    //   };

    // }


    // case TodoActions.DELETE_TODO_SUCCESS: {

    //   return state
    // }


    // case TodoActions.DELETE_TODO_ERROR: {

    //   return {
    //     ...state,
    //     todos: [
    //       ...state.todos,
    //       action.payload
    //     ]
    //   }
    // }
  }
}
