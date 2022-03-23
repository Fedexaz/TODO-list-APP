import { Box } from '@mui/material';
import Todo from './Todo';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos } from '../redux/actions';

import AddIcon from '@mui/icons-material/Add';

export default function Todos() {

  const [addTodo, setAddTodo] = useState(false);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '10px' }}>
      {
        todos.length ? 
            todos.map((todo) => <Todo key={todo.id} todo={
              {
                fecha: todo.fecha, 
                descripcion: todo.descripcion, 
                completada: todo.completada
              }} />) 
          : 
            'No hay Todos en la DB'
      }
      {
        addTodo ?
          <Box onClick={() => setAddTodo(false)} sx={
            { 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '5px', 
              border: '1px solid gray', 
              marginTop: '10px'
            }
          }>
            Agregar Todo
          </Box>
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