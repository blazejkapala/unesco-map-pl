# Use Python 3.11 slim image
FROM python:3.11-slim

# Install cron and other utilities
RUN apt-get update && apt-get install -y \
    cron \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy application files
COPY index.html .
COPY server.py .
COPY scripts/ ./scripts/

# Create data directory and make scripts executable
RUN mkdir -p /app/data /app/logs && \
    chmod +x /app/scripts/fetch_data.py /app/scripts/start.sh && \
    chown -R appuser:appuser /app

# Set up cron job to run daily at 2:00 AM
RUN echo "0 2 * * * appuser /usr/bin/python3 /app/scripts/fetch_data.py >> /app/logs/fetch_data.log 2>&1" > /etc/cron.d/unesco-fetch && \
    chmod 0644 /etc/cron.d/unesco-fetch && \
    crontab /etc/cron.d/unesco-fetch

# Note: We start as root to run cron, then switch to appuser in start script

# Expose port
EXPOSE 8033

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8033/api/unesco')"

# Run the start script
CMD ["/app/scripts/start.sh"] 