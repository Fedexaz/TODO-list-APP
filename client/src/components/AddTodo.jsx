import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function AddTodo() {
  const [value, setValue] = useState(new Date());

  console.log(value.getTime())

  return (
    <Box sx={{ width: '100%' }}>
      <TextField label="Nombre" sx={{ width: '100%', my: 1 }}/>
      <TextField label="Descripcion" sx={{ width: '100%', my: 1 }}/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  )
}
