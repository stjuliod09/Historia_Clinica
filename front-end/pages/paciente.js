import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import Link from "next/link";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableContainerStyle = {
  maxWidth: "80%", // Ajusta el ancho máximo del contenedor de la tabla
  margin: "0 auto", // Centra el contenedor de la tabla horizontalmente
  marginBottom: "50px",
  marginTop: "10px",
};

export default function CustomizedTables() {
  const dataFinal = [
    {
      id: "1",
      nombre: "Paciente 1",
      detalles: "Detalles 1",
      historia_clinica: "Historia Clínica 1",
    },
    {
      id: "2",
      nombre: "Paciente 2",
      detalles: "Detalles 2",
      historia_clinica: "Historia Clínica 2",
    },
    {
      id: "3",
      nombre: "Paciente 3",
      detalles: "Detalles 3",
      historia_clinica: "Historia Clínica 3",
    },
    // Agrega más objetos según tus necesidades
  ];

  const [filtro, setFiltro] = useState("");
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };
  const router = useRouter();
  return (
    <div className="h-screen flex items-center">
      <div class="pt-4 pl-10 mb-1 ml-12 rounded">
        <div class="text-3xl font-bold ml-8 text-black">
          Bienvenido, Papi Lindo
        </div>
        <Box sx={{ p: 4, borderRadius: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <div className="text-2xl font-bold text-black">Filtrar por: </div>
            <Box sx={{ minWidth: 140 }}>
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
                  <MenuItem value={1}>Id</MenuItem>
                  <MenuItem value={2}>Nombre</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Box>
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
              {dataFinal.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    {row.id === "null" ? "" : row.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.nombre === "null" ? "" : row.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.detalles === "null" ? (
                      ""
                    ) : (
                      <Link href={"/"}>Detalles</Link>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.historia_clinica === "null"
                      ? ""
                      : row.historia_clinica}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
