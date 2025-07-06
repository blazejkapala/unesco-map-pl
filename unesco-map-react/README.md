# Mapa Zabytków UNESCO w Polsce - React App

Nowoczesna, responsywna aplikacja React do wyświetlania interaktywnej mapy zabytków UNESCO w Polsce.

## 🚀 Funkcje

- **W pełni responsywny design** - działa na wszystkich urządzeniach
- **Interaktywna mapa** - wykorzystuje Leaflet.js
- **Lista zabytków** - z możliwością filtrowania i wyszukiwania
- **Nawigacja Google Maps** - bezpośrednie linki do nawigacji
- **Nowoczesny UI** - wykorzystuje styled-components
- **TypeScript** - pełne typowanie dla lepszego DX
- **Dostępność** - zgodność z WCAG

## 📱 Responsywność

Aplikacja jest w pełni responsywna i dostosowana do:

- **Telefonów** (≤480px) - zoptymalizowany układ pionowy
- **Tabletów** (481px-768px) - dostosowane proporcje
- **Desktopów** (≥769px) - pełny układ z sidebarem
- **Orientacji poziomej** - inteligentne przełączanie układu

## 🛠️ Technologie

- **React 18** z TypeScript
- **Styled Components** - CSS-in-JS
- **React Leaflet** - integracja z mapami
- **Leaflet.js** - biblioteka map
- **Docker** - konteneryzacja

## 🚀 Uruchomienie

### Development

```bash
cd unesco-map-react
npm install
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

### Production z Docker

```bash
# Uruchomienie całej aplikacji (frontend + backend)
docker-compose -f docker-compose.react.yml up --build

# Tylko frontend
docker build -t unesco-frontend ./unesco-map-react
docker run -p 3000:80 unesco-frontend
```

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty React
│   ├── Header.tsx      # Nagłówek aplikacji
│   ├── Sidebar.tsx     # Panel z listą zabytków
│   ├── Map.tsx         # Komponent mapy
│   └── HeritageItem.tsx # Pojedynczy element listy
├── services/           # Serwisy API
│   └── api.ts         # Funkcje do komunikacji z API
├── types/             # Definicje TypeScript
│   └── heritage.ts    # Typy dla danych zabytków
└── App.tsx            # Główny komponent aplikacji
```

## 🎨 Design System

### Kolory
- **Primary**: #3498db (niebieski)
- **Success**: #27ae60 (zielony)
- **Warning**: #f39c12 (pomarańczowy)
- **Error**: #e74c3c (czerwony)
- **Background**: gradient #667eea → #764ba2

### Breakpointy
- **Mobile**: ≤480px
- **Tablet**: 481px-768px
- **Desktop**: ≥769px

### Typografia
- **Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive scaling** - automatyczne skalowanie czcionek

## ♿ Dostępność

- **Keyboard navigation** - pełna obsługa klawiatury
- **Screen readers** - odpowiednie ARIA labels
- **Focus management** - widoczne focusy
- **Reduced motion** - obsługa preferencji użytkownika
- **Touch targets** - minimum 44px dla dotyku

## 🔧 Konfiguracja

### Zmienne środowiskowe

```bash
REACT_APP_API_URL=http://localhost:8033  # URL backend API
```

### Proxy API

Aplikacja używa proxy do komunikacji z backendem (skonfigurowane w `package.json`).

## 📊 Performance

- **Code splitting** - automatyczne dzielenie kodu
- **Lazy loading** - leniwe ładowanie komponentów
- **Image optimization** - zoptymalizowane obrazy
- **Gzip compression** - kompresja w produkcji

## 🧪 Testowanie

```bash
npm test          # Uruchomienie testów
npm run build     # Build produkcyjny
npm run eject     # Eject (nieodwracalne!)
```

## 📈 Monitoring

Aplikacja zawiera:
- **Error boundaries** - obsługa błędów
- **Loading states** - stany ładowania
- **Health checks** - sprawdzanie stanu API

## 🤝 Contributing

1. Fork projektu
2. Stwórz feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

Projekt jest dostępny na licencji MIT - zobacz plik [LICENSE](LICENSE) dla szczegółów.

## 👨‍💻 Autor

**Błażej Kapała**
- GitHub: [@blazejkapala](https://github.com/blazejkapala)
- LinkedIn: [blazejkapala](https://www.linkedin.com/in/blazejkapala/)
- Website: [bananowe.it](https://bananowe.it)
