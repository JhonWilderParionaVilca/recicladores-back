import { Types } from "mongoose";
import { InferType } from "yup";
import { bodyRequestCreateCollectorYup } from "../../validators/createCollector.validator";
import { queryRequestNearCollectorYup } from "../../validators/nearCollectors.validator";

export interface Collector {
  name: string;
  email: string;
  phone: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  items: string[];
  createdBy: Types.ObjectId;
}

export type BodyRequestCreateCollector = InferType<
  typeof bodyRequestCreateCollectorYup
>;

export interface BodyRequestCreateCollectorByUserId
  extends BodyRequestCreateCollector {
  createdBy: string;
}

export type QueryRequestNearCollector = InferType<
  typeof queryRequestNearCollectorYup
>;

export interface CollectorMongoose extends Collector {
  _id: Types.ObjectId;
}
