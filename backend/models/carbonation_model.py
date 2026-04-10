def calculate_carbonation(co2, pore, time):
    carbonation = (co2 * pore * time) / 1000
    return {"carbonation_depth": round(carbonation, 2)}