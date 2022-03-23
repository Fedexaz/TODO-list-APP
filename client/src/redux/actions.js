import axios from 'axios';

import action from './actionTypes';

export const loadTodos = () => {
    return async (dispatch) => {
        try{
            const payload = await axios.get('http://localhost:3001/todos');
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
            await axios.post('http://localhost:3001/todos', payload);
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
            await axios.delete('http://localhost:3001/todos/' + payload);
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

export const freeTodo = (payload) => {
    return {
        type: action.FREE_TODO,
        payload
    }
};