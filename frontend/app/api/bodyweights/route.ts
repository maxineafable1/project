import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const session = await getSession()

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const page = searchParams.get('page');

  const pageNumber = Number(page)
  const pageQuery = Number.isFinite(pageNumber) && pageNumber > 0
    ? `page=${pageNumber - 1}`
    : ''

  const res = await fetch(`${process.env.API_URL}/api/v1/bodyweights?${pageQuery}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session.jwt}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
  })

  if (!res.ok)
    return NextResponse.json({ error: 'Failed to fetch bodyweights' }, { status: res.status })

  const data = await res.json()
  return NextResponse.json(data)
}