// app/api/remove-bg/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const { image } = await req.json(); // Receive base64 image data

  try {
    const response = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      { image_file_b64: image },
      {
        headers: {
          'X-Api-Key': process.env.REMOVE_BG_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    const resultImage = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
    return NextResponse.json({ resultImage });
  } catch (error) {
    console.error('Background removal error:', error);
    return NextResponse.json({ error: 'Failed to remove background' }, { status: 500 });
  }
}
