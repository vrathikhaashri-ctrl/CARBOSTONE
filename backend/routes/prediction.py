from fastapi import APIRouter

from models.carbonation_model import calculate_carbonation
from models.strength_model import predict_strength
from models.credit_model import calculate_credits
from utils.calculations import quality_from_strength

router = APIRouter()

@router.post("/predict")
def predict(data: dict):

    co2 = data["co2"]
    lime = data["lime"]
    pore = data["pore"]
    time = data["time"]

    carbonation = calculate_carbonation(co2, pore, time)

    strength = predict_strength(carbonation, lime)

    absorbed, credits = calculate_credits(co2, time)

    quality = quality_from_strength(strength)

    return {
        "carbonation_percent": carbonation,
        "predicted_strength": strength,
        "co2_absorbed": absorbed,
        "carbon_credits": credits,
        "quality": quality
    }