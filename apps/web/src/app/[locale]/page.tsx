import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("Home");
	return (
		<main className="max-w-7xl mx-auto">
			<section>
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
				<div className="italic">
					<h1>{t("title")}</h1>
					<p>{t("description")}</p>
				</div>
			</section>
		</main>
	);
}
