import { ADD_TODO, REMOVE_TODO, FILTER_TODO } from './actionTypes';

export const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload
    }
};

export const removeTodo = (payload) => {
    return {
        type: REMOVE_TODO,
        payload
    }
};

export const filterTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload
    }
};