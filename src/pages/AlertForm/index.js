import React, { useState } from 'react';
import { Button, TextField, Stack, Typography, Rating,  } from '@material-ui/core';
import Error from '@mui/icons-material/Error';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import Save from '@mui/icons-material/Save';
import api from "../../services/api";
import { styled } from '@material-ui/core/styles';

const MyStack = styled(Stack)({
    width: '350px',
});

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff4f21',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

export default function AlertForm({setAlertas, setEditAlerta}) {
    const userId = localStorage.getItem('@id');
    const [alerta, setAlerta] = useState({ name: '', description: '', district: '', threatLevel: 1, active: true, userId });
    const handleSave = async e => {
        e.preventDefault();
        console.log('alerta', alerta);
        try {
            const response = await api.post("/api/novo-alerta", alerta);
            console.log('response ', response);
            setEditAlerta(false);
            setAlertas(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form>
            <MyStack spacing={1}>
                <Typography variant="h6" align="center" color="primary">Novo Alerta</Typography>
                <TextField
                    fullWidth
                    label="Nome"
                    id="txtNome"
                    onChange={e => setAlerta({ ...alerta, name: e.target.value })}
                />
                <TextField
                    label="Bairro"
                    fullWidth
                    id="txtBairro"
                    onChange={e => setAlerta({ ...alerta, district: e.target.value })}
                />
                <Stack spacing={1} direction="row">
                    <Typography component="legend">Nivel de ameaça:</Typography>
                    <StyledRating
                        name="customized-color"
                        defaultValue={alerta.threatLevel}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        icon={<Error fontSize="inherit" />}
                        emptyIcon={<ErrorOutline fontSize="inherit" />}
                        onChange={e => setAlerta({ ...alerta, threatLevel: e.target.value })}
                    />
                </Stack>
                <TextField
                    label="Descrição"
                    multiline
                    rows={4}
                    id="txtDesc"
                    onChange={e => setAlerta({ ...alerta, description: e.target.value })}
                />
                <Button fullWidth variant="contained" color="primary" onClick={handleSave} endIcon={<Save />}>
                    Salvar
                </Button>

            </MyStack>
        </form>
    )
}