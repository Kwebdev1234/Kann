import { RegisterForm } from "@/features/auth/components/register-form"

const Page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4">
            <div className="w-full max-w-3xl text-center">
                <RegisterForm />
            </div>
        </div>
    )
}

export default Page;