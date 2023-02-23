#!/bin/sh
mkdir -p ~/dev/docker-volumes/fastify-effect-strater/postgres
docker run --name fastify-effect-strater-postgres -d \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=fastify-effect-strater \
  -p 5432:5432 \
  -v ~/dev/docker-volumes/fastify-effect-strater/postgres:/var/lib/postgresql/data \
  postgres:15beta1
