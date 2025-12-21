import { Context } from "hono";
import { sign } from "hono/jwt";
import { User } from "../models/user.model";
import { Room } from "../models/room.model";

class UserController {
  async createUser(c: Context) {
    const { username, email, password } = await c.req.json();
    if (!username || !email || !password) {
      return c.json({ message: 'Missing required fields' }, 400);
    }
    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (userExists) {
      return c.json({ message: 'Username or email already exists' }, 409);
    }
    const hashedPassword = await Bun.password.hash(password);
    if (!hashedPassword) {
      return c.json({ message: 'Error hashing password' }, 500);
    }
    try {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      await Room.findByIdAndUpdate(Bun.env.GLOBAL_ROOM_ID, {
        $push: { participants: newUser._id },
      });
      return c.json({ message: 'User created successfully', userId: newUser }, 201);
    } catch (error) { 
      return c.json({ message: 'Error creating user', error }, 500);
    }
  }
  async loginUser(c: Context) {
    const { username, password } = await c.req.json();
    if (!username || !password) {
      return c.json({ message: 'Missing required fields' }, 400);
    }
    const user = await User.findOne({ username });
    if (!user) {
      return c.json({ message: 'Invalid username or password' }, 401);
    }
    const passwordMatch = await Bun.password.verify(password, user.password);
    if (!passwordMatch) {
      return c.json({ message: 'Invalid password' }, 401);
    }
    const token = await sign({ userId: user._id }, Bun.env.JWT_SECRET as string);
    if (!token) {
      return c.json({ message: 'Error generating token' }, 500);
    }
    try {
      return c.json({ message: 'Login successful', userId: user, token: token }, 200);
    } catch (error) {
      return c.json({ message: 'Error during login', error }, 500);
    }
  }
  async logoutUser(c: Context) {
    try {
      return c.json({ message: 'Logout successful' }, 200);
    } catch (error) {
      return c.json({ message: 'Error during logout', error }, 500);
    }
  }
  async getUserProfile(c: Context) {
    const user = c.get('user');
    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }
    try {
      return c.json({ user: user }, 200);
    } catch (error) {
      return c.json({ message: 'Error fetching user profile', error }, 500);
    }
  }
}

export const userController = new UserController();