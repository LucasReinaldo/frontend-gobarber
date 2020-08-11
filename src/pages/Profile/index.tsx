import React, { ChangeEvent, useCallback, useRef } from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory, Link } from 'react-router-dom';
import getInputValidation from '../../utils/getInputValidation';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface ProfileFormData {
  email: string;
  name: string;
  old_password: string;
  password: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string().required('Email is required').email(),
          old_password: Yup.string().nullable(),
          password: Yup.string().when('old_password', {
            is: (value) => !!value.length,
            then: Yup.string().required('New password is required'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (value) => !!value.length,
              then: Yup.string().required('New password is required'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Updated successfully.',
          description: 'Thanks for keeping your data updated! :)',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getInputValidation(err));
        }
        addToast({
          type: 'error',
          title: 'Update error.',
          description: 'Please try again.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleChangeAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        try {
          data.append('avatar', e.target.files[0]);

          api.patch('/users/avatar', data).then((response) => {
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Avatar updated!',
            });
          });
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Update error.',
            description: 'Please try again.',
          });
        }
      }
    },
    [addToast, updateUser],
  );

  return (
    <>
      <Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>
        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleChangeAvatar} />
              </label>
            </AvatarInput>

            <h1>Profile</h1>
            <Input icon={FiUser} name="name" placeholder="Name" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              type="password"
              placeholder="Old password"
            />
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
              placeholder="Confirm password"
            />

            <Button name="btn-submit" type="submit">
              Update
            </Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
