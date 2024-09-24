import { EAlertType } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "./Alert.scss";

type TAlertProps = {
    type: EAlertType;
    message: string;
    timeout?: number;
};

const ALERT_ICON_MAP = {
    [EAlertType.INFO]: "i-mdi-information-outline",
    [EAlertType.SUCCESS]: "i-mdi-checkbox-marked-circle-outline",
    [EAlertType.ERROR]: "i-mdi-close-circle",
    [EAlertType.WARNING]: "i-mdi-alert-circle-outline",
};

const ALERT_TYPE_MAP = {
    [EAlertType.SUCCESS]: "alert-success",
    [EAlertType.WARNING]: "alert-warning",
    [EAlertType.INFO]: "alert-info",
    [EAlertType.ERROR]: "alert-error",
};

export default function Alert({ type, message }: TAlertProps) {
    return (
        <div
            role="alert"
            className={cn(
                "alert flex items-center justify-start gap-4 w-80 alert-visible",
                ALERT_TYPE_MAP[type],
            )}
        >
            <div className={cn(ALERT_ICON_MAP[type], "h-5 w-5")} />
            <p>{message}</p>
        </div>
    );
}
