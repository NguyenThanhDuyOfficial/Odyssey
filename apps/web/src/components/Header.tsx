import Link from "next/link";

export default function Header() {
	return (
		<header className="sticky inset-0 z-50 w-full h-16">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				{/* logo */}
				<div>
					<Link href="/">Odyssey</Link>
				</div>

				<div></div>

				<div></div>
			</div>
		</header>
	);
}
