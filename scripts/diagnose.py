#!/usr/bin/env python3
import os
import subprocess

print("Current working directory:", os.getcwd())
print("Directory exists:", os.path.exists('/vercel/share/v0-project'))
print("Contents of current dir:", os.listdir('.') if os.path.exists('.') else "N/A")

try:
    result = subprocess.run(['pwd'], capture_output=True, text=True)
    print("pwd output:", result.stdout)
    
    result = subprocess.run(['git', 'status'], capture_output=True, text=True)
    print("git status:", result.stdout if result.returncode == 0 else result.stderr)
except Exception as e:
    print(f"Error: {e}")
