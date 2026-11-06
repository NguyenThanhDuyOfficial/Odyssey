import { Suspense } from "react";
import { getSession } from "@/lib/auth-session";
import LoginButtonClient, { LoginButtonSkeleton } from "./LoginButtonClient";

export default async function LoginnButton() {
	return (
		<Suspense fallback={<LoginButtonSkeleton />}>
			<LoginButtonContent />
		</Suspense>
	);
}

async function LoginButtonContent() {
	const data = await getSession();
	return <LoginButtonClient initialSession={data} />;
}
