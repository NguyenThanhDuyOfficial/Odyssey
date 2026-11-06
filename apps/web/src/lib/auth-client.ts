import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
});

export type InitialSession = typeof authClient.$Infer.Session | null;
