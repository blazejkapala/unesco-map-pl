import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { HeritageSite } from '../types/heritage';
import { generateGoogleMapsLink } from '../services/api';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MapProps {
  heritageData: HeritageSite[];
  selectedSite: HeritageSite | null;
  onSiteSelect: (site: HeritageSite) => void;
  sidebarCollapsed: boolean;
}

const MapWrapper = styled.div`
  flex: 1;
  height: 100%;
  background: #ecf0f1;
  position: relative;

  @media (max-width: 768px) {
    height: 55vh;
    order: 1;
  }

  @media (max-width: 480px) {
    height: 65vh;
  }

  /* Landscape orientation */
  @media (max-width: 768px) and (orientation: landscape) {
    height: 100%;
    order: 2;
  }
`;

const MapContainerStyled = styled(MapContainer)`
  height: 100%;
  width: 100%;
`;

// Custom popup styles
const PopupContent = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.4;
  max-width: 300px;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 480px) {
    max-width: 250px;
    max-height: 300px;
    font-size: 0.9rem;
  }
`;

const PopupTitle = styled.div`
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }
`;

const PopupDetails = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const PopupYear = styled.div`
  background: #e74c3c;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: inline-block;
`;

const PopupNavigateButton = styled.a`
  background: #27ae60;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  margin-top: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #219a52;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    margin-top: 0.4rem;
  }
`;

// Component to handle map updates
const MapUpdater: React.FC<{
  selectedSite: HeritageSite | null;
  heritageData: HeritageSite[];
}> = ({ selectedSite, heritageData }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedSite) {
      const lat = parseFloat(selectedSite.n);
      const lng = parseFloat(selectedSite.e);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        map.setView([lat, lng], 12);
      }
    }
  }, [selectedSite, map]);

  useEffect(() => {
    if (heritageData.length > 0) {
      const validMarkers = heritageData
        .map(site => {
          const lat = parseFloat(site.n);
          const lng = parseFloat(site.e);
          return !isNaN(lat) && !isNaN(lng) ? [lat, lng] : null;
        })
        .filter(Boolean) as [number, number][];

      if (validMarkers.length > 0) {
        const bounds = L.latLngBounds(validMarkers);
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [heritageData, map]);

  return null;
};

const Map: React.FC<MapProps> = ({
  heritageData,
  selectedSite,
  onSiteSelect,
  sidebarCollapsed
}) => {
  const [mapKey, setMapKey] = useState(0);

  // Force map re-render when sidebar collapses/expands
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [sidebarCollapsed]);

  const getValidSites = () => {
    return heritageData
      .map(site => {
        const lat = parseFloat(site.n);
        const lng = parseFloat(site.e);
        return {
          ...site,
          lat,
          lng,
          hasValidCoords: !isNaN(lat) && !isNaN(lng)
        };
      })
      .filter(site => site.hasValidCoords);
  };

  const validSites = getValidSites();

  return (
    <MapWrapper>
      <MapContainerStyled
        key={mapKey}
        center={[51.9194, 19.1451]}
        zoom={6}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
        />
        
        <MapUpdater selectedSite={selectedSite} heritageData={heritageData} />

        {validSites.map((site, index) => (
          <Marker
            key={index}
            position={[site.lat, site.lng]}
            eventHandlers={{
              click: () => onSiteSelect(site)
            }}
          >
            <Popup>
              <PopupContent>
                <PopupTitle>{site.nazwa}</PopupTitle>
                <PopupDetails>
                  <strong>Lokalizacja:</strong> {site.miejscowosc}<br />
                  <strong>Województwo:</strong> {site.wojewodztwo}<br />
                  <strong>Numer wpisu:</strong> {site.numerWpisu}<br />
                  {site.ulica && (
                    <>
                      <strong>Adres:</strong> {site.ulica}
                      {site.nrAdresowy && ` ${site.nrAdresowy}`}<br />
                    </>
                  )}
                  <PopupYear>Wpisany: {site.dataWpisu}</PopupYear>
                  <br />
                  <PopupNavigateButton
                    href={generateGoogleMapsLink(site.lat, site.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Nawiguj w Google Maps
                  </PopupNavigateButton>
                </PopupDetails>
              </PopupContent>
            </Popup>
          </Marker>
        ))}
      </MapContainerStyled>
    </MapWrapper>
  );
};

export default Map; 