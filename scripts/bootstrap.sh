#!/bin/sh

# Create an env file from the example env if it doesn't already exist.
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Install dependencies.
npm install

# Create the "notes" db (will fail if it already exists but that's okay).
createdb notes

# Install golang-migrate binary
# Create the directory if needed
if [ ! -d ./db/golang-migrate ]; then
  mkdir -p ./db/golang-migrate
fi
# Download the binary if needed
if [ ! -f ./db/golang-migrate/migrate ]; then
  cd ./db/golang-migrate

  VERSION="v4.15.2"
  OS=$(uname -s | awk '{ print tolower($0) }')
  ARCH=$(uname -m)
  if [ $OS = "linux" ] && [ $ARCH = "x86_64" ]; then
    ARCH="amd64"
  fi

  curl -L https://github.com/golang-migrate/migrate/releases/download/$VERSION/migrate.$OS-$ARCH.tar.gz | tar xvz
  chmod +x ./migrate
  cd -
fi

