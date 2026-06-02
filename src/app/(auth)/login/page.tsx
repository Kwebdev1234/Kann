import { LoginForm } from "@/features/auth/components/login-form";

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4">
            <div className="w-full max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage;
