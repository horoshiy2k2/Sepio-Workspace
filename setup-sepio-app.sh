#!/bin/bash

log() {
  echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" | tee -a setup.log
}

check_error() {
  if [ $? -ne 0 ]; then
    log "Error: $1"
    exit 1
  fi
}

check_git() {
  if command -v git >/dev/null 2>&1; then
    log "Git is already installed. Version: $(git --version)"
  else
    log "Git is not installed. Installing Git..."
    sudo apt-get update
    check_error "Failed to update package list."

    sudo apt-get install -y git
    check_error "Failed to install Git."
  fi
}

check_node() {
  if command -v node >/dev/null 2>&1; then
    log "Node.js is already installed. Version: $(node -v)"
    log "npm version: $(npm -v)"
  else
    log "Node.js is not installed. Installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    check_error "Failed to add NodeSource APT repository."

    sudo apt-get install -y nodejs
    check_error "Failed to install Node.js and npm."
  fi
}

install_dependencies() {
  log "Installing dependencies in $1..."
  cd "$1" || { log "Directory $1 not found."; exit 1; }
  npm install
  check_error "Failed to install dependencies in $1."
  cd - >/dev/null
}

log "Starting setup script..."

check_git

if [ ! -d "Sepio-App" ]; then
  log "Cloning repository..."
  git clone https://github.com/Floreno12/Sepio-Application.git Sepio-App
  check_error "Failed to clone repository."
else
  log "Directory Sepio-App already exists. Skipping clone step."
fi

if [ ! -d "Sepio-App" ]; then
  log "Critical Error: Directory Sepio-App does not exist."
  exit 1
fi

check_node

install_dependencies "Sepio-App/backend"

install_dependencies "Sepio-App/front-end"

log "Running React build command..."
cd Sepio-App/front-end || { log "Directory Sepio-App/front-end not found."; exit 1; }
npm run build
check_error "Failed to execute React build command."

log "Setup script executed successfully."

exit 0
