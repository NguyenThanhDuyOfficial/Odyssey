"use client";

import { Button } from "@nguyenthanhduyofficial/ui/components/button";
import { Skeleton } from "@nguyenthanhduyofficial/ui/components/skeleton";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { authClient, type InitialSession } from "@/lib/auth-client";

export default function LoginButtonClient({
	initialSession,
}: {
	initialSession: InitialSession;
}) {
	const t = useTranslations("Header");
	const { data: session, isPending } = authClient.useSession();
	const currentSession = session ?? initialSession;

	if (isPending && !currentSession)
		return <Button disabled={true}>{t("isPending")}</Button>;
	if (!currentSession) return <Button variant="default">{t("login")}</Button>;

	const image = currentSession.user.image;
	return (
		<Button>
			{image && (
				<Image
					src={image}
					alt={t("userAvatar")}
					className="w-4 h-4 rounded-full"
				/>
			)}
			<p>{currentSession.user.name}</p>
		</Button>
	);
}

export function LoginButtonSkeleton() {
	return (
		<div>
			<Skeleton className="w-4 h-4 rounded-full" />
			<Skeleton className="w-[250px] h-4" />
		</div>
	);
}
