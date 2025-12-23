import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "email ou senhas incorretos",
          red: true,
        },
        { status: 404 }
      );
    }


    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      return NextResponse.json(
        {
          message: "email ou senha incorretos",
          red: true,
        },
        {
          status: 404,
        }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const res = NextResponse.json({
      message: "Ligado",
      tokenExist: true,
      red: false,
    });

    res.cookies.set("tokens", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Deu ruim", error);
    return NextResponse.json(
      { message: "Usuário náo encontrado" },
      { status: 404 }
    );
  }
}
