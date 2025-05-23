from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

AMENITIES = ['meals', 'attached bath', 'wifi', 'laundry', 'heater', 'security', 'parking', 'elevator', 'ac']
ROOM_TYPES = ['Private', '2 Sharing', '3 Sharing']

def encode_listing(listing):
    data = {
        'rent': int(listing['rent']),
        'room_type': ROOM_TYPES.index(listing['room_type']) if listing['room_type'] in ROOM_TYPES else 0,
    }
    for amenity in AMENITIES:
        data[amenity] = 1 if amenity in listing['amenities'] else 0
    return data

def encode_student(student):
    data = {
        'rent': int(student['max_rent']),
        'room_type': ROOM_TYPES.index(student['preferred_room_type']) if student['preferred_room_type'] in ROOM_TYPES else 0,
    }
    for amenity in AMENITIES:
        data[amenity] = 1 if amenity in student['amenities'] else 0
    return data

def get_recommendations(student_input, listings, top_n=3):
    student_vector = encode_student(student_input)
    listing_vectors = [encode_listing(lst) for lst in listings]

    df = pd.DataFrame([student_vector] + listing_vectors)
    similarities = cosine_similarity([df.iloc[0]], df.iloc[1:])[0]

    ranked = sorted(zip(similarities, listings), key=lambda x: x[0], reverse=True)
    return [item[1] for item in ranked[:top_n]]