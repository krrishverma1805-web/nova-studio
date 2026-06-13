import mongoose, { Schema, Document } from 'mongoose';

export interface IContactLog extends Document {
  name: string;
  email: string;
  submittedAt: Date;
  ip: string;
  userAgent: string;
}

const ContactLogSchema = new Schema<IContactLog>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
});

export default mongoose.models.ContactLog ||
  mongoose.model<IContactLog>('ContactLog', ContactLogSchema);
