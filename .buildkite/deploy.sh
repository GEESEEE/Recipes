#! /usr/local/bin/ bash
set -e # exit entire script when command exits with non-zero status

yarn

# Publish `production` release
expo publish --release-channel production --non-interactive

# Start building standalone android build using `production` release channel
expo build:android --release-channel production --non-interactive --no-publish

# Download the built android binary
curl -o app.apk "$(expo url:apk --non-interactive)"
