import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import './style.css';
import { Typography, Button, Rating } from '@mui/material';
import { styled } from '@material-ui/core/styles';
import { Stop } from '@mui/icons-material';
import Error from '@mui/icons-material/Error';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Timer from './Timer';

const DesButton = styled(Button)`
  background-color: #ff4f21;
  color: #fff;
  padding: 6px 12px;
  &:hover {
    background-color: #910f00;
  }
  &:focus {
    background-color: ff4f21;
  }
`;

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff4f21',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 480,
  height: 220,
});

export default function AlertActive({ emitido, setEmitido }) {

  const handleAlertEmissionCancel = async () => {
    setEmitido({
      name: '',
      description: '',
      threatLevel: 1,
      district: '',
      active: false,
      userId: '',
      isLoading: true,
      hittedUsers: 0,
    });
  }

  return (

    <Box>
      {emitido.isLoading ?
       <Container><CircularProgress /></Container> 
        :
        <>
          <Stack direction="row">
            <div className="container" id="animacao">
              <img className="imagem" src={require("../../assets/warning.png").default} />
            </div>
            <Stack>
              <Typography>{emitido.name}</Typography>
              <Stack spacing={1} direction="row">
                <Typography component="legend">Nivel de ameaça:</Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={emitido.threatLevel}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={1}
                  icon={<Error fontSize="inherit" />}
                  emptyIcon={<ErrorOutline fontSize="inherit" />}
                  readOnly={true}
                />
              </Stack>
              <Typography>Usuários notificados: {emitido.hittedUsers}</Typography>
              <Timer emitido={emitido} />              
              <DesButton onClick={handleAlertEmissionCancel} startIcon={<Stop />}>PARAR ALERTA</DesButton>
            </Stack>
          </Stack>
        </>
      }
    </Box>
  )
}