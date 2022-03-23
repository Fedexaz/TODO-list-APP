import { Box } from '@mui/material';
import Todo from './Todo';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos } from '../redux/actions';

import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Todos() {

  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos())  
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '10px' }}>
      {
        todos.length ? 
            todos.map((todo) => <Todo todo={{name: todo.name, fecha: todo.fecha, descripcion: todo.descripcion, completada: todo.completada}} />) 
          : 
            'No hay Todos en la DB'
      }
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', border: '1px solid gray', marginTop: '10px'}}>
        <AddCircleIcon sx={{ fontSize: '50px' }}/>
      </Box>
    </Box>
  )
}