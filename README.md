# Track Always

## Docker Deployment Instructions

This README explains how to deploy the Track Always application using Docker.

### Prerequisites

Before you begin, make sure you have the following installed on your system:

1. Docker - [Download and Install Docker](https://docs.docker.com/get-docker/)
2. Git (optional, for cloning the repository)

### Deployment Steps

#### 1. Clone the Repository (if you haven't already)

```bash
git clone <repository-url>
cd trackalways-new-main
```

#### 2. Build the Docker Image

From the root directory of the project (where the Dockerfile is located), run:

```bash
docker build -t trackalways:latest .
```

This command builds a Docker image named "trackalways" with the tag "latest" using the Dockerfile in the current directory.

#### 3. Run the Docker Container

After successfully building the image, run the container with:

```bash
docker run -d -p 30089:30089 --name trackalways-app trackalways:latest
```

This command:
- `-d`: Runs the container in detached mode (in the background)
- `-p 30089:30089`: Maps port 30089 from the container to port 30089 on your host machine
- `--name trackalways-app`: Names the container "trackalways-app"
- `trackalways:latest`: Specifies the image to use

#### 4. Access the Application

Once the container is running, you can access the application by navigating to:

```
http://localhost:30089
```

Or if you're deploying to a server, replace "localhost" with your server's IP address or domain name.

### Managing the Docker Container

#### Stop the Container

```bash
docker stop trackalways-app
```

#### Start the Container (if it's stopped)

```bash
docker start trackalways-app
```

#### Remove the Container

```bash
docker rm trackalways-app
```

#### View Container Logs

```bash
docker logs trackalways-app
```

### Updating the Application

To update the application with a new version:

1. Build a new Docker image:
   ```bash
   docker build -t trackalways:latest .
   ```

2. Stop and remove the current container:
   ```bash
   docker stop trackalways-app
   docker rm trackalways-app
   ```

3. Run a new container with the updated image:
   ```bash
   docker run -d -p 30089:30089 --name trackalways-app trackalways:latest
   ```

### Docker Compose (Alternative)

For a more maintainable setup, you can use Docker Compose. Create a `docker-compose.yml` file with:

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "30089:30089"
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

To stop:

```bash
docker-compose down
```
