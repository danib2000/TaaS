import uvicorn
from fastapi import FastAPI
from routes.tuki_routes import router
from configs import BACKEND_HOST, BACKEND_PORT

app = FastAPI()
app.include_router(router, prefix="/tukis")


@app.get("/health")
def health_check():
    """
        Health check endpoint.

        Returns:
            dict: A dictionary indicating that the service is healthy.
    """
    return {"status": "ok"}


if __name__ == "__main__":
    import os
    from datetime import datetime
    from logger_file import set_log_file_handler

    # Set log file.
    log_path = f"./logs/log_{datetime.now().date()}.log"
    os.makedirs("./logs", exist_ok=True)
    set_log_file_handler(log_path)

    uvicorn.run(app, host=BACKEND_HOST, port=BACKEND_PORT)