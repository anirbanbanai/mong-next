import connectMongoDb from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request){
    const {name,email,des} = await request.json();
    await connectMongoDb();
    await Topic.create({name,email,des});
    return NextResponse.json({message: "topic created", name}, {status: 203})
}

export async function GET(){
    await connectMongoDb();
    const topics =  await Topic.find();
    return NextResponse.json(topics)
}


export async function DELETE(request){
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDb();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic deleted"})
}