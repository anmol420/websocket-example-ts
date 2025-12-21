import { Hono } from 'hono'
import userRouter from './routes/user.routes'
import roomRouter from './routes/room.routes'
import messageRouter from './routes/message.routes'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/users', userRouter);
app.route('api/v1/room', roomRouter);
app.route('api/v1/messages', messageRouter);

export default app