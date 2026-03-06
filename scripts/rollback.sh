#!/bin/bash
set -e

DOCKER_USERNAME=${DOCKER_USERNAME:-myuser}
APP_DIR=/volume1/docker/todo-app

echo "Rolling back Todo App..."

cd $APP_DIR

PREV_SERVER=$(docker images --format "{{.Repository}}:{{.Tag}}" ${DOCKER_USERNAME}/todo-server | grep -v latest | head -1)
PREV_CLIENT=$(docker images --format "{{.Repository}}:{{.Tag}}" ${DOCKER_USERNAME}/todo-client | grep -v latest | head -1)

if [ -z "$PREV_SERVER" ] || [ -z "$PREV_CLIENT" ]; then
  echo "No previous images found for rollback!"
  exit 1
fi

echo "Rolling back to: $PREV_SERVER and $PREV_CLIENT"

sed -i "s|${DOCKER_USERNAME}/todo-server:latest|${PREV_SERVER}|g" docker-compose.yml
sed -i "s|${DOCKER_USERNAME}/todo-client:latest|${PREV_CLIENT}|g" docker-compose.yml

docker-compose up -d

echo "Rollback complete!"
