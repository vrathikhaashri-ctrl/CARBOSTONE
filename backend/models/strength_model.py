from config import BASE_STRENGTH, CARBONATION_FACTOR, LIME_FACTOR

def predict_strength(carbonation, lime):
    strength = BASE_STRENGTH + (carbonation * CARBONATION_FACTOR) + (lime * LIME_FACTOR)
    return round(strength, 2)