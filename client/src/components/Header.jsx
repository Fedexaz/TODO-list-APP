import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { orderTodo, setSorting, freeTodo, saveTodos } from '../redux/actions';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Header() {
  const date = new Date();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = (sortType) => {
    dispatch(orderTodo(sortType))
    dispatch(setSorting(true))
    setAnchorEl(null);
  };

  const freeTodos = async () => {
    dispatch(freeTodo());
    dispatch(saveTodos());
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '40px' }}>Cosas por Hacer</h1>
        <span style={{ fontWeight: '600', fontSize: '20px' }}>Hoy: {date.toLocaleDateString()}</span>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button sx={{ border: '1px solid gray', backgroundColor: 'lightgray', color: 'black' }} onClick={freeTodos}>Liberar seleccionadas</Button>
        <Button
          id="sort"
          aria-controls={open ? 'sort' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ color: 'black' }}
        >
          <FilterAltIcon /> Ordenar
        </Button>
        <Menu
          id="sort"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
        >
          <MenuItem onClick={() => handleClose('fecha_creacion')}>Fecha creación</MenuItem>
          <MenuItem onClick={() => handleClose('fecha_vencimiento')}>Fecha vecimiento</MenuItem>
          <MenuItem onClick={() => handleClose('estado')}>Estado</MenuItem>
        </Menu>
      </Box>
    </>
  )
}
