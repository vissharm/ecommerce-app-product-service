FROM node:14

WORKDIR /app

# Copy the shared library package
COPY --from=shared /shared/shared-*.tgz ./
RUN npm install shared-*.tgz

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create directory for shared lib
# RUN mkdir -p /app/node_modules/shared

# The shared library will be mounted at runtime

CMD ["npm", "run", "start"]