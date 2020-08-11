import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getInputValidation from '../../utils/getInputValidation';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Container, AnimatedContainer, Content, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Password is required'),
          password_confirmation: Yup.string()
            .required('Confirmation is required')
            .oneOf([Yup.ref('password'), null], 'Password must match'),
        });

        await schema.validate(data, { abortEarly: false });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getInputValidation(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Reset password error.',
          description: 'Please check your credentials.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimatedContainer>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Reset password</h1>

              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="New password"
              />

              <Input
                icon={FiLock}
                name="password_confirmation"
                type="password"
                placeholder="Password confirmation"
              />

              <Button name="btn-submit" type="submit">
                Reset
              </Button>
            </Form>
          </AnimatedContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ResetPassword;
