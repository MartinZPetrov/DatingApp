import { Photo } from './photo';
export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: string;
    gender: string;
    created: string;
    lastActive: string;
    photoUrl: string;
    city: string;
    country: string;
    intrests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}