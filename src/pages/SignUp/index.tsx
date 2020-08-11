import React, { useCallback, useRef } from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import getInputValidation from '../../utils/getInputValidation';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, AnimatedContainer, Content, Background } from './styles';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string().required('Email is required').email(),
          password: Yup.string().min(6, 'Password must have at least 6 digits'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Sign up successfully.',
          description: 'You can logon now! :)',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getInputValidation(err));
        }
        addToast({
          type: 'error',
          title: 'Sign up error.',
          description: 'Please try again.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />

        <Content>
          <AnimatedContainer>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Sign Up</h1>

              <Input icon={FiUser} name="name" placeholder="Name" />
              <Input icon={FiMail} name="email" placeholder="E-mail" />
              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Password"
              />

              <Button name="btn-submit" type="submit">
                Submit
              </Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Already registred? Login.
            </Link>
          </AnimatedContainer>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
