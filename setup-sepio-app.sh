#!/bin/bash

if ! command -v figlet &> /dev/null; then
    echo "figlet is not installed. Installing figlet..."
    sudo apt-get update
    sudo apt-get install -y figlet
fi

if ! command &> /dev/null lolcat; then
    echo "lolcat is not installed. Installing lolcat..."
    sudo apt-get update
    sudo apt-get install -y lolcat
fi

show_header() {
    echo "====================================" | lolcat
    figlet -c Sepio Installer | lolcat
    echo "====================================" | lolcat
}

show_header

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | lolcat
}

log "Starting setup script..."

SCRIPT_DIR=$(dirname "$(realpath "$0")")
SEPIO_APP_DIR="$SCRIPT_DIR/Sepio-App"

if ! command -v git &> /dev/null; then
    log "Git is not installed. Installing Git..."
    sudo apt-get update
    sudo apt-get install -y git
else
    git_version=$(git --version)
    log "Git is already installed. Version: $git_version"
fi

if [ ! -d "$SEPIO_APP_DIR" ]; then
    log "Cloning the Sepio-App repository..."
    git clone https://github.com/Floreno12/Sepio-Application.git "$SEPIO_APP_DIR"
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

backend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/backend/package.json")

if [ "$backend_node_version" = "null" ]; then
    log "No specific Node.js version specified in $SEPIO_APP_DIR/backend/package.json. Using default version."
    backend_node_version="16"
else
    log "Required Node.js version for backend: $backend_node_version"
fi

frontend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/front-end/package.json")

if [ "$frontend_node_version" = "null" ]; then
    log "No specific Node.js version specified in $SEPIO_APP_DIR/front-end/package.json. Using default version."
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

cd "$SEPIO_APP_DIR/backend" || { log "Error: Directory $SEPIO_APP_DIR/backend does not exist."; exit 1; }
log "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    log "Error: Failed to install backend dependencies."
    exit 1
fi

log "Backend dependencies installed successfully."

cd "$SEPIO_APP_DIR/front-end" || { log "Error: Directory $SEPIO_APP_DIR/front-end does not exist."; exit 1; }

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

log "Creating systemd service for React build..."
sudo bash -c "cat <<EOL > /etc/systemd/system/react-build.service
[Unit]
Description=React Build Service
After=network.target

[Service]
Type=oneshot
ExecStart=/bin/bash -c 'cd \$SEPIO_APP_DIR/front-end && npm run build'
User=\$USER
Environment=PATH=\$PATH:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=\$SEPIO_APP_DIR/front-end

[Install]
WantedBy=multi-user.target
EOL"

log "Creating systemd service for server.js..."
sudo bash -c "cat <<EOL > /etc/systemd/system/node-server.service
[Unit]
Description=Node.js Server
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash -c 'cd \$SEPIO_APP_DIR/backend && node server.js'
User=\$USER
Environment=PATH=\$PATH:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=\$SEPIO_APP_DIR/backend

[Install]
WantedBy=multi-user.target
EOL"

log "Reloading systemd daemon to pick up the new service files..."
sudo systemctl daemon-reload

log "Enabling react-build.service to start on boot..."
sudo systemctl enable react-build.service

log "Starting react-build.service..."
sudo systemctl start react-build.service

log "Enabling node-server.service to start on boot..."
sudo systemctl enable node-server.service

log "Starting node-server.service..."
sudo systemctl start node-server.service


log "Setup script executed successfully."

