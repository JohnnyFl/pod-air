# Stage 1: Build the Go application
FROM golang:alpine AS builder

# Install git for go mod tidy/download
RUN apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the uploader service source code into the container
COPY ./internal/uploader /app/internal/uploader
# Copy the uploader command source code
COPY ./cmd/uploader /app/cmd/uploader
# Copy the tools directory
COPY ./tools /app/tools

COPY ./pkg /app/pkg

# Copy go mod and sum files
# These are now relative to the backend directory (build context)
COPY go.mod /app/go.mod

# Tidy dependencies to ensure go.mod and go.sum are accurate
RUN go mod tidy

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Build the Go app
# Build for the specific service directory (uploader)
# Path is now relative to the WORKDIR /app, but source was copied into internal/uploader
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags='-w -s' -o  /app/uploader ./cmd/uploader

# Stage 2: Setup the final image
FROM alpine:latest

WORKDIR /app/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/uploader /app/uploader

# Service account key is mounted via docker-compose volume

# Expose port 8080 (adjust if your service uses a different port)
EXPOSE 8080

# Command to run the executable
CMD ["./uploader"]