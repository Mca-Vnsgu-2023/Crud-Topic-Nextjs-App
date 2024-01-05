import { NextResponse } from "next/server";
import ConnectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";


export async function POST(request) {
  const { title, description, userId } = await request.json();
  await ConnectMongoDB();
  await Topic.create({ title, description, userId });
  return NextResponse.json({ message: "Topic Created" }, { status: 200 });
}

export async function GET(request) {
  try {
    const id = request.nextUrl.searchParams.get("userid")
    await ConnectMongoDB();
    const topic = await Topic.find({ "userId": id });
    if (topic) {
      return NextResponse.json({ topic }, { status: 200 }, { success: true })
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err, success: false }, { status: 500 })
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id")
  await ConnectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Deleted" }, { status: 201 });
}

