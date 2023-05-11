#!/bin/sh

# Create an env file from the example env if it doesn't already exist.
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Install dependencies.
npm install

# Create the "notes" db (will fail if it already exists but that's okay).
createdb notes

# Make sure the golang-migrate binary is executable
chmod +x db/golang-migrate/migrate
