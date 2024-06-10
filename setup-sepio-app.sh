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
    echo "          /\        " | lolcat
    echo "         /  \       " | lolcat
    echo "        /____\      " | lolcat
    echo "        |    |      " | lolcat
    echo "        |____|      " | lolcat
    echo "        |    |      " | lolcat
    echo "        |____|      " | lolcat
    echo "       /|    |\     " | lolcat
    echo "      / |    | \    " | lolcat
    echo "     /  |____|  \   " | lolcat
    echo "         /\/\       " | lolcat
    echo "        /    \      " | lolcat
    echo "       /      \     " | lolcat
    echo "====================================" | lolcat
}

show_header


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

log "Checking for required Node.js versions from package.json files..."

get_required_node_version() {
    local package_json_path=$1
    required_node_version=$(jq -r '.engines.node' "$package_json_path")
    echo $required_node_version
}

if ! command -v jq &> /dev/null; then
    log "jq is not installed. Installing jq..."
    sudo apt-get update
    sudo apt-get install -y jq
fi

backend_node_version=$(get_required_node_version "Sepio-App/backend/package.json")

if [ "$backend_node_version" = "null" ]; then
    log "No specific Node.js version specified in Sepio-App/backend/package.json. Using default version."
    backend_node_version="16"
else
    log "Required Node.js version for backend: $backend_node_version"
fi

frontend_node_version=$(get_required_node_version "Sepio-App/front-end/package.json")

if [ "$frontend_node_version" = "null" ]; then
    log "No specific Node.js version specified in Sepio-App/front-end/package.json. Using default version."
    frontend_node_version="16"
else
    log "Required Node.js version for frontend: $frontend_node_version"
fi

if ! command -v nvm &> /dev/null; then
    log "nvm (Node Version Manager) is not installed. Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

nvm install $backend_node_version
if [ $? -ne 0 ]; then
    log "Error: Failed to install Node.js version $backend_node_version using nvm."
    exit 1
fi

nvm use $backend_node_version

log "Using Node.js version $backend_node_version for backend"
node_version=$(node -v)
log "Node.js version in use for backend: $node_version"

log "Node.js and npm installation for backend completed successfully."

cd Sepio-App/backend || { log "Error: Directory Sepio-App/backend does not exist."; exit 1; }
log "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    log "Error: Failed to install backend dependencies."
    exit 1
fi

log "Backend dependencies installed successfully."

cd ../front-end || { log "Error: Directory Sepio-App/front-end does not exist."; exit 1; }

nvm install $frontend_node_version
if [ $? -ne 0 ]; then
    log "Error: Failed to install Node.js version $frontend_node_version using nvm."
    exit 1
fi

nvm use $frontend_node_version

log "Using Node.js version $frontend_node_version for frontend"
node_version=$(node -v)
log "Node.js version in use for frontend: $node_version"

log "Node.js and npm installation for frontend completed successfully."

log "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    log "Error: Failed to install frontend dependencies."
    exit 1
fi

log "Clearing npm cache..."
npm cache clean --force

log "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

log "Reinstalling dependencies..."
npm install

log "Updating dependencies..."
npm update

log "Installing latest eslint-webpack-plugin..."
npm install eslint-webpack-plugin@latest --save-dev

log "Running React build command..."
npm run build
if [ $? -ne 0 ]; then
    log "Error: Failed to execute React build command."
    exit 1
fi

log "React build completed successfully."

cd ../backend || { log "Error: Directory Sepio-App/backend does not exist."; exit 1; }
log "Starting server.js..."
node server.js &
if [ $? -ne 0 ]; then
    log "Error: Failed to start server.js."
    exit 1
fi

log "server.js started successfully."
log "Setup script executed successfully."
