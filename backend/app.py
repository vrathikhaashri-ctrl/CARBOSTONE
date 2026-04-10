from fastapi import FastAPI

from routes.prediction import router as prediction_router
from routes.carbon import router as carbon_router
from routes.digital_twin import router as twin_router

app = FastAPI(title="CARBOSTONE Backend")

app.include_router(prediction_router)
app.include_router(carbon_router)
app.include_router(twin_router)

@app.get("/")
def root():
    return {"message": "CARBOSTONE backend running"}