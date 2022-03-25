import action from './actionTypes';

const initialState = {
    todos: [],
    todosBackup: [],
};

const reducer = (state = initialState, { type, payload }) => {
    switch(type){
        case action.LOAD_TODOS:{
            return {
                ...state,
                todos: payload,
                todosBackup: payload
            }
        }
        case action.ADD_TODO:{
            return{
                ...state,
                todos: [...state.todos, {
                    ...payload,
                    id: state.todos.length + 1
                }]
            };
        }
        case action.REMOVE_TODO:{
            return{
                ...state,
                todos: state.todos.filter(todo => todo !== payload)
            };
        }
        case action.ORDER_TODO:{
            if(payload === 'fecha_creacion'){
               state.todos = state.todosBackup;
            }
            if(payload === 'fecha_vencimiento'){
              state.todos = state.todosBackup;
              
            }
            if(payload === 'estado'){
              state.todos = state.todosBackup;
                
            }
            break;
        }
        case action.FREE_TODO:{
            return {
                ...state
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
};

export default reducer;