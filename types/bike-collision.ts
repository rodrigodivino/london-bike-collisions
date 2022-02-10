import {CollisionSeverity} from "./collision-severity";

export interface BikeCollision {
    'Accident Index': number | string,
    'Api Url': string,
    'Borough': string,
    'Casualties': string,
    'Date': number,
    'Latitude': number,
    'Longitude': number,
    'Number of Casualties': number,
    'Number of Vehicles': number
    'Severity': CollisionSeverity,
    'Url': string,
}
