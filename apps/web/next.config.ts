import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["192.168.1.19"],
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
			new URL("https://cdn.discordapp.com/avatars/**"),
		],
	},
	transpilePackages: ["@nguyenthanhduyofficial/ui"],
	cacheComponents: true,
	partialPrefetching: true,
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n-request.ts");
export default withNextIntl(nextConfig);
