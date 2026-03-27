import multiprocessing
import subprocess
import os
import sys
import time

def run_bot():
    print("🤖 Starting Discord Bot in background...")
    src_path = os.path.join(os.getcwd(), "src")
    env = os.environ.copy()
    env["PYTHONPATH"] = src_path + (":" + env.get("PYTHONPATH", "") if env.get("PYTHONPATH") else "")
    try:
        subprocess.run([sys.executable, "src/buildersmty_backend/bot.py"], env=env)
    except Exception as e:
        print(f"❌ Discord Bot crashed: {e}")

if __name__ == "__main__":
    # 1. Launch the BOT in a separate process (background)
    bot_process = multiprocessing.Process(target=run_bot)
    bot_process.start()

    # 2. Run the API in the MAIN PROCESS (foreground)
    # This is vital for Railway's port detection
    print("🚀 Starting FastAPI Server (Main Process)...")
    port = os.getenv("PORT", "8000")
    print(f"📡 Binding to port: {port}")
    
    src_path = os.path.join(os.getcwd(), "src")
    env = os.environ.copy()
    env["PYTHONPATH"] = src_path + (":" + env.get("PYTHONPATH", "") if env.get("PYTHONPATH") else "")
    
    try:
        # We use sys.executable -m uvicorn to ensure correct import resolution
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "buildersmty_backend.main:app", 
            "--host", "0.0.0.0", 
            "--port", port
        ], env=env)
    finally:
        # Cleanup bot process on exit
        if bot_process.is_alive():
            print("🛑 Terminating Discord Bot...")
            bot_process.terminate()
            bot_process.join()
