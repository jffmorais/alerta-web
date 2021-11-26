import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Campaign from '@mui/icons-material/Campaign';
import Edit from '@mui/icons-material/Edit';
import Error from '@mui/icons-material/Error';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@material-ui/core/styles';
import { Rating, Stack  } from '@material-ui/core';
import api from "../../../services/api";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff4f21',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  const Description = styled(Typography)({
    paddingTop: 10,
  });

export default function AlertCard({alert, setEmitido}) {

    const handleAlertEmission = async () => {
        
        try {
            const res = await api.post("/api/emite-alerta", {
                alertId: alert.id,
                userId: alert.userId,
            });
            console.log("Resposta da emissão de alerta: ", res.data);
            setEmitido({
                name: alert.name,
                description: alert.description,
                threatLevel: alert.threatLevel,
                district: alert.district,
                active: true,
                userId: alert.userId,
                isLoading: false,
                hittedUsers: res.data.hittedUsers,
            });
        } catch (error) {
            console.error("Erro na emissão do alerta: ", error);
        }
        
    }

    return (
        <Card sx={{ maxWidth: 380 }}>
            
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {alert.name}
                </Typography>
                <Stack spacing={1} direction="row">
                    <Typography component="legend">Nivel de ameaça:</Typography>
                    <StyledRating
                        name="customized-color"
                        defaultValue={alert.threatLevel}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        icon={<Error fontSize="inherit" />}
                        emptyIcon={<ErrorOutline fontSize="inherit" />}
                        readOnly={true}                        
                    />
                </Stack>
                <Description variant="body1" color="text.secondary">
                    {alert.description}
                </Description>
            </CardContent>
            <CardActions>
                <Button size="small" startIcon={<Edit />}>Editar alerta</Button>
                <Button size="small" onClick={handleAlertEmission} variant="contained" color="success" endIcon={<Campaign />}>Emitir alerta agora</Button>
            </CardActions>
        </Card>
    )
}