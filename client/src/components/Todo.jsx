import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TextField from '@mui/material/TextField';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import fechaCorrecta from 'date-fns/locale/es';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function Todo({ todo }) {
  const { fecha, descripcion, completada } = todo;

  const dateTodo = new Date(fecha);
  const fechaHoy = new Date();

  const [date, setDate] = useState(dateTodo);

  const dateTodoEnHoras = ((dateTodo.getTime() / 1000) / 3600).toFixed();
  const dateHoyEnHoras = ((fechaHoy.getTime() / 1000) / 3600).toFixed();

  const showIconTask = () => {
    if((dateTodoEnHoras - dateHoyEnHoras) >= 0 && !completada){
      return <AccessTimeIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
    else if((dateTodoEnHoras - dateHoyEnHoras) >= 0 && completada){//Funciona
      return <TaskAltIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
    else if((dateTodoEnHoras - dateHoyEnHoras) <= 0 && !completada){
      return <ErrorOutlineIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
    else if((dateTodoEnHoras - dateHoyEnHoras) <= 0 && completada){
      return <TaskAltIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
  };

  return (
    <Box sx={
      {
        display: 'flex',
        justifyContent: 'space-around',
        border: '1px solid gray', 
        marginTop: '15px', 
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: completada ? 'green' : 'red'
      }
    }>
      <h4>Completada: {completada ? 'si' : 'no'}</h4>
      <Typography sx={{ maxWidth: '100px' }}>{descripcion}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={fechaCorrecta}>
          <DatePicker
            sx={{ width: '100%' }}
            label="Fecha"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {showIconTask()}
      </Box>
    </Box>
  )
}
