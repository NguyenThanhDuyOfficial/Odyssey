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
		"bg-[#cecdd2]",
		"bg-[#e9c5b7]",
		"bg-[#383838] text-background",
		"bg-[#f2e2da]",
		"bg-[#d5cac8]",
		"bg-[#94bcbc] text-background",
	];
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
			{data.map((post, index) => {
				const color = colors[index % colors.length];
				return (
					<div key={post.id} className="flex flex-col gap-4">
						<Link href={`/blog/${post.slug}`}>
							<div className="w-full aspect-square">
								{post.image ? (
									<Image
										src={post.image}
										alt="Image"
										fill
										className="object-cover rounded-lg"
									/>
								) : (
									<div
										className={`w-full h-full px-4 flex items-center justify-center ${color} rounded-lg`}
									>
										<p className="text-center">{post.title}</p>
									</div>
								)}
							</div>
						</Link>
						<Link href={`/blog/${post.slug}`}>
							<p className="text-center">{post.title}</p>
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
