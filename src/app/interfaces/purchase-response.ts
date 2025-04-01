export interface PurchaseResponse {
    "purchaseId": number,
    "user_id": {
        "userId": number,
        "username": string,
        "fullname": string,
        "email": string,
        "phonenumber": string
    },
    "agent_Id": {
        "agentId": number,
        "userId": {
            "userId": number,
            "username": string,
            "fullname": string,
            "email": string,
            "phonenumber": string
        },
        "rating": number,
        "sale_count": number
    },
    "property": {
        "propertyId": number,
        "user_id": {
            "userId": 3,
            "username": string,
            "fullname": string,
            "email": string,
            "phonenumber": string
        },
        "name": string,
        "location": {
            "locationId": number,
            "country": string,
            "city": string,
            "state": string,
            "primary_address": string,
            "pincode": string,
            "coordinates": string
        },
        "price": number,
        "availability": boolean,
        "rating": number,
        "popularity": number
    }
}
