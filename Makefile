# Define the application name
APP_NAME = withjessi-ui

# Define the Docker image name
IMAGE_NAME = $(APP_NAME):latest

# Define the necessary folders to copy
BUILD_DIR = .next
PUBLIC_DIR = public
PACKAGE_JSON = package.json
PACKAGE_LOCK_JSON = package-lock.json
NODE_MODULES = node_modules

# Create the production build
build:
	@echo "Creating production build..."
	npm install --frozen-lockfile
	npm run build
	npm install next

# Build the Docker image
docker-build: build
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
docker-run:
	@echo "Running Docker container..."
	docker run -p 3000:3000 $(IMAGE_NAME)

# Clean up the build artifacts
clean:
	@echo "Cleaning up..."
	rm -rf $(BUILD_DIR) $(NODE_MODULES)

.PHONY: build docker-build docker-run clean
