import styled from 'styled-components';

export const Container = styled.header`
  align-items: center;
  border-bottom: solid 1px black;
  display: flex;
  font-size: 30px;
  height: 50px;
  justify-content: space-around;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: normal;

  @media(min-width: 401px) and (max-width: 440px) {
    font-size: 22px;
  }

  @media(min-width: 441px) and (max-width: 540px) {
    font-size: 25px;
  }

  @media(min-width: 541px) {
    font-size: 28px;
  }
`;
