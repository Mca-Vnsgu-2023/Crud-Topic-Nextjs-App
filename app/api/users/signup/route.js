import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from "../../../../models/users";
import jwt from 'jsonwebtoken'
import ConnectMongoDB from "../../../../libs/mongodb";
import crypto from 'crypto'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Invalid fields" }, { status: 400 })
        }
        await ConnectMongoDB();
        const isUserPresent = await User.findOne({ email })
        if (isUserPresent) {
            return NextResponse.json({ message: "User is already present." }, { status: 400 })
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashPassword })
        await user.save()
        //you want to generate token.
        // const privateKey = crypto.randomUUID();
        // const token=jwt.sign({name,email}, privateKey)
        const response = NextResponse.json({ message: "User successful created." }, { status: 200 })
        return response;
    } catch (err) {
        return NextResponse.json({ message: err, status: 500 })
    }
}

export async function GET() {
    await ConnectMongoDB();
    const Users = await User.find();
    return NextResponse.json({ Users });
  }