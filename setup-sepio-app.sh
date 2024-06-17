#!/bin/bash
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | lolcat
}

install_packages() {
    local package=$1
    if ! command -v "$package" &> /dev/null; then
        log "$package is not installed. Installing $package..."
        sudo apt-get update && sudo apt-get install -y "$package"
        if [ $? -ne 0 ]; then
            log "Error: Failed to install $package."
            exit 1
        fi
    else
        log "$package is already installed."
    fi
}

schedule_updater() {
    local script_path=$(realpath "$SCRIPT_DIR/Sepio_Updater.sh")
    local cron_job="0 3 * * * $script_path >> /var/log/sepio_updater.log 2>&1"
    (crontab -l 2>/dev/null; echo "$cron_job") | crontab -
    log "Scheduled Sepio_Updater.sh to run daily at 3:00 AM."
}

get_required_node_version() {
    local package_json_path=$1
    local required_node_version=$(jq -r '.engines.node' "$package_json_path")
    echo "${required_node_version:-16}"  # Default to Node.js version 16 if not specified
}

install_node_version() {
    local node_version=$1
    if ! command -v nvm &> /dev/null; then
        log "nvm (Node Version Manager) is not installed. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
    nvm install "$node_version"
    if [ $? -ne 0 ]; then
        log "Error: Failed to install Node.js version $node_version using nvm."
        exit 1
    fi
    nvm use "$node_version"
    log "Using Node.js version $node_version."
}

clone_or_update_repository() {
    local repository_url=$1
    local target_directory=$2
    if [ ! -d "$target_directory" ]; then
        log "Cloning $repository_url to $target_directory..."
        git clone "$repository_url" "$target_directory"
        if [ $? -ne 0 ]; then
            log "Error: Failed to clone the repository."
            exit 1
        fi
    else
        log "Directory $target_directory already exists. Updating repository..."
        cd "$target_directory" || { log "Error: Directory $target_directory not found."; exit 1; }
        git pull origin main
        if [ $? -ne 0 ]; then
            log "Error: Failed to update the repository."
            exit 1
        fi
    fi
}

show_header() {
    echo "====================================" | lolcat
    figlet -c Sepio Installer | lolcat
    echo "====================================" | lolcat
}

# Main script execution starts here

if [ "$(id -u)" != "0" ]; then
    log "Error: This script must be run as root."
    exit 1
fi

show_header

log "Starting setup script..."

install_packages figlet
install_packages lolcat
install_packages git
install_packages jq

SCRIPT_DIR=$(dirname "$(realpath "$0")")
SEPIO_APP_DIR="$SCRIPT_DIR/Sepio-App"

log "Checking for required Node.js versions from package.json files..."
backend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/backend/package.json")
log "Required Node.js version for backend: $backend_node_version"
install_node_version "$backend_node_version"

frontend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/front-end/package.json")
log "Required Node.js version for frontend: $frontend_node_version"
install_node_version "$frontend_node_version"

clone_or_update_repository "https://github.com/Floreno12/Sepio-Workspace" "$SEPIO_APP_DIR"

log "Installing latest eslint-webpack-plugin..."
npm install eslint-webpack-plugin@latest --save-dev

log "Granting privilages for Updater and scheduling autoupdates..."
schedule_updater
cd $SCRIPT_DIR
chmod +x Sepio_Updater.sh
sudo touch /var/log/sepio_updater.log
sudo chown $USER:$USER /var/log/sepio_updater.log

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

clear
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

