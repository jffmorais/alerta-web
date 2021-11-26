import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Card, TextField, Stack, Typography, Container, Box, Avatar } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
import { AZUL, CINZA_CLARO, VERMELHO_CLARO } from "../../configs/colors";
//import './style.css';
const api = axios.create({
    baseURL: "http://localhost:8080"
});

const CadButton = styled(Button)({
    backgroundColor: AZUL,
  });
  
  const LogButton = styled(Button)({
    backgroundColor: VERMELHO_CLARO,
  });

class SignUp extends Component {
    state = { userName: '', email: '', password: '', confirm: '' };


    handleSubmit = async event => {
        const { userName, email, password, confirm } = this.state;
        event.preventDefault();
        if (!userName || !email | !password || !confirm) {
            alert('Os campos precisam ser preenchidos');
        } else {
            if (password !== confirm) {
                alert('As senhas digitados não combinam');
            } else {
                try {
                    const response = await api.post("/api/cadastrar", { userName, email, password, });
                    console.log('signup res -> ', response.data);
                    this.props.history.push("/");
                } catch (error) {
                    alert('Erro no servidor');
                    console.error('Erro no servidor', error)
                }
            }
        }
    }

    handleGoBack = e => {
        e.preventDefault();
        this.props.history.push("/");
    }

    render() {
        return (
            <Container fixed style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: CINZA_CLARO }}>
                <Card sx={{ width: 350, padding: 4 }} variant="outlined">
                    <form onSubmit={this.handleSubmit}>
                        <Stack spacing={1}>
                            <Box sx={{ width: 350, height: 80 }} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar src={require("../../assets/alerta_logo.png").default} alt="Logo" sx={{ width: 80, height: 80 }} />
                            </Box>
                            <Typography variant="h6" align="center" color="primary">GUARDIÃO COMUNTÁRIO</Typography>
                            <Typography variant="subtitle1" align="center">Novo usuário</Typography>
                            <TextField fullWidth label="Nome" id="txtNome" className="nome" onChange={e => this.setState({ userName: e.target.value })} />
                            <TextField fullWidth label="Email" id="txtEmail" onChange={e => this.setState({ email: e.target.value })} />
                            <TextField fullWidth label="Senha" id="txtSenha" type="password" onChange={e => this.setState({ password: e.target.value })} />
                            <TextField fullWidth label="Confirmar senha" id="txtConf" type="password" onChange={e => this.setState({ confirm: e.target.value })} />
                            <Stack spacing={1} direction="row">
                                <LogButton fullWidth variant="contained" color="secondary" onClick={this.handleGoBack} startIcon={<ArrowBack />}>
                                    Voltar
                                </LogButton>
                                <CadButton fullWidth variant="contained" onClick={this.handleSubmit} endIcon={<AddCircleOutlineIcon />}>
                                    Cadastrar
                                </CadButton>
                            </Stack>
                            <Typography variant="subtitle1">* Sujeito a aprovação dos administradores</Typography>
                        </Stack>
                    </form>
                </Card>
            </Container >
        );
    }
}


export default withRouter(SignUp);