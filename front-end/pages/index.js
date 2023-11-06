"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

export default function NewPacient() {
  const [etnia, setEtnia] = useState("");
  const [solicitud, setSolicitud] = useState("");

  const handleEtniaChange = (event) => {
    setEtnia(event.target.value);
  };

  const handleSolicitudChange = (event) => {
    setSolicitud(event.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
      }}
      className="flex items-center"
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 2.4 }, p: { xs: 2, md: 4 } }}
      >
        <React.Fragment>
          <Typography variant="h6" className="text-3xl">
            Crear nuevo paciente
          </Typography>
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="tipo-solicitud">Tipo de solicitud</InputLabel>
              <Select
                labelId="tipo-solicitud"
                id="tipo-solicitud"
                value={solicitud}
                label="Solicitud"
                onChange={handleSolicitudChange}
              >
                <MenuItem value={1}>Paciente NN</MenuItem>
                <MenuItem value={2}>Paciente con informacion completa</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Nombres"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Apellidos"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="identity"
                name="identity"
                label="Identificación"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Dirección"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Box sx={{ minWidth: 120, mt: 4, ml: 3 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  className="items-center"
                >
                  Etnia
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={etnia}
                  label="etnia"
                  onChange={handleEtniaChange}
                >
                  <MenuItem value={1}>Indígena</MenuItem>
                  <MenuItem value={2}>Afrocolombiano</MenuItem>
                  <MenuItem value={3}>Gitano</MenuItem>
                  <MenuItem value={4}>Otro</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid item xs={12} sm={6} sx={{ ml: 4 }}>
              <TextField
                required
                id="edad"
                name="edad"
                label="Edad"
                fullWidth
                variant="standard"
              />
            </Grid>
            <FormControl sx={{ ml: 3, mt: 3 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Sexo
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Otro"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {" "}
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              className="text-black bg-blue-500 hover:bg-blue-600"
            >
              {" "}
              Aceptar{" "}
            </Button>{" "}
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              className="text-black bg-red-500 hover:bg-red-600"
            >
              {" "}
              Cancelar{" "}
            </Button>{" "}
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
