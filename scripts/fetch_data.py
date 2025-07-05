#!/usr/bin/env python3
"""
UNESCO Data Fetcher
Fetches data from the Polish National Heritage Institute API and saves it locally.
This script is run daily by cron to keep data up to date.
"""

import urllib.request
import urllib.error
import json
import os
import sys
from datetime import datetime

# Configuration
UNESCO_API_URL = "https://api.zabytek.gov.pl/nidrestapi/api/data/geoportal/otwarteDaneZestawienieUn?format=json"
DATA_DIR = "/app/data"
DATA_FILE = os.path.join(DATA_DIR, "unesco_data.json")
METADATA_FILE = os.path.join(DATA_DIR, "metadata.json")

def ensure_data_directory():
    """Ensure the data directory exists"""
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR, exist_ok=True)
        print(f"✅ Created data directory: {DATA_DIR}")

def fetch_unesco_data():
    """Fetch data from the UNESCO API"""
    try:
        print(f"🔄 Fetching data from: {UNESCO_API_URL}")
        
        # Create request with headers
        request = urllib.request.Request(UNESCO_API_URL)
        request.add_header('User-Agent', 'UNESCO-Heritage-Map-Fetcher/1.0')
        request.add_header('Accept', 'application/json')
        
        # Fetch data
        with urllib.request.urlopen(request, timeout=60) as response:
            data = response.read().decode('utf-8')
            
        # Parse JSON
        json_data = json.loads(data)
        
        # Validate data structure
        if not json_data.get('data') or not isinstance(json_data['data'], list):
            raise ValueError("Invalid data structure received from API")
            
        print(f"✅ Successfully fetched {len(json_data['data'])} heritage sites")
        return json_data
        
    except urllib.error.URLError as e:
        print(f"❌ Network error: {e.reason}")
        raise
    except json.JSONDecodeError as e:
        print(f"❌ JSON parsing error: {e}")
        raise
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        raise

def save_data(data):
    """Save data to local file"""
    try:
        # Save main data
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        # Save metadata
        metadata = {
            "last_updated": datetime.now().isoformat(),
            "record_count": len(data.get('data', [])),
            "source": UNESCO_API_URL,
            "version": "1.0"
        }
        
        with open(METADATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
            
        print(f"✅ Data saved to {DATA_FILE}")
        print(f"✅ Metadata saved to {METADATA_FILE}")
        print(f"📊 Total records: {metadata['record_count']}")
        
    except Exception as e:
        print(f"❌ Error saving data: {e}")
        raise

def load_existing_data():
    """Load existing data for comparison"""
    try:
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f"⚠️ Warning: Could not load existing data: {e}")
    return None

def data_has_changed(old_data, new_data):
    """Check if data has changed significantly"""
    if not old_data:
        return True
        
    old_count = len(old_data.get('data', []))
    new_count = len(new_data.get('data', []))
    
    if old_count != new_count:
        print(f"📈 Record count changed: {old_count} → {new_count}")
        return True
    
    # Could add more sophisticated comparison here
    return False

def main():
    """Main function"""
    print(f"🚀 UNESCO Data Fetcher started at {datetime.now().isoformat()}")
    
    try:
        # Ensure directory exists
        ensure_data_directory()
        
        # Load existing data
        existing_data = load_existing_data()
        
        # Fetch new data
        new_data = fetch_unesco_data()
        
        # Check if data has changed
        if data_has_changed(existing_data, new_data):
            save_data(new_data)
            print("✅ Data update completed successfully")
        else:
            print("ℹ️ No significant changes detected, keeping existing data")
            
        # Update metadata anyway to record the check
        if os.path.exists(METADATA_FILE):
            try:
                with open(METADATA_FILE, 'r', encoding='utf-8') as f:
                    metadata = json.load(f)
                metadata["last_checked"] = datetime.now().isoformat()
                with open(METADATA_FILE, 'w', encoding='utf-8') as f:
                    json.dump(metadata, f, ensure_ascii=False, indent=2)
            except Exception as e:
                print(f"⚠️ Warning: Could not update metadata: {e}")
        
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        sys.exit(1)
    
    print("🏁 UNESCO Data Fetcher completed")

if __name__ == "__main__":
    main() 