#!/bin/bash

# demoxhexadctyl by death legion team - Ultimate Installer
# Dedicated to simplicity and performance.

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function print_banner() {
    echo -e "${CYAN}"
    echo "#######################################################"
    echo "#                                                     #"
    echo "#     DEMO x HEXADCTYL by DEATH LEGION TEAM           #"
    echo "#         One-Command Server Installation             #"
    echo "#                                                     #"
    echo "#######################################################"
    echo -e "${NC}"
}

function check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}Error: Please run as root (use sudo).${NC}"
        exit 1
    fi
}

function install_dependencies() {
    echo -e "${BLUE}[1/5] Installing system dependencies...${NC}"
    # Use apt-get update only if it hasn't been updated recently
    apt-get update -qq
    apt-get install -y -qq \
        php-cli php-common php-sqlite3 php-curl php-mbstring php-xml php-zip php-bcmath php-intl \
        unzip git curl docker.io golang-go nodejs npm \
        > /dev/null

    # Install Composer if missing
    if ! command -v composer &> /dev/null; then
        echo -e "${YELLOW}Installing Composer...${NC}"
        curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer > /dev/null
    fi
}

function setup_panel() {
    echo -e "${BLUE}[2/5] Configuring the Control Panel (Laravel)...${NC}"
    cd panel
    if [ ! -f .env ]; then
        cp .env.example .env
    fi
    
    echo "  - Installing PHP dependencies..."
    composer install --no-dev --optimize-autoloader -q
    
    echo "  - Generating application key..."
    php artisan key:generate --force -q
    
    echo "  - Initializing database..."
    mkdir -p database
    touch database/database.sqlite
    php artisan migrate --force -q
    
    echo "  - Building frontend assets (React/Tailwind)..."
    npm install --legacy-peer-deps -q > /dev/null
    npm run build -q > /dev/null
    cd ..
}

function setup_daemon() {
    echo -e "${BLUE}[3/5] Building the Node Agent (Go)...${NC}"
    cd daemon
    echo "  - Compiling binary..."
    go build -o demoxhexadctyl-daemon main.go
    cd ..
}

function install_system() {
    echo -e "${BLUE}[4/5] Installing to system paths...${NC}"
    mkdir -p /etc/demoxhexadctyl
    cp daemon/demoxhexadctyl-daemon /usr/local/bin/
    chmod +x /usr/local/bin/demoxhexadctyl-daemon
}

function finalize() {
    echo -e "${BLUE}[5/5] Finalizing...${NC}"
    echo -e "${GREEN}"
    echo "-------------------------------------------------------"
    echo "   INSTALLATION COMPLETE - DEMO x HEXADCTYL"
    echo "-------------------------------------------------------"
    echo -e "${NC}"
    echo -e "${YELLOW}Panel Directory:${NC} $(pwd)/panel"
    echo -e "${YELLOW}Daemon Path:     ${NC} /usr/local/bin/demoxhexadctyl-daemon"
    echo ""
    echo -e "${CYAN}To start the Panel:${NC}"
    echo "  cd panel && php artisan serve"
    echo ""
    echo -e "${CYAN}To start the Daemon:${NC}"
    echo "  sudo demoxhexadctyl-daemon"
    echo ""
    echo -e "Thank you for using demoxhexadctyl by death legion team!"
    echo "-------------------------------------------------------"
}

# Main Execution Flow
print_banner
check_root
install_dependencies
setup_panel
setup_daemon
install_system
finalize
