import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  align-items: center;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #666360;
  display: flex;
  padding: 16px;
  width: 100%;
  transition: color, border-color 0.2s;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #dd1c1a;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #01baef;
      border-color: #01baef;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #01baef;
    `}

  input {
    background: transparent;
    border: 0;
    color: #f4ede8;
    flex: 1;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #dd1c1a;
    color: #fff;

    &::before {
      border-color: #dd1c1a transparent;
    }
  }
`;
