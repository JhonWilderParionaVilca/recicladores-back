import { model } from "mongoose";
import { CollectorSchema } from "../schemas/collector.schema";
import type { Collector } from "../types/collector";

export const CollectorModel = model<Collector>("Collector", CollectorSchema);
