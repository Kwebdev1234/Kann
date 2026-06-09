    import { betterAuth } from "better-auth";
    import { prismaAdapter } from "better-auth/adapters/prisma";
    import prisma from "./db";
    import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"; 
    import { Polar } from "@polar-sh/sdk"; 
    import {polarClient} from "./polar";
export const auth = betterAuth({
  database: prismaAdapter(prisma,{
    provider:"postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({ 
            client: polarClient, 
            createCustomerOnSignUp: true, 
            use: [ 
                checkout({ 
                    products: [ 
                        { 
                            productId: "4bb1b6b0-10a2-49f6-a123-dc1bb8581d7c", // ID of Product from Polar Dashboard
                            slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        } 
                    ], 
                    successUrl:process.env.POLAR_SUCCESS_URL, 
                    authenticatedUsersOnly: true
                }), 
                portal(), 
                usage(), 
               
            ], 
        }) 
    ]
});
