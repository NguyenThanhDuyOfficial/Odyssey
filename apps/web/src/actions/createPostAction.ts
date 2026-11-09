"use server";

import { prisma } from "@nguyenthanhduyofficial/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { auth } from "@/lib/auth";
import { sanitizeHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/slugify";

export type CreatePostState = {
	success: boolean;
	errors?: { formErrors: string[]; fieldErrors: Record<string, string[]> };
	message?: string;
} | null;

const CreatePostSchema = z.object({
	title: z.string().min(5, "TITLE_MIN").max(120, "TITLE_MAX"),
	description: z.string().max(200, "DESCRIPTION_MAX").optional(),
	content: z.string().min(20, "CONTENT_MIN"),
	published: z.boolean().default(false),
});
export async function createPost(
	_prev: CreatePostState,
	formData: FormData,
): Promise<CreatePostState> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		return { success: false, message: "LOGIN_REQUIRED" };
	}

	const parsed = CreatePostSchema.safeParse({
		title: formData.get("title"),
		description: formData.get("description"),
		contennt: formData.get("content"),
		published: formData.get("published") === "on",
	});

	if (!parsed.success) {
		const flattened = z.flattenError(parsed.error);
		return {
			success: false,
			errors: {
				formErrors: flattened.formErrors,
				fieldErrors: flattened.fieldErrors,
			},
		};
	}

	const cleanContent = sanitizeHtml(parsed.data.content);
	const slug = await generateUniqueSlug(parsed.data.title);

	await prisma.posts.create({
		data: {
			title: parsed.data.title,
			slug,
			description: parsed.data.description ?? null,
			content: cleanContent,
			published: parsed.data.published,
			userId: session.user.id,
		},
	});

	revalidatePath("/blog");
	redirect(`/blog/${slug}`);
}

async function generateUniqueSlug(title: string): Promise<string> {
	const base = slugify(title);
	let slug = base;
	let i = 2;
	while (
		await prisma.posts.findUnique({ where: { slug }, select: { id: true } })
	) {
		slug = `${base}-${i++}`;
	}
	return slug;
}
