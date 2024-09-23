import { createSupabaseServerClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";

    const responseError = {
        success: false,
        message: "Failed to verify the One-Time Password",
        error: "",
    };

    if (token_hash && type) {
        const supabase = createSupabaseServerClient();

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });

        if (error) {
            return new Response(
                JSON.stringify({ ...responseError, error: error.message }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 500,
                },
            );
        }

        if (!error) {
            // redirect user to specified redirect URL or root of app
            redirect(next);
        }
    }

    return new Response(
        JSON.stringify({ ...responseError, error: "Internal Server Error" }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        },
    );
}
