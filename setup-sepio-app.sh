#!/bin/bash

install_packages() {
    local package=$1
    if ! command -v $package &> /dev/null; then
        log "$package is not installed. Installing $package..."
        sudo apt-get update
        sudo apt-get install -y $package
    else
        log "$package is already installed."
    fi
}

schedule_updater() {
    local script_path=$(realpath "$SCRIPT_DIR/Sepio_Updater.sh")
    local cron_job="0 3 * * * $script_path >> /var/log/sepio_updater.log 2>&1"
    (crontab -l ; echo "$cron_job") | crontab -
    log "Scheduled Sepio_Updater.sh to run daily at 3:00 AM."
}

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

install_packages figlet
install_packages lolcat
install_packages git
install_packages jq

log "Granting privilages for Updater and scheduling autoupdates..."
schedule_updater
chmod +x Sepio_Updater.sh
sudo touch /var/log/sepio_updater.log
sudo chown $USER:$USER /var/log/sepio_updater.log

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
    git clone https://github.com/Floreno12/Sepio-Workspace "$SEPIO_APP_DIR"
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

log "Installing MySQL server..."
sudo apt-get update
sudo apt-get install -y mysql-server

log "Securing MySQL installation..."
sudo expect -c "
spawn mysql_secure_installation
expect \"Enter current password for root (enter for none):\"
send \"\r\"
expect \"Set root password?\"
send \"n\r\"
expect \"Remove anonymous users?\"
send \"y\r\"
expect \"Disallow root login remotely?\"
send \"y\r\"
expect \"Remove test database and access to it?\"
send \"y\r\"
expect \"Reload privilege tables now?\"
send \"y\r\"
expect eof
"

log "Starting MySQL service..."
sudo systemctl start mysql

log "Enabling MySQL service to start on boot..."
sudo systemctl enable --now mysql

log "Checking MySQL status..."
sudo systemctl status --quiet mysql

log "Checking MySQL port configuration..."
mysql_port=$(sudo ss -tln | grep ':3306 ')
if [ -n "$mysql_port" ]; then
    log "MySQL is running on port 3306."
    log "MySQL installation and setup completed."
else
    log "Error: MySQL is not running on port 3306."
    exit 1
fi

log "Installing Redis server..."
sudo apt-get update
sudo apt-get install -y redis-server

log "Starting Redis service..."
sudo systemctl start redis-server

log "Enabling Redis service to start on boot..."
sudo systemctl enable redis-server

log "Checking Redis status... Please press Ctrl + C!"
sudo systemctl status redis-server

log "Checking Redis port configuration..."
redis_port=$(sudo ss -tln | grep ':6379 ')
if [ -n "$redis_port" ]; then
    log "Redis is running on port 6379."
    log "Redis installation and setup completed."
else
    log "Error: Redis is not running on port 6379."
    exit 1
fi

log "Creating systemd service for React build..."
sudo bash -c "cat <<EOL > /etc/systemd/system/react-build.service
[Unit]
Description=React Build Service
After=network.target

[Service]
Type=oneshot
ExecStart=/bin/bash -c 'cd $SEPIO_APP_DIR/front-end && npm run build'
User=$USER
Environment=PATH=$PATH:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=$SEPIO_APP_DIR/front-end

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
ExecStart=/bin/bash -c 'cd $SEPIO_APP_DIR/backend && node server.js'
User=$USER
Environment=PATH=$PATH:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=$SEPIO_APP_DIR/backend

[Install]
WantedBy=multi-user.target
EOL"

log "Reloading systemd daemon to pick up the new service files..."
sudo systemctl daemon-reload

log "Enabling react-build.service to start on boot..."
sudo systemctl enable react-build.service

log "Starting react-build.service... Please be patient, don't break up the process..."
sudo systemctl start react-build.service

log "Enabling node-server.service to start on boot..."
sudo systemctl enable node-server.service

log "Starting node-server.service..."
sudo systemctl start node-server.service


log "Setup script executed successfully."

