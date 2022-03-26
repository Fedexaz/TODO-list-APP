import axios from 'axios';

import action from './actionTypes';

export const loadTodos = () => {
    return async (dispatch) => {
        try{
            const payload = await axios.get('/todos');
            return dispatch({
                type: action.LOAD_TODOS,
                payload: payload.data
            })
        }
        catch(e){
            console.log(e);
        }
    }
}

export const addTodo = (payload) => {
    return async (dispatch) => {
        try{
            await axios.post('/todos', payload);
            return dispatch({
                type: action.ADD_TODO,
                payload
            })
        }
        catch(e){
            console.log(e);
        }
    }
};

export const removeTodo = (payload) => {
    return async (dispatch) => {
        try{
            await axios.delete('/todos/' + payload);
            return dispatch({
                type: action.REMOVE_TODO,
                payload
            })
        }
        catch(e){
            console.log(e);
        }
    }
};

export const orderTodo = (payload) => {
    return {
        type: action.ORDER_TODO,
        payload
    }
};

export const setSorting = (payload) => {
    return {
        type: action.SORTING,
        payload
    }
};

export const putFreeTodo = (payload) => {
    return {
        type: action.PUT_FREE_TODO,
        payload
    }
};

export const freeTodo = () => {
    return {
        type: action.FREE_TODO
    }
};

export const saveTodos = () => {
    return {
      type: action.SAVE_TODOS
    }
}