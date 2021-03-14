import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { setUserToken } from '../utils/APIConfig';
import MyCoursesPNG from '../../public/images/mycourses.png';

import { AuthUser, ReasonAuthType } from './helpers';

const ContainerStyled = styled(Container)`
  display: flex;
  height: 600px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxTextStyled = styled(Box)`
  display: flex;
  height: 100px;
  margin: 10px 0;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const BoxContentStyled = styled(Box)`
  display: flex;
  margin: 10px 0;
  justify-content: space-evenly;
  align-items: center;
`;

const Image = styled.img`
  width: 400px;
  height: 300px;
`;

const PaperStyled = styled(Paper)`
  display: flex;
  width: 400px;
  height: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  box-shadow: rgb(33 38 44 / 12%) 0px 14px 28px, rgb(33 38 44 / 13%) 0px 10px 10px;
`;

const TextFieldStyled = styled(TextField)`
  width: 300px;
  height: 48px;
  margin: 10px 0;
`;

const BoxStyled = styled(Box)`
  display: flex;
  width: 100%;
  height: 48px;
  margin: 30px 0 0 0;
  justify-content: space-evenly;
  align-items: center;
`;

const Dashboard: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useHistory();
  const handleChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const handleChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
    [],
  );

  const submitData = useCallback((reason: ReasonAuthType) => {
    AuthUser(email, password, reason).then(({ token }) => {
      if (token) {
        setUserToken(token);
        push('/courses');
      }
    })
  }, [email, password, push]);

  return (
    <ContainerStyled maxWidth="md">
      <BoxTextStyled>
        <Typography variant="h4" component="h1">
          Образовательная экосистема MyCourses
        </Typography>
      </BoxTextStyled>
      <BoxContentStyled>
        <Image src={MyCoursesPNG} title="MyCorses" alt="MyCourses" />
        <PaperStyled>
          <Typography variant="h6" component="h3">
            Авторизация:
          </Typography>
          <TextFieldStyled
            id="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            label="Логин"
            variant="outlined"
            required
          />
          <TextFieldStyled
            id="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            label="Пароль"
            variant="outlined"
            required
          />
          <BoxStyled>
            <Button variant="contained" color="primary" onClick={() => submitData('signup')}>
              Зарегистрироваться
            </Button>
            <Button variant="contained" color="secondary" onClick={() => submitData('signin')}>
              Войти
            </Button>
          </BoxStyled>
        </PaperStyled>
      </BoxContentStyled>
    </ContainerStyled>
  );
};

export default memo(Dashboard);
