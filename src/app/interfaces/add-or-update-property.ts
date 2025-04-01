import { LocationResponse } from "./location-response";

export interface AddOrUpdateProperty {
    locations: LocationResponse[];
    loactionIds: number[];
    addOrUpdateFormResponse: {
        user_id: number;
        name: string;
        location: LocationResponse;
        price: number;
        availability: boolean;
        rating: number;
        popularity: number;
    };
    currentUpdatePropertyId: number;
    type: string;
}