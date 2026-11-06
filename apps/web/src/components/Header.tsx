import Link from "next/link";
import { useTranslations } from "next-intl";
import LoginButton from "./LoginButton";

export default function Header() {
	const t = useTranslations("Header");

	return (
		<header className="sticky inset-0 z-50 container mx-auto h-16">
			<div className="h-full px-4 flex items-center justify-between">
				{/* logo */}
				<div>
					<Link href="/">Odyssey</Link>
				</div>

				<div className="flex gap-4 items-center">
					<Link href="/wiki">Wiki</Link>
					<Link href="/blog">Blog</Link>
					<LoginButton />
				</div>
			</div>
		</header>
	);
}
