# Docker Deployment Guide

This guide covers production deployment using Docker for your Next.js portfolio application.

## 🐳 Production Dockerfile

The Dockerfile follows industry best practices:

- **Multi-stage builds** for optimized image size
- **Non-root user** for enhanced security
- **Health checks** for container monitoring
- **Proper dependency management** with lock files
- **Environment-specific optimizations**

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and run the application
docker-compose up -d

# View logs
docker-compose logs -f portfolio

# Stop the application
docker-compose down
```

### Using Docker CLI

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -d -p 3000:3000 --name portfolio portfolio

# View logs
docker logs -f portfolio
```

## 📊 Image Optimization

The multi-stage build process:

1. **deps stage**: Installs dependencies using the appropriate package manager
2. **builder stage**: Builds the application with Next.js
3. **runner stage**: Creates the final production image with only necessary files

### Image Size Reduction

- Uses Alpine Linux for minimal base image
- Only copies built artifacts to the final stage
- Excludes development dependencies and build tools
- Implements proper `.dockerignore` for unnecessary files

## 🔒 Security Features

- **Non-root user**: Runs as `nextjs` user (UID 1001)
- **Minimal attack surface**: Only essential files in final image
- **No build tools**: Development dependencies excluded from production
- **Read-only filesystem**: Consider using `--read-only` flag

## 🏥 Health Monitoring

The container includes health checks that monitor:
- Application availability on port 3000
- Response status from `/api/health` endpoint
- Automatic restart on health check failures

## 🔧 Configuration

### Environment Variables

```bash
# Set production environment
NODE_ENV=production

# Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

### Custom Port

To run on a different port:

```bash
docker run -d -p 8080:3000 portfolio
```

## 📈 Performance Tuning

### Memory Optimization

```bash
# Set memory limits
docker run -d -p 3000:3000 --memory="512m" portfolio
```

### CPU Limits

```bash
# Limit CPU usage
docker run -d -p 3000:3000 --cpus="1.0" portfolio
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy
on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build Docker image
      run: docker build -t portfolio:${{ github.sha }} .
    - name: Push to registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push portfolio:${{ github.sha }}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Check if all dependencies are properly installed
2. **Port conflicts**: Ensure port 3000 is available
3. **Health check failures**: Verify the `/api/health` endpoint is accessible

### Debug Mode

```bash
# Run with debug logs
docker run -d -p 3000:3000 -e DEBUG=* portfolio
```

### Shell Access

```bash
# Access container shell
docker exec -it portfolio sh
```

## 📚 Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Node.js Docker Guidelines](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)