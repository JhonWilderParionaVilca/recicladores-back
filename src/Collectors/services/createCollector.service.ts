import { ApplicationError } from "../../shared";
import { createResource } from "../../shared/factory/createResource";
import { CollectorModel } from "../entities";
import type {
  BodyRequestCreateCollector,
  CollectorMongoose,
} from "../entities/types/collector";

export const createCollectorService = async ({
  name,
  email,
  phone,
  items,
  latitude,
  longitude,
}: BodyRequestCreateCollector): Promise<CollectorMongoose> => {
  try {
    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const newCollector: CollectorMongoose = await createResource(
      CollectorModel
    )({
      name,
      email,
      phone,
      items,
      location,
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
