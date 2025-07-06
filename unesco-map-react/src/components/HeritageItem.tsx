import React from 'react';
import styled from 'styled-components';
import { HeritageSite } from '../types/heritage';
import { generateGoogleMapsLink } from '../services/api';

interface HeritageItemProps {
  site: HeritageSite;
  isSelected: boolean;
  onClick: () => void;
}

const ItemContainer = styled.div<{ isSelected: boolean }>`
  padding: 1.5rem;
  border-bottom: 1px solid #ecf0f1;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isSelected ? '#e3f2fd' : 'white'};
  overflow: hidden;
  min-height: 120px;
  border-left: ${props => props.isSelected ? '4px solid #2196f3' : '4px solid transparent'};

  &:hover {
    background: ${props => props.isSelected ? '#e3f2fd' : '#f8f9fa'};
    transform: translateX(5px);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    min-height: 110px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    min-height: 100px;
  }

  /* Touch device improvements */
  @media (hover: none) and (pointer: coarse) {
    min-height: 44px;
    padding: 1rem;

    &:hover {
      background: ${props => props.isSelected ? '#e3f2fd' : 'white'};
      transform: none;
      box-shadow: none;
    }

    &:active {
      background: #f0f0f0;
      transform: scale(0.98);
    }
  }
`;

const SiteName = styled.div`
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const SiteDetails = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const DetailRow = styled.div`
  margin-bottom: 0.3rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #34495e;
`;

const SiteActions = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const YearBadge = styled.div`
  background: #3498db;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 0.5rem;
`;

const NavigateButton = styled.a`
  background: #27ae60;
  color: white;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  min-height: 36px;
  display: flex;
  align-items: center;

  &:hover {
    background: #219a52;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
    min-height: 36px;
  }

  /* Touch device improvements */
  @media (hover: none) and (pointer: coarse) {
    min-height: 36px;
    padding: 0.5rem 0.8rem;

    &:hover {
      background: #27ae60;
      transform: none;
      box-shadow: none;
    }

    &:active {
      background: #219a52;
      transform: scale(0.95);
    }
  }
`;

const HeritageItem: React.FC<HeritageItemProps> = ({ site, isSelected, onClick }) => {
  const lat = parseFloat(site.n);
  const lng = parseFloat(site.e);
  const hasValidCoords = !isNaN(lat) && !isNaN(lng);

  const handleNavigateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ItemContainer isSelected={isSelected} onClick={onClick}>
      <SiteName>{site.nazwa}</SiteName>
      <SiteDetails>
        <DetailRow>
          <DetailLabel>Lokalizacja:</DetailLabel> 
          {site.miejscowosc}
          {site.ulica && `, ${site.ulica}`}
          {site.nrAdresowy && ` ${site.nrAdresowy}`}
        </DetailRow>
        <DetailRow>
          <DetailLabel>Województwo:</DetailLabel> {site.wojewodztwo}
        </DetailRow>
        <DetailRow>
          <DetailLabel>Numer wpisu:</DetailLabel> {site.numerWpisu}
        </DetailRow>
        <SiteActions>
          <YearBadge>Wpis: {site.dataWpisu}</YearBadge>
          {hasValidCoords && (
            <NavigateButton
              href={generateGoogleMapsLink(lat, lng)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavigateClick}
            >
              📍 Nawiguj
            </NavigateButton>
          )}
        </SiteActions>
      </SiteDetails>
    </ItemContainer>
  );
};

export default HeritageItem; 