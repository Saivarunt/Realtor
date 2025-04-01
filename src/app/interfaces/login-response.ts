export interface LoginResponse {
    user: {
        "userId": number,
        "username": string,
        "password": string,
        "authorities": [
            {
                "roleId": number,
                "authority": string
            },
        ],
        "fullName": string,
        "email": string,
        "phoneNumber": string,
        "enabled": boolean,
        "accountNonExpired": boolean,
        "credentialsNonExpired": boolean,
        "accountNonLocked": boolean
    },
    jwt: string;
}
