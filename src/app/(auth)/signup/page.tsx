import { AuthRedirectGate } from "@/features/auth/components/auth-redirect-gate";
import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
    await requireUnauth();
    return (
        <AuthRedirectGate>
            <RegisterForm />
        </AuthRedirectGate>
    );
}

export default Page;