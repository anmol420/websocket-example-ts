import { Types, Schema, model } from "mongoose";

interface IMessage {
  sender: string;
  chatRoom: Types.ObjectId;
  content: string;
}

const messageSchema = new Schema<IMessage>({
  sender: { 
    type: String,
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