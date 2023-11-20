import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Link from "next/link";
import Button from "@mui/material/Button";
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
  maxWidth: "80%",
  margin: "0 85px",
  marginBottom: "50px",
  marginTop: "10px",
};

const CustomizedTables = () => {
  const dataFinal = [
    {
      id: "1",
      nombre: "Paciente 4",
      detalles: "Detalles 1",
      historia_clinica: "Historia Clínica 1",
    },
    {
      id: "2",
      nombre: "Paciente 5",
      detalles: "Detalles 2",
      historia_clinica: "Historia Clínica 2",
    },
    {
      id: "3",
      nombre: "Paciente 6",
      detalles: "Detalles 3",
      historia_clinica: "Historia Clínica 3",
    },
    {
      id: "4",
      nombre: "Paciente 7",
      detalles: "Detalles 4",
      historia_clinica: "Historia Clínica 4",
    },
  ];

  const [filtro, setFiltro] = useState("");
  const [filteredData, setFilteredData] = useState(dataFinal);
  const [textoFiltro, setTextoFiltro] = useState("");

  const handleFiltroChange = (event) => {
    const tipoFiltro = event.target.value;
    setFiltro(tipoFiltro);

    // Filtrar los datos según el tipo de filtro y el texto de filtro
    if (tipoFiltro === 1) {
      // Filtrar por ID
      setFilteredData(
        dataFinal.filter(
          (row) =>
            row.id !== "null" &&
            row.id.toLowerCase().includes(textoFiltro.toLowerCase())
        )
      );
    } else if (tipoFiltro === 2) {
      // Filtrar por Nombre
      setFilteredData(
        dataFinal.filter(
          (row) =>
            row.nombre !== "null" &&
            row.nombre.toLowerCase().includes(textoFiltro.toLowerCase())
        )
      );
    } else {
      // Si no hay filtro seleccionado, mostrar todos los datos
      setFilteredData(dataFinal);
    }
  };

  const handleTextoFiltroChange = (event) => {
    const texto = event.target.value;
    setTextoFiltro(texto);

    // Filtrar los datos según el tipo de filtro y el texto de filtro
    if (filtro === 1) {
      // Filtrar por ID
      setFilteredData(
        dataFinal.filter(
          (row) =>
            row.id !== "null" &&
            row.id.toLowerCase().includes(texto.toLowerCase())
        )
      );
    } else if (filtro === 2) {
      // Filtrar por Nombre
      setFilteredData(
        dataFinal.filter(
          (row) =>
            row.nombre !== "null" &&
            row.nombre.toLowerCase().includes(texto.toLowerCase())
        )
      );
    } else {
      // Si no hay filtro seleccionado, mostrar todos los datos
      setFilteredData(dataFinal);
    }
  };

  return (
    <div className="h-screen items-center">
      <div className="pt-4 pl-10 mb-1 ml-12 rounded">
        <div className="text-3xl font-bold mt-5 mb-5 text-black">
          Bienvenido, René
        </div>
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
                  <MenuItem value={1}>Id</MenuItem>
                  <MenuItem value={2}>Nombre</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ maxWidth: 160 }}>
              <FormControl fullWidth size="small" className="mt-2">
                <InputLabel
                  id="texto-filtro"
                  sx={{ fontSize: 14 }}
                ></InputLabel>
                <Input
                  type="text"
                  value={textoFiltro}
                  onChange={handleTextoFiltroChange}
                  sx={{ fontSize: 14 }}
                />
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
              {filteredData.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={4} align="center">
                    No se han encontrado coincidencias
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                filteredData.map((row) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default CustomizedTables;
