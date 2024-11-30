import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest)
{
    const {url} = await request.json()

    if(!url)
    {
        return NextResponse.json({message:"Please enter a valid url"}, {status:400})
    }

    try {
        const response = await axios.head(url)
        return NextResponse.json({message:"UP"}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"DOWN"}, {status:400})

    }
}