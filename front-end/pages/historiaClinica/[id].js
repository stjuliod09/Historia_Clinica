import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import Button from '@mui/material/Button';
import UserService from '@/services/userSevices';
import { useRouter } from 'next/router';

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
  const dataFinal = [
    {
      grupo_antecedente: 'personal',
      tipo_antecedente: 'alérgico',
      fecha_ocurrencia: '10/10/2023',
      detalle: 'Historia Clínica 1'
    },
    {
      grupo_antecedente: 'familiar',
      tipo_antecedente: 'patológicos',
      fecha_ocurrencia: '07/09/2023',
      detalle: 'Historia Clínica 2'
    },
    {
      grupo_antecedente: 'familiar',
      tipo_antecedente: 'quirúrgico',
      fecha_ocurrencia: '31/12/2022',
      detalle: 'Historia Clínica 3'
    },
    {
      grupo_antecedente: 'familiar',
      tipo_antecedente: 'toxicológicos',
      fecha_ocurrencia: '05/03/2022',
      detalle: 'Historia Clínica 4'
    }
  ];
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

  const [account, setAccount] = useState(null);

  return (
    <div className="h-screen items-center">
      <div className="pt-4 pl-10 mb-1 ml-12 rounded">
        <div className="flex flex-wrap ">
          {account ? (
            <>
              <div className="text-3xl font-bold mt-5 mb-5 text-black">
                Nombre del paciente:{' '}
                {(account.first_name ? account.first_name : 'persona no identificada') +
                  ' ' +
                  (account.second_name ? account.second_name : '') +
                  (account.first_last_name ? account.first_last_name : '') +
                  ' ' +
                  (account.second_last_name ? account.second_last_name : '')}
              </div>
              <div className="text-3xl font-bold ml-20 pl-10 mt-5 mb-5 text-black">Id : {account.id}</div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold mt-5 mb-5 text-black">Nombre del paciente: </div>
              <div className="text-3xl font-bold ml-20 pl-10 mt-5 mb-5 text-black">Id : </div>
            </>
          )}
        </div>
        <div>
          <Button
            component="a"
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            className="text-white mt-14 mb-12 ml-0 bg-black hover:bg-black"
            href="#"
          >
            Ver resumen{' '}
          </Button>
          <Button component="a" variant="contained" className="text-white mt-14 mb-12 ml-6 bg-black hover:bg-black" href="">
            Añadir antecedente
          </Button>
        </div>
        <div>
          <Button component="a" variant="contained" className="text-white mb-5 bg-black hover:bg-black" href="/">
            Volver{' '}
          </Button>
        </div>
      </div>

      <div style={tableContainerStyle}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">GRUPO DE ANTECEDENTE</StyledTableCell>
                <StyledTableCell align="left">TIPO DE ANTECEDENTE</StyledTableCell>
                <StyledTableCell align="left">FECHA DE OCURRENCIA</StyledTableCell>
                <StyledTableCell align="left">DETALLES </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataFinal.length === 0 ? (
                <div className="text-4xl font-bold mt-5 mb-5 text-black">No se han encontrado datos</div>
              ) : (
                dataFinal.map((row) => (
                  <StyledTableRow key={row.grupo_antecedente}>
                    <StyledTableCell>{row.grupo_antecedente === 'null' ? '' : row.grupo_antecedente}</StyledTableCell>
                    <StyledTableCell align="left">{row.tipo_antecedente === 'null' ? '' : row.tipo_antecedente}</StyledTableCell>

                    <StyledTableCell align="left">{row.fecha_ocurrencia === 'null' ? '' : row.fecha_ocurrencia}</StyledTableCell>
                    <StyledTableCell align="left">{row.detalles === 'null' ? '' : <Link href={'/'}>Detalles</Link>}</StyledTableCell>
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
