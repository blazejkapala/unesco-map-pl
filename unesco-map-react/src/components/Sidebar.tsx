import React from 'react';
import styled from 'styled-components';
import { HeritageSite } from '../types/heritage';
import HeritageItem from './HeritageItem';
import Loading from './Loading';

interface SidebarProps {
  heritageData: HeritageSite[];
  selectedSite: HeritageSite | null;
  onSiteSelect: (site: HeritageSite) => void;
  loading: boolean;
  error: string | null;
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarContainer = styled.div<{ collapsed: boolean }>`
  width: 350px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  overflow-y: auto;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (max-width: 1024px) and (min-width: 769px) {
    width: 300px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-height: ${props => props.collapsed ? '60px' : '45vh'};
    order: 2;
    border-right: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  @media (max-width: 480px) {
    max-height: ${props => props.collapsed ? '60px' : '35vh'};
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  background: #34495e;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const HeaderTitle = styled.h2`
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Counter = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  display: inline-block;
`;

const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const HeritageList = styled.div`
  flex: 1;
  overflow-y: auto;
`;



const ErrorMessage = styled.div`
  background: #e74c3c;
  color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const Sidebar: React.FC<SidebarProps> = ({
  heritageData,
  selectedSite,
  onSiteSelect,
  loading,
  error,
  collapsed,
  onToggle
}) => {
  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader>
        <HeaderContent>
          <HeaderTitle>Lista Zabytków</HeaderTitle>
          <Counter>
            {loading ? 'Ładowanie...' : error ? 'Błąd' : `${heritageData.length} obiektów`}
          </Counter>
        </HeaderContent>
        <ToggleButton onClick={onToggle} aria-label={collapsed ? 'Rozwiń listę' : 'Zwiń listę'}>
          {collapsed ? '▲' : '▼'}
        </ToggleButton>
      </SidebarHeader>
      
      <HeritageList>
        {loading && <Loading message="Pobieranie danych z API..." />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && heritageData.length === 0 && (
          <Loading message="Brak danych do wyświetlenia" />
        )}
        {!loading && !error && heritageData.map((site, index) => (
          <HeritageItem
            key={index}
            site={site}
            isSelected={selectedSite?.numerWpisu === site.numerWpisu}
            onClick={() => onSiteSelect(site)}
          />
        ))}
      </HeritageList>
    </SidebarContainer>
  );
};

export default Sidebar; 