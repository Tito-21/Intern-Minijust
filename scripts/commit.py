#!/usr/bin/env python3
import subprocess
import sys

try:
    # Add all changes
    subprocess.run(['git', 'add', '.'], cwd='/vercel/share/v0-project', check=True)
    print("Added all changes to staging area")
    
    # Commit with message 'first case'
    subprocess.run(['git', 'commit', '-m', 'first case'], cwd='/vercel/share/v0-project', check=True)
    print("Committed with message 'first case'")
    
    # Push to GitHub
    subprocess.run(['git', 'push', 'origin', 'code-review-and-fix'], cwd='/vercel/share/v0-project', check=True)
    print("Pushed to GitHub successfully")
    
    print("\nGit commit and push completed successfully!")
    sys.exit(0)
    
except subprocess.CalledProcessError as e:
    print(f"Error executing git command: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
