import connectMongoDb from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, {params}){
    const {id} = params;
    const {newName: name, newMail: email, newDes: des} =await request.json();
    await connectMongoDb();
    await Topic.findByIdAndUpdate(id,{name, des, email});
    return NextResponse.json({message: "topic update"}, {status: 200})
};

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDb();
    await Topic.findOne({_id: id})
}