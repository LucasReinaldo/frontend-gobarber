import React, { useRef, useCallback, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getInputValidation from '../../utils/getInputValidation';

import logoImg from '../../assets/logo.svg';

import { Container, AnimatedContainer, Content, Background } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData): Promise<void> => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
            .email('Type a valid e-mail'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Email sent',
          description:
            'We have sent you an Email with instructions to receovery your password.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getInputValidation(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Forgot Password error.',
          description: 'Please check your credentials.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimatedContainer>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recovery password</h1>

              <Input icon={FiMail} name="email" placeholder="E-mail" />

              <Button loading={loading} name="btn-submit" type="submit">
                Recovery
              </Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Back to Login
            </Link>
          </AnimatedContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ForgotPassword;
