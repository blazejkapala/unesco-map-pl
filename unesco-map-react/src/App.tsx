import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { HeritageSite } from './types/heritage';
import { fetchHeritageData } from './services/api';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const App: React.FC = () => {
  const [heritageData, setHeritageData] = useState<HeritageSite[]>([]);
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadHeritageData();
  }, []);

  const loadHeritageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchHeritageData();
      setHeritageData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas ładowania danych');
    } finally {
      setLoading(false);
    }
  };

  const handleSiteSelect = (site: HeritageSite) => {
    setSelectedSite(site);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ErrorBoundary>
      <AppContainer>
        <Header />
        <MainContent>
          <Sidebar
            heritageData={heritageData}
            selectedSite={selectedSite}
            onSiteSelect={handleSiteSelect}
            loading={loading}
            error={error}
            collapsed={sidebarCollapsed}
            onToggle={toggleSidebar}
          />
          <Map
            heritageData={heritageData}
            selectedSite={selectedSite}
            onSiteSelect={handleSiteSelect}
            sidebarCollapsed={sidebarCollapsed}
          />
        </MainContent>
        <Footer />
      </AppContainer>
    </ErrorBoundary>
  );
};

export default App;
