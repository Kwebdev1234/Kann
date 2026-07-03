import { AuthRedirectGate } from "@/features/auth/components/auth-redirect-gate";
import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";


const LoginPage = async () => {
    await requireUnauth();
    return (
        <AuthRedirectGate>
            <LoginForm />
        </AuthRedirectGate>
    );
}

export default LoginPage;
