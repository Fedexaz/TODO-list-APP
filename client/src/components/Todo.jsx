import { Box } from '@mui/material'
import React from 'react'

export default function Todo(props) {
  const {name, fecha, descripcion, completada } = props.todo;

  return (
    <Box sx={{ border: '1px solid gray', marginTop: '15px', marginBottom: '15px' }}>
      <h2>{name}</h2>
      <h3>{fecha}</h3>
      <h3>{descripcion}</h3>
      <h4>{completada}</h4>
    </Box>
  )
}
