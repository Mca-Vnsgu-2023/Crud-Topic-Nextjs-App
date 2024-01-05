import ConnectMongoDB from '../../../../libs/mongodb'
import Topic from '../../../../models/topic'
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
    const { id } = params;
    const { title: title, description: description, userId: userId } = await request.json();
    await ConnectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, description,userId });
    return NextResponse.json({ message: "Topic edited" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await ConnectMongoDB();
    const topic = await Topic.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 })
}
