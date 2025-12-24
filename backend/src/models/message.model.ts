import { Types, Schema, model } from "mongoose";

interface IMessage {
  sender: Types.ObjectId;
  chatRoom: Types.ObjectId;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { 
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  chatRoom: { 
    type: Schema.Types.ObjectId, 
    ref: "room", 
    required: true,
  },
  content: { 
    type: String, 
    required: true,
  },
}, {
  timestamps: true,
});

export const Message = model<IMessage>("message", messageSchema);