#!/bin/bash

# Configure git
git config user.email "development@casewise.local"
git config user.name "CaseWise Developer"

# Add all changes
git add -A

# Commit with message "first case"
git commit -m "first case"

# Push to the current branch
git push origin HEAD

echo "Changes committed and pushed successfully!"
