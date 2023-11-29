import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import UserService from '@/services/userSevices';
import { useRouter } from 'next/router';

export default function PatientInfo() {
  const solicitud = 'Paciente con informacion completa';
  const nombres = 'Juan';
  const apellidos = 'Pérez';
  const identificacion = '123456789';
  const direccion = 'Calle Principal #123';
  const etnia = 'Indígena';
  const fechaNacimiento = '01-01-1990';
  const ciudad = 'Bogotá';
  const estado = 'Cundinamarca';
  const sexo = 'Masculino';
  const [account, setAccount] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const getData = (id) => {
    console.log(id);
    UserService.getId(id).then((resp) => {
      console.log(resp.data);
      if (resp.data !== undefined || resp.data !== null) {
        setAccount(resp.data);
      }

      return resp.data;
    });
  };

  useEffect(() => {
    if (router.isReady) {
      getData(id);
    }
  }, [router.isReady]);

  return (
    <>
      <Container maxWidth="sm" sx={{ minHeight: '100vh' }} className="flex items-center bg-gray-300">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 2.4 }, p: { xs: 2, md: 4 } }}>
          <React.Fragment>
            {account ? (
              <div>
                <Typography variant="h6" className="text-3xl mb-6">
                  Información del paciente
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Tipo de solicitud:</strong> {solicitud}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Nombres:</strong>{' '}
                      {(account.first_name ? account.first_name : '') + ' ' + (account.second_name ? account.second_name : '')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Apellidos:</strong>{' '}
                      {(account.first_last_name ? account.first_last_name : '') +
                        ' ' +
                        (account.second_last_name ? account.second_last_name : '')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Identificación:</strong> {account.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Dirección:</strong> {account.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Etnia:</strong> {account.etnia}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Fecha de nacimiento:</strong> {account.dob.replace('T05:00:00.000Z', '')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Ciudad:</strong> {account.city.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Estado:</strong> {account.city.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Sexo:</strong> {account.sex}
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" sx={{ mt: 3, mr: 3 }} className="text-black bg-gray-500 hover:bg-gray-600" href="/">
                    Volver
                  </Button>
                </Box>
              </div>
            ) : null}
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
}
