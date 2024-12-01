import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const values = await request.json();
    const { email, password } = values;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found, please register" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during login:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
