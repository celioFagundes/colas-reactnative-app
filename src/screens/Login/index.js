import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../config/auth';
import {
  Wrapper,
  Input,
  Button,
  ButtonTitle,
  NovaConta,
  Link,
  Error,
} from './style';

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (auth.user !== null) {
      props.navigation.navigate('Loading');
    }
  }, [auth.user]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowError(false);
      };
    }, [])
  );

  const renderError = (error) => {
    switch (error) {
      case 'auth/invalid-email':
        return 'Digite um email válido';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/user-not-found':
        return 'Usuario não encontrado';
      default:
        return 'Digite um email e senha válidos';
    }
  };

  const loginUser = (email, senha) => {
    let emailTrim = email.trim()
    auth.login.login(emailTrim, senha);
    setShowError(true);
  };

  return (
    <Wrapper colors={['#6E99FF', '#3772ff']}>
      <Input
        autoCompleteType='off'
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='Digite seu email'
      />
      <Input
        autoCompleteType='off'
        onChangeText={(text) => setSenha(text)}
        value={senha}
        placeholder='Digite sua senha'
        secureTextEntry={true}
      />
      {auth.login.loginStatus !== null && showError && (
        <Error>{renderError(auth.login.loginStatus.code)}</Error>
      )}
      <Button onPress={() => loginUser(email, senha)}>
        <ButtonTitle>Entrar</ButtonTitle>
      </Button>
      <NovaConta>
        Não possui uma conta ?
        <Link onPress={() => props.navigation.navigate('NovoUser')}>
          Criar uma conta
        </Link>
      </NovaConta>
    </Wrapper>
  );
};

export default Login;
