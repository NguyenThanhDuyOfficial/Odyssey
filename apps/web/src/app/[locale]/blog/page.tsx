import { Button } from "@nguyenthanhduyofficial/ui/components/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Blog() {
	const t = useTranslations("Blog");
	return (
		<main className="container mx-auto px-4">
			<section className="my-8 flex flex-col gap-4 items-center">
				<div className="flex flex-col gap-2 items-center">
					<h3>{t("title")}</h3>
					<p className="text-center max-w-80">{t("description")}</p>
				</div>
				<Button
					nativeButton={false}
					render={<Link href="/blog/new">{t("newPost")}</Link>}
				/>
			</section>
		</main>
	);
}
