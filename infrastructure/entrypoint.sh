#!/bin/bash

# set -e

log_info() {
    echo
    echo -e "\e[1;36m$1\e[0m"
    echo
}

log_success() {
    echo
    echo -e "\e[1;32m$1\e[0m"
    echo
}

log_error() {
    echo
    echo -e "\e[1;33m$1\e[0m"
    echo
}

log_info "Running node entrypoint"

log_info "Cloning app..."
git clone git@github.com:raulntjj/beatflow-app.git /var/www/repository
log_success "App cloned."

cd /var/www/repository

log_info "Installing dependencies..."
npm install
log_success "Dependencies installed"

log_info "Starting application..."
npm run dev
log_success "Application started."

# Executa qualquer comando que tenha sido fornecido via docker-compose ou linha de comando
exec "$@"