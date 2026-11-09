import { Suspense } from "react";
import { getPostBySlug } from "@/server/services/post.service";

type Props = { params: Promise<{ slug: string }> };
export default function Blog({ params }: Props) {
	return (
		<Suspense fallback={<BlogSkeleton />}>
			<BlogContent params={params} />
		</Suspense>
	);
}
async function BlogContent({ params }: Props) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	if (!post) return <div>Có lỗi</div>;

	return (
		<main className="container mx-auto px-4">
			<article className="space-y-8">
				<h1>{post.title}</h1>
				<div
					className="prose prose-neutral dark:prose-invert max-w-none"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Content is clean
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</article>
		</main>
	);
}

function BlogSkeleton() {
	return <div>Đang tải</div>;
}
