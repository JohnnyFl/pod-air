# Stage 1: Build the Go application
FROM golang:alpine AS builder

# Install git for go mod tidy/download
RUN apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the transcriber service source code into the container
COPY ./internal/transcriber /app/internal/transcriber
# Copy the transcriber command source code
COPY ./cmd/transcriber /app/cmd/transcriber
# Copy the tools directory
COPY ./tools /app/tools
# Copy the pkg directory if it exists
COPY ./pkg /app/pkg 

# Copy go mod and sum files
COPY go.mod /app/go.mod
COPY go.sum /app/go.sum

# Tidy dependencies to ensure go.mod and go.sum are accurate
RUN go mod tidy

# Download all dependencies
RUN go mod download

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags='-w -s' -o /app/transcriber ./cmd/transcriber

# Stage 2: Setup the final image
FROM alpine:latest

# Install ffmpeg for audio processing
RUN apk add --no-cache ffmpeg

WORKDIR /app/

# Create uploads directory
RUN mkdir -p /app/uploads

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/transcriber /app/transcriber

# Command to run the executable
CMD ["./transcriber"]