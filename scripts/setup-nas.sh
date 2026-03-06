#!/bin/bash
set -e

DOCKER_USERNAME=${1:-myuser}
APP_DIR=/volume1/docker/todo-app

echo "Setting up Todo App on NAS..."

mkdir -p $APP_DIR/data
cd $APP_DIR

cat > docker-compose.yml << EOF
version: '3.8'
services:
  server:
    image: ${DOCKER_USERNAME}/todo-server:latest
    ports:
      - "5000:5000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - PORT=5000
    restart: always

  client:
    image: ${DOCKER_USERNAME}/todo-client:latest
    ports:
      - "3000:80"
    depends_on:
      - server
    restart: always

  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 30 --cleanup
    restart: always

  uptime-kuma:
    image: louislam/uptime-kuma:1
    ports:
      - "3001:3001"
    volumes:
      - uptime-kuma-data:/app/data
    restart: always

volumes:
  uptime-kuma-data:
EOF

docker pull ${DOCKER_USERNAME}/todo-server:latest
docker pull ${DOCKER_USERNAME}/todo-client:latest
docker-compose up -d

echo "Setup complete!"
echo "App: http://$(hostname -I | awk '{print $1}'):3000"
echo "Uptime Kuma: http://$(hostname -I | awk '{print $1}'):3001"
