import { Skeleton } from "@nguyenthanhduyofficial/ui/components/skeleton";
import { Suspense } from "react";
import { getSession } from "@/lib/auth-session";
import LoginButtonClient from "./LoginButtonClient";

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

export function LoginButtonSkeleton() {
	return (
		<div>
			<Skeleton className="w-4 h-4 rounded-full" />
			<Skeleton className="w-62.5 h-4" />
		</div>
	);
}
