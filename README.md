# 🏛️ UNESCO Heritage Sites in Poland - Interactive Map

An interactive web application that displays UNESCO World Heritage Sites in Poland on a map. The application fetches data from the Polish National Heritage Institute API and presents it in a user-friendly interface.

## 🌟 Features

- **Interactive Map**: Powered by Leaflet.js with OpenStreetMap tiles
- **Heritage Sites List**: Sidebar with detailed information about each site
- **Click Navigation**: Click on markers or list items to explore sites
- **Responsive Design**: Works on desktop and mobile devices
- **Cached Data**: Automatic daily data updates with local caching for faster loading
- **Modern UI**: Clean, modern interface with gradient backgrounds
- **Reliable Performance**: Works offline with cached data when API is unavailable

## 🚀 Quick Start with Docker

The easiest way to run this application is using Docker:

### Prerequisites
- Docker and Docker Compose installed on your system

### Running with Docker Compose (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd unesco-map-pl
   ```

2. **Start the application**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - Open your browser and go to: http://localhost:8033

4. **Stop the application**:
   ```bash
   docker-compose down
   ```

### Running with Docker (Manual)

1. **Build the Docker image**:
   ```bash
   docker build -t unesco-heritage-map .
   ```

2. **Run the container**:
   ```bash
   docker run -d -p 8033:8033 --name unesco-map unesco-heritage-map
   ```

3. **Access the application**:
   - Open your browser and go to: http://localhost:8033

## 🛠️ Local Development

If you prefer to run the application locally without Docker:

### Prerequisites
- Python 3.7 or higher
- Internet connection (for API access)

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd unesco-map-pl
   ```

2. **Run the server**:
   ```bash
   python3 server.py 8033
   ```

3. **Access the application**:
   - Open your browser and go to: http://localhost:8033

## 🏗️ Architecture

### Frontend (`index.html`)
- **Single Page Application**: Complete HTML5 application with embedded CSS and JavaScript
- **Leaflet.js**: Interactive mapping library
- **Responsive Design**: CSS Grid and Flexbox for mobile-friendly layout
- **ES6+ JavaScript**: Modern JavaScript with classes and async/await

### Backend (`server.py`)
- **Python HTTP Server**: Simple HTTP server with CORS support
- **Smart Caching**: Serves data from local cache with API fallback
- **Error Handling**: Comprehensive error handling for network and API issues

### Data Management (`scripts/`)
- **Automated Fetching**: Daily CRON job fetches fresh data at 2:00 AM
- **Local Storage**: Data cached in persistent Docker volumes
- **Intelligent Updates**: Only updates when data actually changes

### Data Source
- **API**: https://api.zabytek.gov.pl/nidrestapi/api/data/geoportal/otwarteDaneZestawienieUn?format=json
- **Provider**: Polish National Heritage Institute (Narodowy Instytut Dziedzictwa)

## 📡 API Endpoints

- `GET /` - Main application interface
- `GET /api/unesco` - UNESCO heritage sites data (cached with API fallback)

## 📊 Data Management

- **Cache Location**: `/app/data/unesco_data.json`
- **Metadata**: `/app/data/metadata.json` (contains last update info, record count)
- **Logs**: `/app/logs/fetch_data.log` (CRON job execution logs)
- **Update Schedule**: Daily at 2:00 AM (Europe/Warsaw timezone)
- **Cache Duration**: Data considered fresh for 24 hours

## 🎨 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+, Leaflet.js
- **Backend**: Python 3 (http.server, urllib)
- **Containerization**: Docker, Docker Compose
- **Maps**: OpenStreetMap tiles
- **Data**: Polish National Heritage Institute API

## 🔧 Configuration

### Environment Variables
- `PYTHONUNBUFFERED=1` - Ensures Python output is not buffered (useful for logging)

### Port Configuration
- Default port: 8033
- Can be changed by modifying the `docker-compose.yml` file or passing different port to the server

## 🏥 Health Checks

The application includes health checks that verify:
- Server is running and responding
- API proxy is accessible
- UNESCO API endpoint is reachable

## 📊 Data Format

The application processes data from the Polish National Heritage Institute API, which includes:
- Site names and descriptions
- Geographic coordinates (latitude/longitude)
- Administrative information (region, city, address)
- Entry dates and reference numbers

## 🔒 Security Features

- **Non-root user**: Docker container runs as non-root user
- **CORS enabled**: Proper CORS headers for cross-origin requests
- **Error handling**: Sanitized error messages
- **Input validation**: Basic validation of API responses

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Check what's using the port
   lsof -i :8033
   # Use a different port
   docker-compose up -d --build
   ```

2. **API not responding**:
   - Check your internet connection
   - Verify the UNESCO API is accessible
   - Check Docker logs: `docker logs unesco-heritage-map`
   - App should still work with cached data

3. **Container won't start**:
   ```bash
   # Check Docker logs
   docker-compose logs
   # Rebuild the image
   docker-compose up --build
   ```

4. **Data not updating**:
   ```bash
   # Check CRON logs
   docker exec unesco-heritage-map cat /app/logs/fetch_data.log
   # Manually trigger data fetch
   docker exec unesco-heritage-map python3 /app/scripts/fetch_data.py
   # Check data freshness
   docker exec unesco-heritage-map cat /app/data/metadata.json
   ```

## 📈 Performance

- **Lightweight**: ~15MB Docker image
- **Fast loading**: Minimal dependencies
- **Efficient**: Single API call to load all heritage sites
- **Cached**: Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 👨‍💻 Author

**Błażej Kapała**
- GitHub: [https://github.com/blazejkapala](https://github.com/blazejkapala)
- LinkedIn: [https://www.linkedin.com/in/blazejkapala/](https://www.linkedin.com/in/blazejkapala/)
- Website: [bananowe.it](https://bananowe.it)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Data Source**: Polish National Heritage Institute (Narodowy Instytut Dziedzictwa)
- **Maps**: OpenStreetMap contributors
- **Libraries**: Leaflet.js for interactive mapping
- **API**: UNESCO World Heritage List data from Polish authorities 