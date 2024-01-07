import { ProfileTypes } from "../@backend/enums/profile-types.enum";

export interface Profile {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    token: string,
    type: ProfileTypes
}





















