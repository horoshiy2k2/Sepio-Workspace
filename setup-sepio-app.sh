#!/bin/bash

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

show_header() {
    echo "====================================" | lolcat
    figlet -c Sepio Installer | lolcat
    echo "====================================" | lolcat
}

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | lolcat
}

show_header

log "Starting setup script..."

if ! command -v git &> /dev/null; then
    log "Git is not installed. Installing Git..."
    sudo apt-get update
    sudo apt-get install -y git
else
    git_version=$(git --version)
    log "Git is already installed. Version: $git_version"
fi

if [ ! -d "Sepio-App" ]; then
    log "Cloning the Sepio-App repository..."
    git clone https://github.com/Floreno12/Sepio-Application.git Sepio-App
    if [ $? -ne 0 ]; then
        log "Error: Failed to clone the repository."
        exit 1
    fi
else
    log "Directory Sepio-App already exists. Skipping clone step."
fi

if command -v node &> /dev/null; then
    node_version=$(node -v)
    log "Node.js is already installed. Version: $node_version"
    if [[ $node_version < v16 ]]; then
        log "Node.js version is less than 16. Installing a newer version..."
        if ! command -v nvm &> /dev/null; then
            log "nvm (Node Version Manager) is not installed. Installing nvm..."
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        fi
        log "Installing Node.js version 16 using nvm..."
        nvm install 16
        if [ $? -ne 0 ]; then
            log "Error: Failed to install Node.js version 16 using nvm."
            exit 1
        fi
        nvm use 16
    fi
else
    log "Node.js is not installed. Installing Node.js version 16..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
    if [ $? -ne 0 ]; then
        log "Error: Failed to install Node.js version 16."
        exit 1
    fi
fi

log "Node.js and npm installation completed successfully."

cd Sepio-App/backend || { log "Error: Directory Sepio-App/backend does not exist."; exit 1; }
log "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    log "Error: Failed to install backend dependencies."
    exit 1
fi

log "Backend dependencies installed successfully."

cd ../front-end || { log "Error: Directory Sepio-App/front-end does not exist."; exit 1; }
log "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    log "Error: Failed to install frontend dependencies."
    exit 1
fi

log "Frontend dependencies installed successfully."

log "Running React build command..."
npm run build
if [ $? -ne 0 ]; then
    log "Error: Failed to execute React build command."
    exit 1
fi

log "React build completed successfully."
log "Setup script executed successfully."
