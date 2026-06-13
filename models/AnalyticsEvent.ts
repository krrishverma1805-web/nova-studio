import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  eventType: string;
  page: string;
  element: string;
  timestamp: Date;
  sessionId: string;
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>({
  eventType: { type: String, required: true },
  page: { type: String, required: true },
  element: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sessionId: { type: String, required: true },
});

export default mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
