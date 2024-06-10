#!/bin/bash

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log "Starting the React build process..."

if cd Sepio-App/front-end; then
    log "Changed directory to 'front-end'."
else
    log "Error: 'front-end' directory does not exist."
    exit 1
fi

if npm run build; then
    log "React build completed successfully."
else
    log "Error: React build failed."
    exit 1
fi

if cd ../backend; then
    log "Changed directory back to project root."
else
    log "Error: Could not change directory back to project root."
    exit 1
fi

log "Starting the Node.js server..."

if node server.js; then
    log "Node.js server started successfully."
else
    log "Error: Failed to start the Node.js server."
    exit 1
fi
