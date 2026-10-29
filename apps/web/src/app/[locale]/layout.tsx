import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { geistMono, geistSans } from "../fonts";

export const metadata: Metadata = {
	title: "NguyenThanhDuy",
	description: "",
};

export default function RootLayout({ children }: LayoutProps<"/[locale]">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<NextIntlClientProvider>{children}</NextIntlClientProvider>
			</body>
		</html>
	);
}
