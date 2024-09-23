"use client";

import { UserContext } from "@/context/user";
import { TUser } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { isEmpty } from "lodash-es";
import { useContext, useEffect } from "react";

export default function AuthCheck() {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const getUser = async () => {
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase.auth.getUser();
            if (isEmpty(error)) {
                setUser({ email: data.user?.email } as TUser);
            }
        };

        getUser();
    }, [setUser]);

    return null;
}
