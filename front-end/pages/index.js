import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import UserService from '@/services/userSevices';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const tableContainerStyle = {
  maxWidth: '80%',
  margin: '0 85px',
  marginBottom: '50px',
  marginTop: '10px'
};

const CustomizedTables = () => {
  // const dataFinal = [
  //   {
  //     id: '1',
  //     nombre: 'Paciente 4',
  //     detalles: 'Detalles 1',
  //     historia_clinica: 'Historia Clínica 1'
  //   },
  //   {
  //     id: '2',
  //     nombre: 'Paciente 5',
  //     detalles: 'Detalles 2',
  //     historia_clinica: 'Historia Clínica 2'
  //   },
  //   {
  //     id: '3',
  //     nombre: 'Paciente 6',
  //     detalles: 'Detalles 3',
  //     historia_clinica: 'Historia Clínica 3'
  //   },
  //   {
  //     id: '4',
  //     nombre: 'Paciente 7',
  //     detalles: 'Detalles 4',
  //     historia_clinica: 'Historia Clínica 4'
  //   }
  // ];

  const [filtro, setFiltro] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [textoFiltro, setTextoFiltro] = useState('');
  const [account, setAccount] = useState(null);
  const [dataFinal, setDataFinal] = useState('');

  const handleFiltroChange = (event) => {
    const tipoFiltro = event.target.value;
    setFiltro(tipoFiltro);

    if (tipoFiltro === 1) {
      // Filtrar por Sexo
      setFilteredData(
        dataFinal.filter((row) => row.sex !== 'null' && row.sex !== null && row.sex.toLowerCase() === textoFiltro.toLowerCase())
      );
    } else if (tipoFiltro === 2) {
      // Filtrar por Etnia
      setFilteredData(
        dataFinal.filter((row) => row.etnia !== 'null' && row.etnia !== null && row.etnia.toLowerCase() === textoFiltro.toLowerCase())
      );
    } else {
      // Si no hay filtro seleccionado, mostrar todos los datos
      setFilteredData(dataFinal);
    }
  };

  const handleTextoFiltroChange = (event) => {
    const texto = event.target.value;
    setTextoFiltro(texto);

    if (filtro === 1) {
      // Filtrar por Sexo
      setFilteredData(dataFinal.filter((row) => row.sex !== '' && row.sex !== null && row.sex.toLowerCase() === texto.toLowerCase()));
    } else if (filtro === 2) {
      // Filtrar por Etnia
      setFilteredData(dataFinal.filter((row) => row.etnia !== '' && row.etnia !== null && row.etnia.toLowerCase() === texto.toLowerCase()));
    } else {
      // Si no hay filtro seleccionado, mostrar todos los datos
      setFilteredData(dataFinal);
    }
  };
  const getData = (id) => {
    UserService.getUserById(id).then((resp) => {
      if (resp.user !== undefined || resp.user !== null) {
        console.log(resp);
        setAccount(resp.newUser);
      }

      return resp.data;
    });
  };

  const getPacientes = () => {
    UserService.getAll().then((resp) => {
      console.log(resp.data);
      setDataFinal(resp.data);
      setFilteredData(resp.data);
      return resp.data;
    });
  };

  useEffect(() => {
    getData(1);
    getPacientes();
  }, []);

  return (
    <>
      <div className="h-screen items-center">
        <div className="pt-4 pl-10 mb-1 ml-12 rounded">
          {account ? (
            <div className="text-3xl font-bold mt-5 mb-5 text-black">Bienvenido, {account.first_name}</div>
          ) : (
            <div className="text-3xl font-bold mt-5 mb-5 text-black">Bienvenido</div>
          )}
          <div className="flex flex-row">
            <div className="flex-flex-colums">
              <Box sx={{ maxWidth: 160 }}>
                <FormControl fullWidth size="small" className="mt-2">
                  <InputLabel id="tipo-filtro" sx={{ fontSize: 14 }}>
                    Tipo de filtro
                  </InputLabel>
                  <Select
                    labelId="tipo-filtro"
                    id="tipo-filtro"
                    value={filtro}
                    label="Filtro"
                    onChange={handleFiltroChange}
                    sx={{ fontSize: 14 }}
                  >
                    <MenuItem value={1}>Sexo</MenuItem>
                    <MenuItem value={2}>Etnia</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ maxWidth: 160 }}>
                <FormControl fullWidth size="small" className="mt-2">
                  <InputLabel id="texto-filtro" sx={{ fontSize: 14 }}></InputLabel>
                  <Input type="text" value={textoFiltro} onChange={handleTextoFiltroChange} sx={{ fontSize: 14 }} />
                </FormControl>
              </Box>
            </div>

            <Button
              component="a"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              className="text-white mt-14 mb-12 ml-20 bg-black hover:bg-black"
              href="/nuevoPaciente"
            >
              Crear nuevo paciente
            </Button>
          </div>
        </div>

        <div style={tableContainerStyle}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="left">NOMBRE</StyledTableCell>
                  <StyledTableCell align="left">DETALLES</StyledTableCell>
                  <StyledTableCell align="left">HISTORIA CLINICA</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!filteredData ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">
                      No se han encontrado coincidencias
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  filteredData.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.id === 'null' ? '' : row.id}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.first_name === null ? 'Paciente no identificado' : row.first_name + ' ' + row.first_last_name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.detalles === 'null' ? '' : <Link href={`/detalles/${row.id}`}>Detalles</Link>}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.historia_clinica === 'null' ? '' : <Link href={` /historiaClinica/${row.id}`}>Historia clinica</Link>}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default CustomizedTables;
