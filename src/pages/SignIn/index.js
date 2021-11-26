import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Button, Card, TextField, Stack, Typography, Avatar, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Add from '@mui/icons-material/Add';
import Login from '@mui/icons-material/Login';
import { login } from "../../services/auth";
import api from "../../services/api";
import { CINZA_CLARO, VERMELHO_CLARO, AZUL } from "../../configs/colors";
//import './style.css';

const CadButton = styled(Button)({
  backgroundColor: VERMELHO_CLARO,
});

const LogButton = styled(Button)({
  backgroundColor: AZUL,
});

class SignIn extends Component {
  state = { email: '', senha: '', error: '' };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, senha } = this.state;
    if (!email || !senha) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { userName: email, password: senha });
        login(response.data);
        this.props.history.push("/app");
      } catch (err) {
        alert("Houve um problema com o login, verifique suas credenciais");
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais"
        });
        console.log("erro de login");
      }
    }
  };

  handleRegister = e => {
    e.preventDefault();
    this.props.history.push("/signup");
  }

  render() {
    return (
      <Container fixed style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: CINZA_CLARO }}>
        <Card sx={{ width: 350, padding: 4 }} variant="elevation" >
          <form onSubmit={this.handleSubmit}>
            <Stack spacing={1}>
              <Box sx={{ width: 350, height: 80 }} style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar src={require("../../assets/alerta_logo.png").default} alt="Logo" sx={{ width: 80, height: 80 }} />
              </Box>
              <Typography variant="h6" align="center" color="primary">GUARDIÃO COMUNTÁRIO</Typography>
              <Typography variant="subtitle1" align="center">Acesso ao gerenciador</Typography>
              <TextField
                fullWidth
                label="Email"
                id="txtEmail"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <TextField fullWidth label="Senha" id="txtSenha" type="password" onChange={e => this.setState({ senha: e.target.value })} />
              <Stack spacing={1} direction="row">
                <CadButton fullWidth variant="contained" color="secondary" onClick={this.handleRegister} startIcon={<Add />}>
                  CADASTRAR
                </CadButton>
                <LogButton fullWidth variant="contained" onClick={this.handleSignIn} endIcon={<Login />}>
                  LOGIN
                </LogButton>
              </Stack>
            </Stack>
          </form>
        </Card>
      </Container>
    );
  }
}


export default withRouter(SignIn);