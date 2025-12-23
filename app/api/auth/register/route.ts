import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { verifyPass } from "@/utils/verifyPass";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const emailVerify = /@gmail.com/.test(email);

    if (!email || !password) {
      return NextResponse.json(
        { erro: "é obrigatorio preencher tudo", red: true },
        { status: 400 }
      );
    }

    if (!emailVerify) {
      return NextResponse.json(
        { message: "email incompleto" },
        { status: 400 }
      );
    }

    const ok = verifyPass(password);

    if (ok) {
      return NextResponse.json({ message: ok, red: true }, { status: 400 });
    }

    const UserExiste = await prisma.user.findUnique({
      where: { email },
    });

    if (UserExiste) {
      return NextResponse.json(
        {
          message: "Esse usuario já existe, redirecionando...",
          red: true,
          exist: true,
        },
        { status: 400 }
      );
    }

    const hashed: string = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashed,
      },
    });

    return NextResponse.json(
      { message: "Cadastro feito com sucesso", red: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("erro no registro", error);
    return NextResponse.json(
      {
        message: "deu erro ao tentar resgistrar",
      },
      {
        status: 500,
      }
    );
  }
}
