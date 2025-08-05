import { NextResponse } from 'next/server'

let messages: string[] = []

export async function GET() {
  return NextResponse.json({ messages })
}

export async function POST(request: Request) {
  const body = await request.json()
  const msg = body.message
  if (msg && typeof msg === 'string') {
    messages.push(msg)
  }
  return NextResponse.json({ success: true })
}
