import React, { useState } from 'react';

import axios from 'axios';

import { useDispatch } from 'react-redux';

import { loadTodos, putFreeTodo } from '../redux/actions';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TextField from '@mui/material/TextField';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import fechaCorrecta from 'date-fns/locale/es';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function Todo({ todo }) {
  const { fecha, descripcion, completada, id, dateCreacion } = todo;

  const dispatch = useDispatch();

  const dateTodo = new Date(fecha);
  const fechaHoy = new Date();

  const [date, setDate] = useState(dateTodo);
  const [complete, setComplete] = useState(completada);

  const dateTodoEnHoras = ((dateTodo.getTime() / 1000) / 3600).toFixed();
  const dateHoyEnHoras = ((fechaHoy.getTime() / 1000) / 3600).toFixed();

  const showIconTask = (comp) => {
    if ((dateTodoEnHoras - dateHoyEnHoras) >= 0 && !comp) {
      return <AccessTimeIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
    else if ((dateTodoEnHoras - dateHoyEnHoras) >= 0 && comp) {
      return <TaskAltIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
    else if ((dateTodoEnHoras - dateHoyEnHoras) < 0 && !comp) {
      return <ErrorOutlineIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
    else if ((dateTodoEnHoras - dateHoyEnHoras) < 0 && comp) {
      return <TaskAltIcon sx={{ fontSize: '80px', marginLeft: '20px' }} />
    }
  };

  const handleChange = async (e) => {
    setComplete(e.target.checked);
    dispatch(putFreeTodo(id));
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/todos/' + id);
      alert(`"${descripcion}" eliminada correctamente!`);
      dispatch(loadTodos());
    }
    catch (e) {
      console.log(e);
    }
  };

  const changeDate = async (newDate) => {
    setDate(newDate);
    try {
      await axios.put('/todos/' + id, {
        date: newDate,
        dateCreacion,
        descripcion,
        completada
      });
    }
    catch (e) {
      console.log(e);
    }
    dispatch(loadTodos());
  };

  return (
    <Box sx={
      {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid gray',
        padding: '10px',
        marginTop: '15px',
        marginBottom: '15px',
        backgroundColor: (dateTodoEnHoras - dateHoyEnHoras) >= 0
          ?
          completada
            ?
            '#95FF6D'
            :
            '#6DD7FF'
          :
          completada
            ?
            '#95FF6D'
            :
            '#FF876D'
      }
    }>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Checkbox checked={complete} onChange={handleChange} name='completada' />
        <Typography>{descripcion}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={fechaCorrecta}>
          <DatePicker
            sx={{ maxWidth: '250px' }}
            label="Fecha"
            value={date}
            onChange={changeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {showIconTask(completada)}
        <Button color='error' onClick={handleDelete}><DeleteIcon sx={{ fontSize: '30px' }} /></Button>
      </Box>
    </Box>
  )
}
