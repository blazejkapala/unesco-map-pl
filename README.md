# 🏛️ Mapa Zabytków UNESCO w Polsce

Interaktywna mapa obiektów wpisanych na Listę Światowego Dziedzictwa UNESCO w Polsce.

## 🌟 Features

- **Interactive Map**: Powered by Leaflet.js with OpenStreetMap tiles
- **Heritage Sites List**: Sidebar with detailed information about each site
- **Click Navigation**: Click on markers or list items to explore sites
- **Responsive Design**: Works on desktop and mobile devices
- **Cached Data**: Automatic daily data updates with local caching for faster loading
- **Modern UI**: Clean, modern interface with gradient backgrounds
- **Reliable Performance**: Works offline with cached data when API is unavailable

## 🚀 Szybki start z Docker

### Wymagania
- Docker
- Docker Compose

### Uruchomienie
```bash
# Sklonuj repozytorium
git clone <repository-url>
cd unesco-map-pl

# Uruchom aplikację
docker-compose up -d

# Sprawdź status
docker-compose ps
```

Aplikacja będzie dostępna pod adresem: **http://localhost:8033**

### Struktura kontenerów
- **nginx** (port 8033) - Reverse proxy
- **frontend** - React aplikacja
- **backend** - Python API server

## 🏗️ Architektura

### Frontend (React + TypeScript)
- Interaktywna mapa z Leaflet
- Responsywny design
- Lista zabytków z wyszukiwaniem
- Nawigacja do Google Maps

### Backend (Python)
- Proxy API do Narodowego Instytutu Dziedzictwa
- Cache'owanie danych lokalnie
- Obsługa CORS
- Fallback mechanizmy

### Nginx Reverse Proxy
- Routing API do backend
- Serwowanie statycznych plików frontend
- Kompresja i cache'owanie
- Obsługa CORS

## 📁 Struktura projektu

```
unesco-map-pl/
├── docker-compose.yml          # Główna konfiguracja Docker
├── nginx-proxy.conf            # Konfiguracja nginx reverse proxy
├── server.py                   # Python backend server
├── unesco-map-react/           # React frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── nginx.conf
└── README.md
```

## 🔧 Konfiguracja

### Zmienne środowiskowe
- `REACT_APP_API_URL` - URL do API (domyślnie: względny URL)
- `PYTHONUNBUFFERED=1` - Logi Python w czasie rzeczywistym
- `TZ=Europe/Warsaw` - Strefa czasowa

### Porty
- **8033** - Główny port aplikacji (nginx)
- **8033** - Backend API (wewnętrzny)
- **80** - Frontend (wewnętrzny)

## 📊 Dane

Aplikacja pobiera dane z:
- **API źródłowe**: https://api.zabytek.gov.pl/nidrestapi/api/data/geoportal/otwarteDaneZestawienieUn
- **Cache**: Lokalny plik JSON w kontenerze
- **Aktualizacja**: Automatyczna co 25 godzin

## 🛠️ Rozwój

### Lokalny rozwój
```bash
# Backend
cd unesco-map-react
npm install
npm start

# Backend (w osobnym terminalu)
python3 server.py
```

### Build i deploy
```bash
# Build wszystkich obrazów
docker-compose build

# Uruchom w trybie produkcyjnym
docker-compose up -d

# Sprawdź logi
docker-compose logs -f
```

## 🔍 Debugowanie

### Sprawdzenie statusu
```bash
# Status kontenerów
docker-compose ps

# Logi wszystkich serwisów
docker-compose logs

# Logi konkretnego serwisu
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

### Health check
```bash
# Sprawdź API
curl http://localhost:8033/api/unesco

# Sprawdź health endpoint
curl http://localhost:8033/health
```

## 🚀 Produkcja

### Optymalizacje
- Kompresja gzip
- Cache'owanie statycznych plików
- Security headers
- Health checks

### Monitoring
- Logi nginx
- Health checks Docker
- Metryki kontenerów

## 📝 Licencja

Projekt jest dostępny na licencji MIT.

## 👨‍💻 Autor

Błażej Kapała

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Data Source**: Polish National Heritage Institute (Narodowy Instytut Dziedzictwa)
- **Maps**: OpenStreetMap contributors
- **Libraries**: Leaflet.js for interactive mapping
- **API**: UNESCO World Heritage List data from Polish authorities 