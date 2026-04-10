from fastapi import APIRouter

router = APIRouter()

@router.get("/carbon")
def carbon_info():
    return {
        "process": "CO2 mineralization",
        "reaction": "CaO + CO2 -> CaCO3",
        "status": "active"
    }