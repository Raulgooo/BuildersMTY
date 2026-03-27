import multiprocessing
import os
import sys
import uvicorn

def run_bot():
    print("🤖 Starting Discord Bot in background...")
    # Add src to sys.path for the child process
    src_path = os.path.join(os.getcwd(), "src")
    if src_path not in sys.path:
        sys.path.append(src_path)
    
    try:
        # Import inside the function to ensure sys.path is updated
        from buildersmty_backend.bot import bot, TOKEN
        if TOKEN:
            bot.run(TOKEN)
        else:
            print("❌ DISCORD_BOT_TOKEN not found.")
    except Exception as e:
        print(f"❌ Discord Bot crashed: {e}")

if __name__ == "__main__":
    print(f"DEBUG: Current Working Directory: {os.getcwd()}")
    
    # Add src to sys.path
    src_path = os.path.join(os.getcwd(), "src")
    if src_path not in sys.path:
        sys.path.append(src_path)

    # 1. Launch the BOT in a separate process
    bot_process = multiprocessing.Process(target=run_bot)
    bot_process.start()

    # 2. Run the API in the MAIN PROCESS using uvicorn.run directly
    # This is the most reliable way for Railway to detect the port
    print("🚀 Starting FastAPI Server (Main Process)...")
    port = int(os.getenv("PORT", 8000))
    print(f"📡 Binding to port: {port}")
    
    try:
        from buildersmty_backend.main import app
        uvicorn.run(app, host="0.0.0.0", port=port, proxy_headers=True, forwarded_allow_ips="*")
    finally:
        bot_process.terminate()
        bot_process.join()
