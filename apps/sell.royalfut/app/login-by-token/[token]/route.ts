import url from "node:url";
import { NextRequest, NextResponse } from "next/server";
import { ECookiesKeys } from "@royalfut/enums";

export async function GET(req: NextRequest) {
    const parsedUrl = url.parse(req.url, true);
    const token = parsedUrl.pathname?.split("/").pop();

    const res = NextResponse.redirect("http://localhost:5000");
    res.headers.set(
        "Set-Cookie",
        `${ECookiesKeys.AUTH_USER_TOKEN}=${token}; sameSite=strict; maxAge=60*60*24; Path=/`,
    );

    return res;
}
