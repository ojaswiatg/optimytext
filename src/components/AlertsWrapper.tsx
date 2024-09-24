"use client";

import { AlertContext } from "@/context/alert";
import { map } from "lodash-es";
import { useContext } from "react";

import Alert from "./Alert";

export default function AlertsWrapper() {
    const { alerts } = useContext(AlertContext);

    return (
        <div className="mt-8">
            {map(alerts, (alert) => {
                return (
                    <div key={`alert-${alert.id}`}>
                        <Alert {...alert} />
                    </div>
                );
            })}
        </div>
    );
}
