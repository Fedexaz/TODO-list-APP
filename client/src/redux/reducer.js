import { ADD_TODO, REMOVE_TODO, FILTER_TODO } from './actionTypes';

const initialState = {
    todos: [],
    todosBackup: [],
};

const reducer = (state = initialState, { type, payload }) => {
    switch(type){
        case ADD_TODO:{
            return{
                ...state,
                todos: [...state.todos, {
                    'id': payload.id,
                    'name': payload.name,
                    'fecha': payload.date,
                    'descripcion': payload.descripcion,
                    'completada': payload.completada
                }]
            };
        }
        case REMOVE_TODO:{
            return{
                ...state,
                todos: state.todos.filter(todo => todo !== payload.id)
            };
        }
        case FILTER_TODO:{
            break;
        }
        default:{
            return {
                ...state
            }
        }
    }
};

export default reducer;