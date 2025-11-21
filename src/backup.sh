#!/bin/bash

# Create timestamp backup of the project
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="../project-backup-${TIMESTAMP}"

echo "Creating backup at ${BACKUP_DIR}..."

# Create backup directory
mkdir -p "${BACKUP_DIR}"

# Copy all files except node_modules, .git, and other common excludes
rsync -av \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  --exclude 'build' \
  --exclude '.next' \
  --exclude 'out' \
  --exclude '.cache' \
  --exclude 'backup-*.sh' \
  ./ "${BACKUP_DIR}/"

echo "Backup completed successfully at ${BACKUP_DIR}"
