"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const RegisterSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]

});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

/**
 * Render a user registration form with email, password, and confirm-password fields plus Google/GitHub sign-in buttons.
 *
 * Submitting the form attempts to create an account via the auth client; on success it navigates to `/` and shows a success toast, and on error it shows an error toast.
 *
 * @returns The JSX element for the registration UI.
 */
export function RegisterForm() {
    const router = useRouter();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    // const signInGithub = async () => {
    //     await authClient.signIn.social({
    //         provider: "github",
    //         callbackURL: "/",
    //     }, {
    //         onSuccess: () => {
    //             router.push("/");
    //         },
    //         onError: () => {
    //             toast.error("Something went wrong");
    //         },
    //     });
    // };

    const signInGithub = async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/workflows",
        });
    };
    const signInGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/workflows",

        }, {
            onError: () => {
                toast.error("Something went wrong");
            },
        });
    };
    const onSubmit = async (values: RegisterFormValues) => {
        await authClient.signUp.email(
            {
                name: values.email,
                email: values.email,
                password: values.password,
                callbackURL: "/workflows"
            },
            {
                onSuccess: () => {
                    toast.success("Account created successfully");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            }
        );
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Create an account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        disabled={isPending}
                                        className="w-full"
                                        onClick={signInGoogle}
                                        type="button"
                                    >
                                        <Image
                                            width={20}
                                            height={20}
                                            alt="Google Logo"
                                            src="/logos/google.svg"
                                        />
                                        Continue with Google
                                    </Button>

                                    <Button
                                        variant="outline"
                                        disabled={isPending}
                                        className="w-full"
                                        onClick={signInGithub}
                                        type="button"
                                    >
                                        <Image
                                            width={20}
                                            height={20}
                                            alt="GitHub Logo"
                                            src="/logos/github.svg"
                                        />
                                        Continue with GitHub
                                    </Button>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirm your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" disabled={isPending} className="w-full">
                                Sign Up
                            </Button>
                            <div className="text-sm text-center">
                                Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4">
                                    Log In
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
