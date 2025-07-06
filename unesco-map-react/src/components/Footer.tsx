import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(52, 73, 94, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0.8rem 0;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.8rem;
  }
`;

const FooterText = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const FooterLink = styled.a`
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          Stworzone z ❤️ przez <strong>Błażej Kapała</strong> • 
          <FooterLink href="https://github.com/blazejkapala" target="_blank" rel="noopener noreferrer">
            {' '}GitHub
          </FooterLink> • 
          <FooterLink href="https://www.linkedin.com/in/blazejkapala/" target="_blank" rel="noopener noreferrer">
            {' '}LinkedIn
          </FooterLink> • 
          <FooterLink href="https://bananowe.it" target="_blank" rel="noopener noreferrer">
            {' '}bananowe.it
          </FooterLink>
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 