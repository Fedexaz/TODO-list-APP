import { Box } from '@mui/material'
import React from 'react'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Todo({ todo }) {
  const { fecha, descripcion, completada } = todo;

  let hoy = new Date();
  let dateTodo = new Date(fecha);

  let suma = dateTodo.getTime() - hoy.getTime(); //getTime devuelve milisegundos de esa fecha
  let fechaDentroDeUnaSemana = new Date(suma);

  console.log(fechaDentroDeUnaSemana.toLocaleDateString())

  return (
    <Box sx={
      {
        display: 'flex',
        justifyContent: 'space-around',
        border: '1px solid gray', 
        marginTop: '15px', 
        marginBottom: '15px', 
        padding: '10px' 
      }
    }>
      <h4>Completada: {completada ? 'si' : 'no'}</h4>
      <h3>{descripcion}</h3>
      <h3>{fecha}</h3>
    </Box>
  )
}
