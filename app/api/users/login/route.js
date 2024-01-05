import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../../../../models/users";
import ConnectMongoDB from "../../../../libs/mongodb"
import crypto from 'crypto'
import { cookies } from "next/headers";

export async function POST(req) {
    const body = await req.json();
    const { email, password } = body
    if (!email || !password) {
        return NextResponse.json({ msg: "Invalid credentials" }, { status: 400 })
    }
    await ConnectMongoDB();
    try {
        const isUserPresent = await User.findOne({ email: email })
        if (!isUserPresent) {
            return NextResponse.json({ msg: "User is not available" }, { status: 409 })
        }
        // compare password with hashed password
        const isPasswordMatch = await bcrypt.compare(password, isUserPresent?.password)
        if (!isPasswordMatch) {
            return NextResponse.json({ msg: "Invalid Credentials" }, { status: 409 })
        }
        if (isUserPresent && isPasswordMatch) {
            const privateKey = crypto.randomUUID();
            //Generate Token.
            const token = jwt.sign({
                user: {
                    name: isUserPresent.name,
                    email: isUserPresent.email,
                    id: isUserPresent.id
                }
            }, privateKey,
                { expiresIn: "24h" }
            )
            cookies().set("token", token)
            cookies().set("userId",isUserPresent?.id)
            cookies().set("userName",isUserPresent?.name)
            return NextResponse.json({ msg: "User successfull login", success: true }, { status: 200 })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: err, success: false }, { status: 500 })
    }
}