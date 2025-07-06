import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-size: 1.1rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>🏛️ Zabytki UNESCO w Polsce</Title>
      <Subtitle>Interaktywna mapa obiektów wpisanych na Listę Światowego Dziedzictwa UNESCO</Subtitle>
    </HeaderContainer>
  );
};

export default Header; 