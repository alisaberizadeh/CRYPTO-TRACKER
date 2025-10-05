// app/api/coins/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const idParams= req.nextUrl.searchParams.get("id");
    const id = idParams ? parseInt(idParams) : null

    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?CMC_PRO_API_KEY=${process.env.CMC_API_KEY}&id=${id}`,
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
