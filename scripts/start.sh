#!/bin/bash
# Start script for UNESCO Heritage Map Docker container
# - Starts cron daemon
# - Fetches initial data if not present
# - Starts the main web server

set -e

echo "🚀 Starting UNESCO Heritage Map Docker container..."

# Start cron daemon in background
echo "⏰ Starting cron daemon..."
service cron start

# Check if we have initial data, if not fetch it
if [ ! -f "/app/data/unesco_data.json" ]; then
    echo "📥 No initial data found, fetching from API..."
    python3 /app/scripts/fetch_data.py
else
    echo "📂 Initial data found, checking age..."
    # Check if data is older than 24 hours
    if [ "$(find /app/data/unesco_data.json -mtime +1)" ]; then
        echo "📅 Data is older than 24 hours, updating..."
        python3 /app/scripts/fetch_data.py
    else
        echo "✅ Data is fresh, using cached version"
    fi
fi

# Ensure proper permissions
chown -R appuser:appuser /app/data /app/logs

echo "🌐 Starting web server on port 8033..."

# Switch to appuser and start the main application
exec su appuser -c "python3 /app/server.py 8033" 