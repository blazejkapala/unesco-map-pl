#!/usr/bin/env python3
"""
Simple proxy server for UNESCO heritage sites in Poland
Fetches data from the Polish National Heritage Institute API
"""

import http.server
import socketserver
import urllib.request
import urllib.error
import json
import socket
import sys
import os
from datetime import datetime

# Configuration
UNESCO_API_URL = "https://api.zabytek.gov.pl/nidrestapi/api/data/geoportal/otwarteDaneZestawienieUn?format=json"
DATA_DIR = "/app/data"
DATA_FILE = os.path.join(DATA_DIR, "unesco_data.json")
METADATA_FILE = os.path.join(DATA_DIR, "metadata.json")

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/unesco':
            self.handle_unesco_api()
        else:
            # Serve static files
            super().do_GET()

    def handle_unesco_api(self):
        """Handle requests to the UNESCO API - serve from local cache if available"""
        try:
            # Try to load local data first
            json_data = self.load_local_data()
            
            if json_data:
                print("📂 Serving data from local cache")
                self.send_unesco_response(json_data)
                return
            
            # Fallback to API if no local data
            print("🌐 No local data found, fetching from API...")
            json_data = self.fetch_from_api()
            self.send_unesco_response(json_data)
            
        except Exception as e:
            self.send_error_response(f"Error serving UNESCO data: {e}")

    def load_local_data(self):
        """Load data from local cache"""
        try:
            if os.path.exists(DATA_FILE):
                # Check if data is recent (less than 25 hours old)
                file_age = datetime.now().timestamp() - os.path.getmtime(DATA_FILE)
                hours_old = file_age / 3600
                
                with open(DATA_FILE, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Load metadata if available
                metadata_info = ""
                if os.path.exists(METADATA_FILE):
                    try:
                        with open(METADATA_FILE, 'r', encoding='utf-8') as f:
                            metadata = json.load(f)
                        last_updated = metadata.get('last_updated', 'unknown')
                        record_count = metadata.get('record_count', 'unknown')
                        metadata_info = f" (updated: {last_updated}, records: {record_count})"
                    except:
                        pass
                
                print(f"📊 Loaded local data: {hours_old:.1f}h old{metadata_info}")
                return data
                
        except Exception as e:
            print(f"⚠️ Error loading local data: {e}")
        
        return None

    def fetch_from_api(self):
        """Fetch data from the UNESCO API as fallback"""
        print(f"🔄 Fetching data from: {UNESCO_API_URL}")
        
        # Create request with headers
        request = urllib.request.Request(UNESCO_API_URL)
        request.add_header('User-Agent', 'UNESCO-Heritage-Map/1.0')
        request.add_header('Accept', 'application/json')
        
        # Fetch data
        with urllib.request.urlopen(request, timeout=30) as response:
            data = response.read().decode('utf-8')
            
        # Parse and validate JSON
        json_data = json.loads(data)
        
        # Try to save to cache for future use
        try:
            self.save_to_cache(json_data)
        except Exception as e:
            print(f"⚠️ Warning: Could not save to cache: {e}")
        
        print("✅ Successfully fetched data from API")
        return json_data

    def save_to_cache(self, data):
        """Save data to local cache"""
        # Ensure directory exists
        os.makedirs(DATA_DIR, exist_ok=True)
        
        # Save data
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        # Save metadata
        metadata = {
            "last_updated": datetime.now().isoformat(),
            "record_count": len(data.get('data', [])),
            "source": "api_fallback",
            "version": "1.0"
        }
        
        with open(METADATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
        
        print(f"💾 Data cached locally")

    def send_unesco_response(self, json_data):
        """Send UNESCO data response"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Add cache headers
        self.send_header('Cache-Control', 'public, max-age=3600')  # 1 hour cache
        
        self.end_headers()
        
        # Send data as JSON
        self.wfile.write(json.dumps(json_data, ensure_ascii=False).encode('utf-8'))

    def send_error_response(self, message):
        """Send error response"""
        print(f"❌ Error: {message}")
        self.send_response(500)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        error_data = {
            "error": "Nie udało się pobrać danych UNESCO",
            "message": message
        }
        self.wfile.write(json.dumps(error_data).encode('utf-8'))

def check_port_available(port):
    """Check if port is available"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.bind(('', port))
            return True
    except socket.error:
        return False

def main():
    # Get port from command line or use default
    port = 8033
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ Invalid port number")
            sys.exit(1)
    
    # Check if port is available
    if not check_port_available(port):
        print(f"❌ Port {port} is already in use. Try a different port.")
        print(f"💡 Try running: python3 server.py {port + 1}")
        sys.exit(1)
    
    # Create and start server
    try:
        with socketserver.TCPServer(("", port), ProxyHandler) as httpd:
            print(f"🚀 Server started at http://localhost:{port}")
            print(f"📍 API proxy available at: http://localhost:{port}/api/unesco")
            print(f"🗺️  Main app available at: http://localhost:{port}/")
            print("Press Ctrl+C to stop the server")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 