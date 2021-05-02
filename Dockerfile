# ============================================================================
FROM node:15.5-buster AS builder
# ----------------------------------------------------------------------------

WORKDIR /opt/thingbook-react-ui

# Install build rerequisites
COPY ["package*.json", "*.lock*", "./"]
RUN yarn install --frozen-lockfile --silent

# Build
COPY . .
RUN yarn build



# ============================================================================
FROM nginx:1.19 AS production
# ----------------------------------------------------------------------------

COPY --from=builder /opt/thingbook-react-ui/build      /usr/share/nginx/html

