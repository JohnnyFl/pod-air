# Stage 1: Build whisper.cpp server
FROM ubuntu:22.04 AS builder

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    git \
    pkg-config \
    # Add ffmpeg if you plan to use the --convert flag with the server
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app/whisper.cpp

# Copy the whisper.cpp source code from the build context
COPY ./whisper.cpp .

# Configure the build using CMake
# RUN cmake -S . -B build -DWHISPER_BUILD_SERVER=ON -DWHISPER_BUILD_EXAMPLES=ON -DWHISPER_BUILD_TESTS=OFF
RUN cmake -B build

# Build the server executable
# RUN cmake --build build --config Release -j $(nproc)
RUN cmake --build build --config Release

# Download a default model
# RUN ./models/download-ggml-model.sh medium.en
# RUN ./models/download-ggml-model.sh small.en
# RUN ./models/download-ggml-model.sh base.en
# RUN ./models/download-ggml-model.sh medium-en-q5_0
# RUN ./build/bin/quantize models/ggml-large-v3-turbo.bin models/ggml-large-v3-turbo-q8_0.bin q8_0

# Stage 2: Runtime image (smaller than the build stage)
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libstdc++6 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the compiled server executable from the builder stage
# Assuming the executable is named 'server' and located in the 'build' directory
COPY --from=builder /app/whisper.cpp/build/bin/whisper-server /app/whisper-server

# Copy the downloaded models from the builder stage
COPY --from=builder /app/whisper.cpp/models /app/models

# Expose the default server port
EXPOSE 8079

# Default command to run the server
CMD ["./whisper-server", "-m", "models/ggml-small-q8_0.bin", "-t", "8", "--host", "0.0.0.0", "--port", "8079"]