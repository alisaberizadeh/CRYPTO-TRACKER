// app/api/coins/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const startParam = req.nextUrl.searchParams.get("start");
    const start = startParam ? parseInt(startParam) : 1;
    const sort_dir = req.nextUrl.searchParams.get("sort_dir");
    const sort = req.nextUrl.searchParams.get("sort");
    const limit = req.nextUrl.searchParams.get("limit");

    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.CMC_API_KEY}&start=${start}
      ${limit ? `&limit=${limit}` : `&limit=50`}
      ${sort_dir ? `&sort_dir=${sort_dir}` : ""}
      ${sort ? `&sort=${sort}` : ""}
      `,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from API" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
