import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url || !url.match(/^(https?:\/\/)/)) {
    return NextResponse.json(
      { message: 'Invalid URL format. Please include http:// or https://' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.head(url, { timeout: 5000 }); 
    if (response.status >= 200 && response.status < 400) {
      return NextResponse.json({ message: 'UP' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'DOWN' }, { status: 400 });
  }
  
  return NextResponse.json({ message: 'DOWN' }, { status: 400 });
}
