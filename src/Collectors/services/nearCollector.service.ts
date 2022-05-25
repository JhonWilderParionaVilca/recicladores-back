import { ApplicationError } from "../../shared";
import { findAllResources } from "../../shared/factory/findAllResourcesByField";
import { parseStringAsArray } from "../../shared/utils/parseStringAsArray";
import { CollectorModel } from "../entities";
import type {
  CollectorMongoose,
  QueryRequestNearCollector,
} from "../entities/types/collector";

export const nearCollectorService = async ({
  items,
  latitude,
  longitude,
}: QueryRequestNearCollector): Promise<CollectorMongoose[]> => {
  try {
    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    const itemsArray = parseStringAsArray(items);
    const nearCollectors: CollectorMongoose[] = await findAllResources(
      CollectorModel
    )({
      items: {
        $in: itemsArray,
      },
      location: {
        $near: {
          $geometry: location,
          $maxDistance: 5000,
        },
      },
    });
    return nearCollectors;
  } catch (error: any) {
    throw new ApplicationError(
      error.statusCode === 404 ? "No hay recicladores cerca" : error.message,
      error.errorType,
      error.fn,
      error.statusCode
    );
  }
};
