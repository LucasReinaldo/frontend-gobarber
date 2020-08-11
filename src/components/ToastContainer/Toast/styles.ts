import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'info' | 'success' | 'error';
  hasDescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #c4f5fc;
    color: #3172b7;
  `,

  success: css`
    background: #c2f8cb;
    color: #2e656a;
  `,

  error: css`
    background: #fbc7bc;
    color: #ce2931;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 14px 30px 14px 14px;
  position: relative;
  width: 360px;

  ${(props) => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 2px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      font-size: 12px;
      line-height: 18px;
      margin-top: 4px;
      opacity: 0.8;
    }
  }

  & + div {
    margin-top: 8px;
  }

  button {
    background: transparent;
    border: 0;
    color: inherit;
    opacity: 0.6;
    position: absolute;
    right: 6px;
    top: 6px;
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
