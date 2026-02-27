import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Better Auth route scaffold is ready. Configure adapters to enable full auth APIs.',
  });
}

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: 'Auth API handler is scaffolded but not connected to database adapters yet.',
    },
    { status: 501 }
  );
}
