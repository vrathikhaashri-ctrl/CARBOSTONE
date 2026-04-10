def quality_from_strength(strength):
    if strength < 5:
        return "Low"
    elif strength < 10:
        return "Medium"
    else:
        return "High"