import { ApplicationError } from "../../shared";
import { createResource } from "../../shared/factory/createResource";
import { parseStringAsArray } from "../../shared/utils/parseStringAsArray";
import { CollectorModel } from "../entities";
import type {
  BodyRequestCreateCollectorByUserId,
  CollectorMongoose,
} from "../entities/types/collector";

export const createCollectorService = async ({
  name,
  image_url,
  email,
  phone,
  items,
  latitude,
  longitude,
  createdBy,
}: BodyRequestCreateCollectorByUserId): Promise<CollectorMongoose> => {
  try {
    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const itemsArray = parseStringAsArray(items);

    const newCollector: CollectorMongoose = await createResource(
      CollectorModel
    )({
      name,
      image_url,
      email,
      phone,
      items: itemsArray,
      location,
      createdBy,
    });
    return newCollector;
  } catch (error: any) {
    throw new ApplicationError(
      error.message,
      error.errorType,
      error.fn,
      error.statusCode
    );
  }
};
