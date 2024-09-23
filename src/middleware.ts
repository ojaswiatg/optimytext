import { updateSession } from "@/utils/supabase/middleware";
import { includes } from "lodash-es";
import { type NextRequest, NextResponse } from "next/server";

import { AUTH_PATHS } from "./lib/constants";
import { createSupabaseServerClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (data.user && includes(AUTH_PATHS, request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return await updateSession(request);
}

export const config = {
    matcher: ["/history", "/login", "/signup"],
};
