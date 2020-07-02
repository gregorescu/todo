import Todo from '../../models/todo.model';
import {
  initializeTodoState,
  ListState,
  TodoState
} from './list.state';
import * as ListActions from './list.action';
import { createReducer, on } from '@ngrx/store';


const defaultTodoStates: TodoState[] = [{
  ...Todo.generateMockTodo(),
  ...initializeTodoState()
}]

const defaultTodoListState: ListState = {
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

const listReducer = createReducer(
  defaultState,
  on(ListActions.CREATE_TODO, state => {
    // debugger
    return ({ ...state })
  } ),
  on(ListActions.CREATE_TODO_SUCCESS, (state, action) => {
    debugger

    let newState = {
      ...state,
      loaded: true,
      loading: false
    };

    newState.lists = state.loaded ? [...state.lists] : [...action.oldLists];

    let referenceList;
    for (let i = 0; i < newState.lists.length; i++) {
      if (newState.lists[i].id === action.listId) {
        referenceList = {
          ...newState.lists[i]
        };
        newState.lists[i] = referenceList;

        referenceList.items = [...referenceList.items];
        referenceList.items.push(action.newTodo);

        break;
      }
    }

    return newState;
  })
);


// export function ListReducer(state = defaultState, action: Action, props) {
//   // console.log(state, action);

//   switch (action.type) {
//     case ListActions.CREATE_TODO: {
//       return {
//         ...state,
//         loaded: false,
//         loading: true
//       }
//     }

//     case ListActions.CREATE_TODO_SUCCESS: {
//     debugger
//       let newState = {
//         ...state,
//         loaded: true,
//         loading: false
//       };

//       newState.lists = [...newState.lists];

//       let referenceList;
//       for (let i = 0; i < newState.lists.length; i++) {
//         if (newState.lists[i].id === action.listId) {
//           referenceList = {
//             ...newState.lists[i]
//           };
//           newState.lists[i] = referenceList;

//           referenceList.items = [...referenceList.items];
//           referenceList.items.push(action.payload);

//           break;
//         }
//       }

//       return newState;
//     }


//     case ListActions.DELETE_TODO: {
//       return {
//         ...state,
//         loaded: false,
//         loading: true
//       }
//     }

//     case ListActions.DELETE_TODO_SUCCESS: {
//       let newState = {
//         ...state,
//         loaded: true,
//         loading: false
//       };

//       newState.lists = [...newState.lists];

//       let referenceList;
//       for (let i = 0; i < newState.lists.length; i++) {
//         if (newState.lists[i].id === action.listId) {
//           referenceList = {
//             ...newState.lists[i]
//           };
//           newState.lists[i] = referenceList;

//           referenceList.items = [...referenceList.items];
//           for (let j = 0; j < referenceList.items.length; j++) {
//             if (referenceList.items[j].id === action.todoId) {
//               referenceList.items.splice(j, 1);
//               break;
//             }
//           }

//           break;
//         }
//       }

//       return newState;
//     }

//     case ListActions.UPDATE_TODO: {
//       return {
//         ...state,
//         loaded: false,
//         loading: true
//       }
//     }

//     case ListActions.UPDATE_TODO_SUCCESS: {
//       let newState = {
//         ...state,
//         loaded: true,
//         loading: false
//       };

//       newState.lists = [...newState.lists];

//       let referenceList;
//       for (let i = 0; i < newState.lists.length; i++) {
//         if (newState.lists[i].id === action.listId) {
//           referenceList = {
//             ...newState.lists[i]
//           };
//           newState.lists[i] = referenceList;

//           referenceList.items = [...referenceList.items];
//           for (let j = 0; j < referenceList.items.length; j++) {
//             if (referenceList.items[j].id === action.payload.id) {
//               referenceList.items.splice(j, 1, action.payload);
//               break;
//             }
//           }

//           break;
//         }
//       }

//       return newState;
//     }
//   }
// }

export function reducer(state: ListState, action) {
  return listReducer(state, action);
}
