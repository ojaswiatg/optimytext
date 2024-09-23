import AuthTab from "@/components/AuthTab";
import { EAuthTabs } from "@/lib/constants";

export default function LoginPage() {
    return (
        <AuthTab
            selectedTab={EAuthTabs.LOGIN}
            className="mt-24 mx-auto md:mt-48"
        />
    );
}
