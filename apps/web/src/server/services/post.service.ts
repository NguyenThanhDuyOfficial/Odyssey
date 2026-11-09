import { prisma } from "@nguyenthanhduyofficial/prisma";
import z from "zod";

export async function getPostBySlug(slug: string) {
	const post = await prisma.posts.findUnique({ where: { slug } });
	return post;
}

export const GetPostListSchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().max(100).default(20),
});
type GetPostList = z.infer<typeof GetPostListSchema>;

export async function getPostList({ page, limit }: GetPostList) {
	const skip = (page - 1) * limit;
	const [posts, totalItems] = await Promise.all([
		prisma.posts.findMany({
			skip,
			take: limit,
			orderBy: { createdAt: "desc" },
		}),
		prisma.posts.count(),
	]);
	return {
		meta: {
			page,
			totalPages: Math.ceil(totalItems / limit),
			limit,
			totalItems,
		},
		data: posts,
	};
}
