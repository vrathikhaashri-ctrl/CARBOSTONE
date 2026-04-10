from fastapi import APIRouter

router = APIRouter()

@router.post("/digital-twin")
def digital_twin(data: dict):

    co2 = data["co2"]
    time = data["time"]

    fill = min((co2 * time) / 5000, 100)

    return {
        "pellet_fill_percent": round(fill,2),
        "stage": "carbonating" if fill < 100 else "hardened"
    }