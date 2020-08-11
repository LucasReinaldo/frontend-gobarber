import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getInputValidation from '../../utils/getInputValidation';

import logoImg from '../../assets/logo.svg';

import { Container, AnimatedContainer, Content, Background } from './styles';

interface SignInFormCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormCredentials): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
            .email('Type a valid e-mail'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getInputValidation(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Sign in error.',
          description: 'Please check your credentials.',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimatedContainer>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Login</h1>

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

              <Link to="/forgot-password">
                I can&apos;t remember my password
              </Link>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Create account
            </Link>
          </AnimatedContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
