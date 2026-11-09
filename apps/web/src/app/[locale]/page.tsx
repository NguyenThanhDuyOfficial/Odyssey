import { Button } from "@nguyenthanhduyofficial/ui/components/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaDiscord, FaFacebookMessenger } from "react-icons/fa";

export default function Home() {
	const t = useTranslations("Home");
	return (
		<main className="container mx-auto px-4">
			<section className="min-h-120 max-h-220 h-full flex flex-col lg:flex-row-reverse gap-8 lg:gap-32 items-center lg:justify-center">
				<div className="relative w-80 aspect-square">
					<Image
						src="/hero.png"
						alt="hero"
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
						priority
					/>
				</div>
				<div className="flex flex-col gap-8 items-center lg:items-start">
					<div className="flex flex-col gap-2 items-center lg:items-start">
						<h1>{t.rich("title", { br: () => <br /> })}</h1>
						<p className="mx-16 lg:mx-0 max-w-60 text-center text-muted-foreground lg:text-start">
							{t("description")}
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							nativeButton={false}
							render={
								<a
									href="https://discord.gg/SWYkNVdXd9"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaDiscord /> Discord
								</a>
							}
						/>
						<Button
							variant="secondary"
							nativeButton={false}
							render={
								<a
									href="https://m.me/j/AbZRpYMEu1kY0dKo/?send_source=gc%3Acopy_invite_link_t"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaFacebookMessenger /> Messenger
								</a>
							}
						></Button>
					</div>
				</div>
			</section>
		</main>
	);
}
