import { prisma } from "@nguyenthanhduyofficial/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	basePath: "/api/v1/auth",
	emailAndPassword: {
		enabled: true,
	},
});
