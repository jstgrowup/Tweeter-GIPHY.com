import { NextResponse } from "next/server";
export default function middleware(req) {
  let verify = req.cookies.get("loggedin");

  if (verify === undefined || !verify.value) {
    return NextResponse.redirect("https://tweeter-giphy-com.vercel.app/signin");
  } else {
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/", "/userProfile"],
};
