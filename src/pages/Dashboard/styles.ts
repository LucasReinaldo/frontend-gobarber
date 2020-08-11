import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  background-color: #28262e;
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  margin: 0 auto;
  max-width: 1120px;

  > img {
    height: 80px;
  }

  div.buttons {
    margin-left: auto;

    button {
      background: transparent;
      border: 0;
      padding: 10px;

      svg {
        color: #999591;
        height: 22px;
        width: 22px;
        transition: color 0.3s;
      }

      svg:hover {
        color: #01baef;
      }

      > svg:hover {
        color: #ef3601;
      }
    }
  }
`;

export const Profile = styled.div`
  a {
    text-decoration: none;
    align-items: center;
    display: flex;
    margin-left: 80px;

    img {
      border-radius: 50%;
      height: 64px;
      width: 64px;
    }

    div {
      display: flex;
      flex-direction: column;
      line-height: 22px;
      margin-left: 16px;
      transition: opacity 0.6s;

      &:hover {
        opacity: 0.8;
      }

      span {
        color: #f4ede8;
      }

      strong {
        color: #01baef;
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;
  margin: 64px auto;
  max-width: 1120px;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #01baef;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background-color: #01baef;
      margin: 0 8px;
    }
  }
`;

export const NextAppointments = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    align-items: center;
    background-color: #3e3b47;
    border-radius: 10px;
    display: flex;
    margin-top: 24px;
    padding: 16px 24px;
    position: relative;

    &::before {
      content: '';
      background-color: #01baef;
      height: 80%;
      left: 0;
      position: absolute;
      top: 10%;
      width: 2px;
    }

    img {
      border-radius: 50%;
      height: 80px;
      width: 80px;
    }

    strong {
      color: 24px;
      font-size: 20px;
      margin-left: 24px;
    }

    span {
      align-items: center;
      color: #999591;
      display: flex;
      margin-left: auto;

      svg {
        color: #01baef;
        margin-right: 8px;
        height: 20px;
        width: 20px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    border-bottom: 1px solid #3e3b47;
    color: #999591;
    display: block;
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  > p {
    color: ${shade(0.3, '#999591')};
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    align-items: center;
    color: #f4ede8;
    display: flex;
    margin-left: auto;
    width: 70px;

    svg {
      color: #01baef;
      margin-right: 8px;
      height: 18px;
      width: 18px;
    }
  }

  div {
    align-items: center;
    background-color: #3e3b47;
    border-radius: 10px;
    display: flex;
    flex: 1;
    margin-left: 24px;
    padding: 16px 24px;

    img {
      border-radius: 50%;
      height: 64px;
      width: 64px;
    }

    strong {
      color: 24px;
      font-size: 16px;
      margin-left: 24px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background-color: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #01baef !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
