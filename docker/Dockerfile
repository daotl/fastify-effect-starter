ARG NODEJS_VERSION=20
ARG BUILD_ENV=prod

# Install only production dependencies
FROM node:${NODEJS_VERSION}-bookworm AS dependencies

# LABEL maintainer="nex@example.com"
# LABEL io.daot.version="20231107"
# LABEL io.daot.version.isproduction="true"
# LABEL io.daot.release-date="2023-11-07"


# pnpm: https://pnpm.io/next/docker#example-2-build-multiple-docker-images-in-a-monorepo
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


COPY --link package.json pnpm-lock.yaml /app/
COPY --link patches /app/patches
WORKDIR /app
RUN npm set progress false && npm set depth 0 \
  && pnpm install --only=production


# Build stage, install all dependencies
# Also as the base for mode ENVIRONMENT=dev
FROM dependencies AS build

RUN pnpm install

COPY --link . /app
RUN pnpm build


# The base for mode ENVIRONMENT=prod, only preserve production dependencies
FROM node:${NODEJS_VERSION}-alpine as prod
COPY --from=build --link /app/package.json /app/
COPY --from=build --link /app/dist /app/dist
COPY --from=dependencies --link /app/node_modules /app/node_modules


# The base for mode ENVIRONMENT=dev, install dev tools
FROM build as dev
RUN apt update \
  && apt install -y \
  lsof \
  telnet \
  tmux \
  vim \
  && rm -rf /var/lib/apt/lists/*


# Run stage
FROM ${BUILD_ENV}

WORKDIR /app
ENTRYPOINT 3000
ENTRYPOINT ["node", "./dist/main.js"]
