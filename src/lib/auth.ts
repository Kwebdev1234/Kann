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
  trustedOrigins: [
    "http://localhost:3000",
    "https://chaos-elude-kilowatt.ngrok-free.dev",
     "https://kann-workflows.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
 
},
account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"] // Add your providers
		}
	},
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
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
