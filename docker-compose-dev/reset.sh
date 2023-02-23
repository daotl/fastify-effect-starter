#!/bin/sh
docker compose down --remove-orphans
rm -rf ~/dev/docker-volumes/fastify-effect-starter/edgedb/*
docker compose up -d
