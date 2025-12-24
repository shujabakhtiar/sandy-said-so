import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SignupInput, LoginInput, UpdateUserInput } from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class AuthService {
  static async signup(data: SignupInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  static async update(userId: number, data: UpdateUserInput) {
    const updateData: any = { ...data };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async getUserById(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: number };
    } catch (error) {
      return null;
    }
  }
}
