import { connect } from 'mongoose';

export const connectDB = async () => {
  try { 
    const db = await connect(`${Bun.env.MONGOOSE_CONNECTION_STRING as string}/ts-websocket`);
    console.log(`MongoDB connected to: ${db.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};