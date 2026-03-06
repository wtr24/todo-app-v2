# Todo App - Fullstack with Docker & CI/CD

React + Express todo app with automated Docker builds and NAS deployment.

## GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Your Docker Hub password or access token |
| `NAS_HOST` | IP address of your UGreen NAS |
| `NAS_USER` | SSH username (usually `admin`) |
| `NAS_SSH_KEY` | Private SSH key for NAS access |
| `NAS_PORT` | SSH port (default: 22) |

## One-Time NAS Setup

SSH into your NAS and run:

```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/scripts/setup-nas.sh | bash -s YOUR_DOCKER_USERNAME
```

Or manually:

```bash
mkdir -p /volume1/docker/todo-app
cd /volume1/docker/todo-app
# Copy docker-compose.yml contents here
docker-compose up -d
```

## Trigger Redeploy

```bash
git add .
git commit -m "update"
git push origin main
```

This triggers:
1. Build + push Docker images to Docker Hub
2. SSH into NAS → `docker-compose pull && docker-compose up -d`
3. Health check → auto-rollback if unhealthy

## Local Development

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Uptime Kuma: http://NAS_IP:3001

## Architecture

```
GitHub Push → GitHub Actions → Docker Hub → NAS (via SSH)
                                              ├── todo-client (port 3000)
                                              ├── todo-server (port 5000)
                                              ├── watchtower (auto-updates)
                                              └── uptime-kuma (port 3001)
```
