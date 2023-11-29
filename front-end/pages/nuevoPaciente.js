'use client';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import UserService from '@/services/userSevices';
import { useRouter } from 'next/router';

export default function NewPacient() {
  const [solicitud, setSolicitud] = useState('');
  const router = useRouter();
  const [pacienteData, setPacienteData] = useState({
    first_name: '',
    second_name: '',
    first_last_name: '',
    second_last_name: '',
    id: '',
    address: '',
    etnia: '',
    user_id: '',
    dob: '',
    is_active: 1,
    city_of_birth: {
      name: '',
      state: ''
    },
    sex: ''
  });

  const [contacto, setContacto] = useState({
    patient_id: '',
    contact_type_id: '',
    contact: '',
    contact_name: '',
    parentesco: '',
    obs: 'activo'
  });

  const handleSolicitudChange = (event) => {
    setSolicitud(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setPacienteData({ ...pacienteData, first_name: event.target.value });
  };

  const handleSecondNameChange = (event) => {
    setPacienteData({ ...pacienteData, second_name: event.target.value });
  };

  const handleFirstLastNameChange = (event) => {
    setPacienteData({ ...pacienteData, first_last_name: event.target.value });
  };

  const handleSecondLastNameChange = (event) => {
    setPacienteData({ ...pacienteData, second_last_name: event.target.value });
  };

  const handleIdChange = (event) => {
    setPacienteData({ ...pacienteData, id: event.target.value });
    setContacto({ ...contacto, patient_id: event.target.value });
  };

  const handleAddressChange = (event) => {
    setPacienteData({ ...pacienteData, address: event.target.value });
  };

  const handleEtniaChange = (event) => {
    setPacienteData({ ...pacienteData, etnia: event.target.value });
  };

  const handleUserChange = (event) => {
    setPacienteData({ ...pacienteData, user_id: event.target.value });
  };

  const handleDobChange = (event) => {
    setPacienteData({ ...pacienteData, dob: event.target.value });
  };

  const handleCityOfBirthChange = (event) => {
    setPacienteData({
      ...pacienteData,
      city_of_birth: {
        ...pacienteData.city_of_birth,
        name: event.target.value
      }
    });
  };

  const handleSexChange = (event) => {
    setPacienteData({ ...pacienteData, sex: event.target.value });
  };

  const handleStateChange = (event) => {
    setPacienteData({
      ...pacienteData,
      city_of_birth: {
        ...pacienteData.city_of_birth,
        state: event.target.value
      }
    });
  };

  const handleContactTypeIdChange = (event) => {
    setContacto({ ...contacto, contact_type_id: event.target.value });
  };

  const handleContactChange = (event) => {
    setContacto({ ...contacto, contact: event.target.value });
  };

  const handleContactNameChange = (event) => {
    setContacto({ ...contacto, contact_name: event.target.value });
  };

  const handleParentescoChange = (event) => {
    setContacto({ ...contacto, parentesco: event.target.value });
  };

  const crearPaciente = async (body) => {
    console.log(body);
    UserService.create(body).then((resp) => {
      crearContacto(contacto);
      return resp.data;
    });
  };

  const crearContacto = async (body) => {
    console.log(body);
    UserService.contactCreate(body).then((resp) => {
      if (resp.status === 200) {
        router.push('/');
      }
      return resp.data;
    });
  };

  async function consumir() {
    await crearPaciente(pacienteData);
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh' }} className="flex items-center">
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 2.4 }, p: { xs: 2, md: 4 } }}>
        <React.Fragment>
          <Typography variant="h6" className="text-3xl">
            Crear nuevo paciente
          </Typography>
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="tipo-solicitud">Tipo de solicitud</InputLabel>
              <Select labelId="tipo-solicitud" id="tipo-solicitud" value={solicitud} label="Solicitud" onChange={handleSolicitudChange}>
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
                label="Primer Nombre"
                fullWidth
                variant="standard"
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="secondName"
                name="secondName"
                label="Segundo Nombre"
                fullWidth
                variant="standard"
                onChange={handleSecondNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstLastName"
                name="firstLastName"
                label="Primer Apellido"
                fullWidth
                variant="standard"
                onChange={handleFirstLastNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="secondLastName"
                name="secondLastName"
                label="Segundo Apellido"
                fullWidth
                variant="standard"
                onChange={handleSecondLastNameChange}
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
                onChange={handleIdChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="address" name="address" label="Dirección" fullWidth variant="standard" onChange={handleAddressChange} />
            </Grid>
            <Box sx={{ minWidth: 120, mt: 4, ml: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" className="items-center">
                  Etnia
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pacienteData.etnia}
                  label="etnia"
                  onChange={handleEtniaChange}
                >
                  <MenuItem value="Indígena">Indígena</MenuItem>
                  <MenuItem value="Afrocolombiano">Afrocolombiano</MenuItem>
                  <MenuItem value="Gitano">Gitano</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 180, mt: 4, ml: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" className="items-center">
                  Medico encargado
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pacienteData.user}
                  label="Medico encargado"
                  onChange={handleUserChange}
                >
                  <MenuItem value={1}>Medico 1</MenuItem>
                  <MenuItem value={2}>Medico 2</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid item xs={12} sm={7} sx={{ ml: 0 }}>
              <TextField
                required
                id="fecha de nacimiento"
                name="fecha de nacimiento"
                label="fecha de nacimiento (yy-mm-dd)"
                fullWidth
                variant="standard"
                onChange={handleDobChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="emergencyContact"
                name="emergencyContact"
                label="Nombre de contacto"
                fullWidth
                variant="standard"
                onChange={handleContactNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="idcontact"
                name="idcontact"
                label="Identificación del contacto"
                fullWidth
                variant="standard"
                onChange={handleContactTypeIdChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="parentesco"
                name="parentesco"
                label="Parentesco del contacto"
                fullWidth
                variant="standard"
                onChange={handleParentescoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="emergencyPhone"
                name="emergencyPhone"
                label="Teléfono de contacto"
                fullWidth
                variant="standard"
                onChange={handleContactChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="Ciudad"
                fullWidth
                variant="standard"
                value={pacienteData.city}
                onChange={handleCityOfBirthChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="state"
                name="state"
                label="Estado"
                fullWidth
                variant="standard"
                value={pacienteData.city_of_birth.state}
                onChange={handleStateChange}
              />
            </Grid>

            <FormControl sx={{ ml: 3, mt: 3 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleSexChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                <FormControlLabel value="other" control={<Radio />} label="Otro" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ mt: 3, mr: 20 }} className="text-black bg-gray-500 hover:bg-gray-600" href="/">
              Volver
            </Button>
            <Box>
              <Button variant="contained" sx={{ mt: 3, ml: 1 }} className="text-black bg-blue-500 hover:bg-blue-600" onClick={consumir}>
                Aceptar
              </Button>
              <Button variant="contained" sx={{ mt: 3, ml: 1 }} className="text-black bg-red-500 hover:bg-red-600">
                Cancelar
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
