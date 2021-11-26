import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import AlertCard from './AlertCard';
import Stack from '@mui/material/Stack';

export default function AlertList({ setEmitido }) {
    const [alertas, setAlertas] = useState([]);
    const userId = localStorage.getItem('@id');
    const loadData = async () => {
        const res = await api.get("/api/alertas", { params: { id: userId } });
        setAlertas(await res.data);
    };
    useEffect(() => {
        loadData();
        return () => { };
    }, []);

    return (
        <Stack spacing={2}>
            {alertas.map((item) => (
                <AlertCard key={item.id} alert={item} setEmitido={setEmitido} />
            ))}
        </Stack>
    )
}