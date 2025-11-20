import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  providers?: {
    google?: { id?: string; profile?: any };
    microsoft?: { id?: string; profile?: any };
  };
  type?: string;
  preferredUsername?: string;
  inbox?: string;
  outbox?: string;
  followers?: string;
  following?: string;
  publicKey?: {
    id?: string;
    owner?: string;
    publicKeyPem?: string;
  };
  summary?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, default: 'Person' },
    preferredUsername: { type: String },
    inbox: { type: String },
    outbox: { type: String },
    followers: { type: String },
    following: { type: String },
    publicKey: {
      id: { type: String },
      owner: { type: String },
      publicKeyPem: { type: String },
    },
    providers: {
      google: {
        id: { type: String },
        profile: { type: Schema.Types.Mixed }
      },
      microsoft: {
        id: { type: String },
        profile: { type: Schema.Types.Mixed }
      }
    },
    summary: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
