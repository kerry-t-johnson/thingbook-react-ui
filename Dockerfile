# ============================================================================
FROM node:15.5-buster AS builder
# ----------------------------------------------------------------------------

WORKDIR /opt/thingbook-react-ui

# Install build rerequisites
COPY ["package*.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent

# Build
COPY . .
RUN npm run build



# ============================================================================
FROM nginx:1.19 AS production
# ----------------------------------------------------------------------------

COPY --from=builder /opt/thingbook-react-ui/build      /usr/share/nginx/html

