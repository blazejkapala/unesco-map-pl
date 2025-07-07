import { HeritageSite } from '../types/heritage';

// Use relative URL for API calls - nginx will handle the routing
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const fetchHeritageData = async (): Promise<HeritageSite[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/unesco`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      throw new Error('Nieprawidłowa struktura danych');
    }
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
    throw error;
  }
};

export const generateGoogleMapsLink = (lat: number, lng: number): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}; 