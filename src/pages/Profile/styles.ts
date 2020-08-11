import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    width: 100%;
    height: 144px;
    background-color: #28262e;
    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      margin-left: 80px;

      svg {
        height: 24px;
        width: 24px;
        color: #999591;
      }
    }
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: -180px auto 0;

  form {
    margin: 80px;
    text-align: center;
    width: 340px;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 22px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    height: 214px;
    width: 214px;
    border-radius: 50%;
  }

  label {
    align-items: center;
    background-color: #01baef;
    border-radius: 50%;
    border: 0;
    bottom: 0;
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    position: absolute;
    right: 15px;
    transition: background 0.2s;
    width: 48px;

    input {
      display: none;
    }

    svg {
      height: 20px;
      width: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#01baef')};
    }
  }
`;
