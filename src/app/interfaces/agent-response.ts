export interface AgentResponse {
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
}
