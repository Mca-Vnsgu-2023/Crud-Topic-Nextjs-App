import { NextResponse } from "next/server";
import User from "../../../../../models/users";
import ConnectMongoDB from "../../../../../libs/mongodb";
import bcrypt from 'bcrypt';

export async function POST(req) {
    const body = await req.json()
    const { email, newPassword } = body;
    await ConnectMongoDB();

    try {
        const user = await User.findOne({ email })
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
