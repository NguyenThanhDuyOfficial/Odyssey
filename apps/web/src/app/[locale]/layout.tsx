import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import { routing } from "@/lib/i18n-routing";
import { geistMono, geistSans } from "../fonts";

export const metadata: Metadata = {
	title: "NguyenThanhDuy",
	description: "",
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children }: LayoutProps<"/[locale]">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<NextIntlClientProvider>
					<Header />
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
