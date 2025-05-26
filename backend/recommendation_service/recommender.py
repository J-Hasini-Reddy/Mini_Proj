from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

AMENITIES = ['meals', 'attached bath', 'wifi', 'laundry', 'heater', 'security', 'parking', 'elevator', 'ac']
ROOM_TYPES = ['Private', 'Shared', 'Studio']
SHARING_TYPES = ['Private', '2 Sharing', '3+ Sharing']


def encode_listing(listing):
    data = {
        'rent': int(listing.get('rent', 0)),
        'room_type': ROOM_TYPES.index(listing.get('roomType', 'Private')) if listing.get('roomType') in ROOM_TYPES else 0,
        'sharing_type': SHARING_TYPES.index(listing.get('sharingType', 'Private')) if listing.get('sharingType') in SHARING_TYPES else 0,
    }
    amenities = listing.get('amenities', [])
    for amenity in AMENITIES:
        data[amenity] = 1 if amenity in amenities else 0
    return data

def encode_student(student):
    data = {
        'rent': int(student.get('maxRent', 0)),
        'room_type': ROOM_TYPES.index(student.get('roomType', 'Private')) if student.get('roomType') in ROOM_TYPES else 0,
        'sharing_type': SHARING_TYPES.index(student.get('sharingType', 'Private')) if student.get('sharingType') in SHARING_TYPES else 0,
    }
    amenities = student.get('amenities', [])
    for amenity in AMENITIES:
        data[amenity] = 1 if amenity in amenities else 0
    return data


def get_recommendations(student_input, listings, top_n=3):
    student_vector = encode_student(student_input)
    listing_vectors = [encode_listing(lst) for lst in listings]

    df = pd.DataFrame([student_vector] + listing_vectors)
    similarities = cosine_similarity([df.iloc[0]], df.iloc[1:])[0]

    # Create a list of tuples (similarity, listing, distance)
    ranked = []
    for i, (similarity, listing) in enumerate(zip(similarities, listings)):
        # Ensure distance is a number and convert to km if it's in meters
        distance = listing.get('distance')
        if distance is not None:
            distance = float(distance)  # Convert to float if it's a string
        
        ranked.append((similarity, listing, distance))

    # Sort by similarity first, then by distance (if available)
    ranked.sort(key=lambda x: (-x[0], x[2] if x[2] is not None else float('inf')))
    
    # Return only the listings with their distances
    return [{**item[1], 'distance': item[2]} for item in ranked[:top_n] if item[2] is not None]