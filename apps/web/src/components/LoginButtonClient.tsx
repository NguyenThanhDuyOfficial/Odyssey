"use client";

import { Button } from "@nguyenthanhduyofficial/ui/components/button";
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

	async function handleLogin() {
		await authClient.signIn.social({ provider: "discord" });
	}

	if (isPending && !currentSession)
		return <Button disabled={true}>{t("isPending")}</Button>;
	if (!currentSession)
		return (
			<Button variant="default" onClick={handleLogin}>
				{t("login")}
			</Button>
		);

	const image = currentSession.user.image;
	return (
		<Button>
			{image && (
				<Image
					src={image}
					alt={t("userAvatar")}
					width={24}
					height={24}
					className="w-4 h-4 rounded-full"
				/>
			)}
			<p>{currentSession.user.name}</p>
		</Button>
	);
}
