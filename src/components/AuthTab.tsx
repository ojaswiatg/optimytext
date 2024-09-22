"use client";

import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { cn } from "@/lib/utils";
import { useState } from "react";

enum ETabs {
    LOGIN,
    SIGNUP,
}

export default function AuthTab() {
    const [activeTab, setActiveTab] = useState(ETabs.LOGIN);
    return (
        <div className="h-fit mt-24 w-fit mx-auto md:mt-48">
            <div role="tablist" className="tabs tabs-bordered mb-4">
                <button
                    className={cn("tab", {
                        "tab-active": activeTab === ETabs.LOGIN,
                    })}
                    onClick={() => setActiveTab(ETabs.LOGIN)}
                >
                    Log in
                </button>
                <button
                    className={cn("tab", {
                        "tab-active": activeTab === ETabs.SIGNUP,
                    })}
                    onClick={() => setActiveTab(ETabs.SIGNUP)}
                >
                    Sign up
                </button>
            </div>
            {activeTab === ETabs.LOGIN ? (
                <Login switchToSignupTab={() => setActiveTab(ETabs.SIGNUP)} />
            ) : null}
            {activeTab === ETabs.SIGNUP ? (
                <Signup switchToLoginTab={() => setActiveTab(ETabs.LOGIN)} />
            ) : null}
        </div>
    );
}
