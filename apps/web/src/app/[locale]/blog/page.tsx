import { Badge } from "@nguyenthanhduyofficial/ui/components/badge";
import { Button } from "@nguyenthanhduyofficial/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { GetPostListSchema, getPostList } from "@/server/services/post.service";

type Props = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default function Blog({ searchParams }: Props) {
	const t = useTranslations("Blog");
	return (
		<main className="container mx-auto px-4">
			<div className="absolute inset-x-0 top-16 h-1/2 z-0">
				<Image src="/Blog/hero4.png" alt="hero" fill className="object-cover" />
				<div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
			</div>
			<section className="relative z-20 py-12 pt-16 flex">
				<div className="w-fit p-4 flex flex-col gap-4 items-start text-background">
					<div className="flex flex-col gap-2">
						<h3 className="drop-shadow-md">{t("title")}</h3>
						<p className="max-w-80">{t("description")}</p>
					</div>
					<Button
						nativeButton={false}
						render={<Link href="/blog/new">{t("newPost")}</Link>}
					/>
				</div>
			</section>
			<Suspense fallback={<BlogListSkeleton />}>
				<BlogListContent searchParams={searchParams} />
			</Suspense>
		</main>
	);
}

async function BlogListContent({ searchParams }: Props) {
	const raw = await searchParams;
	const parsed = GetPostListSchema.safeParse(raw);
	const { page, limit } = parsed.success ? parsed.data : { page: 1, limit: 20 };
	const { meta, data } = await getPostList({ page, limit });

	const colors = [
		{
			bg: "bg-[#cecdd2]",
			category: "text-white",
			badge: "bg-[#e1d1c9] text-text",
		},
	];
	const images = [
		"/Blog/1.jpg",
		"/Blog/2.jpg",
		"/Blog/3.jpg",
		"/Blog/4.jpg",
		"/Blog/5.jpg",
		"/Blog/6.jpg",
		"/Blog/7.jpg",
		"/Blog/8.jpg",
		"/Blog/9.jpg",
		"/Blog/10.jpg",
	];
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
			{data.map((post, index) => {
				const image = images[index % images.length] ?? "/Blog/1.jpg";
				return (
					<div key={post.id} className="flex flex-col gap-4">
						<Link href={`/blog/${post.slug}`}>
							<div className="relative w-full aspect-video">
								<Image
									src={post.image ? post.image : image}
									alt="Image"
									fill
									className="object-cover rounded-lg"
								/>
								)
							</div>
						</Link>
						<Link href={`/blog/${post.slug}`}>
							<p className="text-center px-2 line-clamp-2 font-medium">
								{post.title}
							</p>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

function BlogListSkeleton() {
	return <div>Đang tải...</div>;
}
