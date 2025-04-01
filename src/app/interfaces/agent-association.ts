export interface AgentAssociation {
    "associationId": number,
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
    "price": number
}