# demoxhexadctyl by death legion team

A powerful, secure, and intuitive web-based control panel for hosting and managing game servers, inspired by Pterodactyl.

## Features
- **Security & Isolation**: Every game server runs in its own dedicated Docker container.
- **Modern Dashboard**: Built with Laravel 11, React, and Tailwind CSS for a sleek user experience.
- **Node Agent**: Efficient node management written in Go.
- **One-Command Install**: Easy setup for any server.

## Installation

To install demoxhexadctyl on your server, run the following command:

```bash
sudo ./install.sh
```

## Components

### Panel
The main management interface located in the `panel/` directory.
- Backend: Laravel
- Frontend: React + Tailwind CSS

### Daemon
The node agent located in the `daemon/` directory.
- Language: Go
- Responsibilities: Docker container orchestration.

## License
MIT - Death Legion Team
