import uvicorn
from fastapi import FastAPI
from routes.tuki_routes import router
from consts import BACKEND_HOST, BACKEND_PORT

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
    uvicorn.run(app, host=BACKEND_HOST, port=BACKEND_PORT)