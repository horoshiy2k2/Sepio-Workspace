#!/bin/bash

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | lolcat
}

show_header() {
    echo "====================================" | lolcat
    figlet -c Sepio Updater | lolcat
    echo "====================================" | lolcat
}

if ! command -v figlet &> /dev/null; then
    echo "figlet is not installed. Installing figlet..."
    sudo apt-get update
    sudo apt-get install -y figlet
fi

if ! command -v lolcat &> /dev/null; then
    echo "lolcat is not installed. Installing lolcat..."
    sudo apt-get update
    sudo apt-get install -y lolcat
fi

show_header

SCRIPT_DIR=$(dirname "$(realpath "$0")")
SEPIO_APP_DIR="$SCRIPT_DIR/Sepio-App"

log "Starting update script..."

if [ ! -d "$SEPIO_APP_DIR" ]; then
    log "Error: Directory $SEPIO_APP_DIR does not exist."
    exit 1
fi

cd "$SEPIO_APP_DIR" || { log "Error: Failed to navigate to $SEPIO_APP_DIR."; exit 1; }

log "Pulling the latest changes from the repository..."
git pull
if [ $? -ne 0 ]; then
    log "Error: Failed to pull the latest changes from the repository."
    exit 1
fi

log "Successfully pulled the latest changes from the repository."

log "Restarting the backend server..."
sudo systemctl restart node-server.service
if [ $? -ne 0 ]; then
    log "Error: Failed to restart the backend server."
    exit 1
fi

log "Backend server restarted successfully."

log "Restarting the frontend build service..."
sudo systemctl restart react-build.service
if [ $? -ne 0 ]; then
    log "Error: Failed to restart the frontend build service."
    exit 1
fi

log "Frontend build service restarted successfully."

log "Update script executed successfully."
