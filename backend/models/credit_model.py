from config import CO2_ABSORPTION_FACTOR

def calculate_credits(co2, time):
    absorbed = (co2 * time) / CO2_ABSORPTION_FACTOR
    credits = absorbed / 1000
    return round(absorbed, 4), round(credits, 6)