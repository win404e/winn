import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPass = hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });
    return Response.json({
      mgs: "user created!",
      data: newUser,
    });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}
