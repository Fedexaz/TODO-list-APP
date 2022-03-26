import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Todo from './Todo';
import AddTodo from './AddTodo';

import { loadTodos, setSorting } from '../redux/actions';

import { useSelector, useDispatch } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';

export default function Todos() {

  const [addTodo, setAddTodo] = useState(false);

  const todos = useSelector(state => state.todos);
  const sorting = useSelector(state => state.sorting);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(sorting){
      dispatch(setSorting(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '10px' }}>
      {
        todos.length ?
          todos.map((todo) => <Todo key={todo.id} todo={
            {
              id: todo.id,
              dateCreacion: todo.dateCreacion,
              fecha: todo.date,
              descripcion: todo.descripcion,
              completada: todo.completada
            }} />) 
          : 
            'No hay nada que hacer'
      }
      {
        addTodo ?
        <>
          <Box /* onClick={() => setAddTodo(false)} */ sx={
            { 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '15px', 
              border: '1px solid gray', 
              marginTop: '10px'
            }
          }>
            <AddTodo />
          </Box>
          <Button onClick={() => setAddTodo(false)}>Cerrar</Button>
        </>
        :
          <Box onClick={() => setAddTodo(true)} sx={
            { 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '30px', 
              border: '1px solid gray', 
              marginTop: '10px'
            }
          }>
            <AddIcon sx={{ fontSize: '50px' }}/>
          </Box>
    }
    </Box>
  )
}