import { AmenityEntity, AmenityType } from "./entity/amenity.entity";
import { AmenityBEntity } from "./entity/amenity-b.entity";
import { AmenityAEntity } from "./entity/amenity-a.entity";

export const transform = (amenity: AmenityEntity) => {
    switch (amenity.type) {
        case AmenityType.a: {
            amenity.amenityAEntity = amenity.features as AmenityAEntity;
            amenity.amenityAEntity.amenity = amenity;
            break;
        }
        case AmenityType.b: {
            amenity.amenityBEntity = amenity.features as AmenityBEntity;
            amenity.amenityBEntity.amenity = amenity;
            break;
        }
        default:
            throw new Error(`Unexpected amenity type ${amenity.type}`);
    }
}
