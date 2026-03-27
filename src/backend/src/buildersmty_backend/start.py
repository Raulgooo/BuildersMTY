import multiprocessing
import subprocess
import os
import sys

def run_api():
    print("🚀 Starting FastAPI Server...")
    port = os.getenv("PORT", "8000")
    # Using the module path since we are in the context of src/backend
    subprocess.run([
        "uvicorn", 
        "buildersmty_backend.main:app", 
        "--host", "0.0.0.0", 
        "--port", port
    ])

def run_bot():
    print("🤖 Starting Discord Bot...")
    # Using path from the root of the build (src/backend/)
    subprocess.run(["python", "src/buildersmty_backend/bot.py"])

if __name__ == "__main__":
    # Add current src directory to path for imports
    sys.path.append(os.path.join(os.getcwd(), "src"))
    
    p1 = multiprocessing.Process(target=run_api)
    p2 = multiprocessing.Process(target=run_bot)
    
    p1.start()
    p2.start()
    
    p1.join()
    p2.join()
