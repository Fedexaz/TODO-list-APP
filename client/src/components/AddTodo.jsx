import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addTodo, loadTodos } from '../redux/actions';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import fechaCorrecta from 'date-fns/locale/es';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function AddTodo() {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());

  const [dataTodo, setDataTodo] = useState({
    descripcion: '',
    completada: false
  });

  const handleChange = (e) => {
    setDataTodo({
      ...dataTodo,
      [e.target.name]: e.target.name === 'completada' ? e.target.checked : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(dataTodo.descripcion.length > 0){
      const datos = {
        ...dataTodo,
        date
      }
      try{
        dispatch(addTodo(datos));
        alert(` "${dataTodo.descripcion}" agregada correctamente.`);
        dispatch(loadTodos());
      }
      catch(e){
        console.log(e);
      }
    }
    else{
      alert("La descripción es requerida");
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} method='POST'>
        <TextField name='descripcion' value={dataTodo.descripcion} onChange={handleChange} label="Descripcion" sx={{ width: '100%', my: 1 }} required/>
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
        <FormControlLabel sx={{ width: '100%' }} control={<Checkbox checked={dataTodo.completada} onChange={handleChange} name='completada' />} label="¿Completada?" />
        <Button sx={{ mt: 1 }} variant='contained' type='submit'>Agregar tarea</Button>
      </form>
    </Box>
  )
}
