import { Types, Schema, model } from "mongoose";

interface IRoom {
  name: string;
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "user",
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "message",
  }],
}, {
  timestamps: true,
});

export const Room = model<IRoom>("room", roomSchema);