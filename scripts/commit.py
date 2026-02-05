#!/usr/bin/env python3
import subprocess
import sys
import os

try:
    # Change to project directory
    os.chdir('/vercel/share/v0-project')
    print(f"Working directory: {os.getcwd()}")
    
    # Add all changes
    subprocess.run(['git', 'add', '.'], check=True)
    print("Added all changes to staging area")
    
    # Commit with message 'first case'
    subprocess.run(['git', 'commit', '-m', 'first case'], check=True)
    print("Committed with message 'first case'")
    
    # Push to GitHub
    subprocess.run(['git', 'push', 'origin', 'code-review-and-fix'], check=True)
    print("Pushed to GitHub successfully")
    
    print("\nGit commit and push completed successfully!")
    sys.exit(0)
    
except subprocess.CalledProcessError as e:
    print(f"Error executing git command: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
