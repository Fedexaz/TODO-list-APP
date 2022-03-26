import action from './actionTypes';

import axios from 'axios';

const initialState = {
  todos: [],
  todosBackup: [],
  sorting: false,
  freeTodos: []
};

const reducer = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case action.LOAD_TODOS: {
      return {
        ...state,
        todos: payload.sort((tA, tB) => {
          const dateTodoA = new Date(tA.dateCreacion);
          const dateTodoB = new Date(tB.dateCreacion);
          const dateTodoAEnHoras = ((dateTodoA.getTime() / 1000) / 3600);
          const dateTodoBEnHoras = ((dateTodoB.getTime() / 1000) / 3600);

          if (dateTodoAEnHoras <= dateTodoBEnHoras) {
            return 1;
          }
          if (dateTodoAEnHoras > dateTodoBEnHoras) {
            return -1;
          }
          return 0;
        }),
        todosBackup: payload.sort((tA, tB) => {
          const dateTodoA = new Date(tA.dateCreacion);
          const dateTodoB = new Date(tB.dateCreacion);
          const dateTodoAEnHoras = ((dateTodoA.getTime() / 1000) / 3600);
          const dateTodoBEnHoras = ((dateTodoB.getTime() / 1000) / 3600);

          if (dateTodoAEnHoras <= dateTodoBEnHoras) {
            return 1;
          }
          if (dateTodoAEnHoras > dateTodoBEnHoras) {
            return -1;
          }
          return 0;
        })
      }
    }
    case action.ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, {
          ...payload,
          id: state.todos.length + 1
        }]
      };
    }
    case action.REMOVE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo !== payload)
      };
    }
    case action.SORTING: {
      return {
        ...state,
        sorting: payload
      }
    }
    case action.ORDER_TODO: {
      let newState = {};

      if (payload === 'fecha_creacion') {
        newState = {
          ...state,
          todos: state.todos.sort((tA, tB) => {
            const dateTodoA = new Date(tA.dateCreacion);
            const dateTodoB = new Date(tB.dateCreacion);
            const dateTodoAEnHoras = ((dateTodoA.getTime() / 1000) / 3600);
            const dateTodoBEnHoras = ((dateTodoB.getTime() / 1000) / 3600);

            if (dateTodoAEnHoras <= dateTodoBEnHoras) {
              return 1;
            }
            if (dateTodoAEnHoras > dateTodoBEnHoras) {
              return -1;
            }
            return 0;
          })
        }
      }
      if (payload === 'fecha_vencimiento') {
        newState = {
          ...state,
          todos: state.todos.sort((tA, tB) => {
            const dateTodoA = new Date(tA.date);
            const dateTodoB = new Date(tB.date);
            const dateTodoAEnHoras = ((dateTodoA.getTime() / 1000) / 3600);
            const dateTodoBEnHoras = ((dateTodoB.getTime() / 1000) / 3600);

            if (dateTodoAEnHoras >= dateTodoBEnHoras) {
              return 1;
            }
            if (dateTodoAEnHoras < dateTodoBEnHoras) {
              return -1;
            }
            return 0;
          })
        }
      }
      if (payload === 'estado') {
        newState = {
          ...state,
          todos: state.todos.sort((tA, tB) => Number(tA.completada) - Number(tB.completada))
        }
      }
      return {
        ...newState
      }
    }
    case action.PUT_FREE_TODO: {
      return {
        ...state,
        freeTodos: [...state.freeTodos, payload]
      }
    }
    case action.FREE_TODO: {
      let estado = {
        ...state,
        todos: state.todos.map((todo) => {
          let value = {
            ...todo
          }
          if (state.freeTodos.indexOf(todo.id) !== -1) {
            value = {
              ...todo,
              completada: true
            }
          }
          return value;
        })
      }

      estado = {
        ...estado,
        freeTodos: []
      }

      return estado;
    }
    case action.SAVE_TODOS: {
      state.todos.forEach(async (todo) => {
        await axios.put('/todos/' + todo.id, {
          date: todo.date,
          dateCreacion: todo.dateCreacion,
          descripcion: todo.descripcion,
          completada: todo.completada
        });
      });
      
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
};

export default reducer;

/* await axios.put('/todos/' + todo.id, {
  date: todo.date,
  dateCreacion: todo.dateCreacion,
  descripcion: todo.descripcion,
  completada: todo.completada
}); */