"use client";

import { TAlert, TAlertContext } from "@/lib/types";
import { filter } from "lodash-es";
import { createContext, useState } from "react";

export const AlertContext = createContext<TAlertContext>({} as TAlertContext);

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [alerts, setAlerts] = useState<TAlert[]>([]);

    function pushAlert(alert: TAlert) {
        setAlerts((prevAlerts) => [...prevAlerts, alert]);

        setTimeout(() => {
            setAlerts((prevAlerts) =>
                filter(prevAlerts, (a) => a.id !== alert.id),
            );
        }, alert.timeout ?? 5000);
    }

    return (
        <AlertContext.Provider value={{ alerts, setAlerts, pushAlert }}>
            {children}
        </AlertContext.Provider>
    );
}
