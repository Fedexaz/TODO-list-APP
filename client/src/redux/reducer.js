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
                todos: [...state.todos, payload]
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
                
            }
            if(payload === 'fecha_vencimiento'){

            }
            if(payload === 'estado'){
                
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