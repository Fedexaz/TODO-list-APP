import React from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Header() {
  const date = new Date();
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{fontSize: '40px'}}>Cosas por Hacer</h1>
      <span style={{ fontWeight: '600', fontSize: '20px' }}>Hoy: { date.toLocaleDateString() }</span>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button>Liberar seleccionadas</Button>
      <Button>Ordenar</Button>
    </Box>
    </>
  )
}
