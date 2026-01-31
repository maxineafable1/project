import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const session = await getSession()

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const page = searchParams.get('page');
  const searchVal = searchParams.get('name');
  const direction = searchParams.get('direction');
  const sortBy = searchParams.get('sortBy');

  const pageNumber = Number(page)
  const pageQuery = Number.isFinite(pageNumber) && pageNumber > 0
    // ? `page=${pageNumber - 1}`
    // ? `${pageNumber - 1}`
    ? `${pageNumber}`
    : null

  const urlParams = new URLSearchParams();

  if (searchVal)
    urlParams.append('name', searchVal)

  if (pageQuery)
    urlParams.append('page', pageQuery)

  if (direction)
    urlParams.append('direction', direction)

  if (sortBy)
    urlParams.append('sortBy', sortBy)

  const res = await fetch(`${process.env.API_URL}/api/v1/workouts?${urlParams.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session.jwt}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
  })

  if (!res.ok)
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: res.status })

  const data = await res.json()
  return NextResponse.json(data)
}