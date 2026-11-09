"use client";

import { Button } from "@nguyenthanhduyofficial/ui/components/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldSet,
} from "@nguyenthanhduyofficial/ui/components/field";
import { Input } from "@nguyenthanhduyofficial/ui/components/input";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { type CreatePostState, createPost } from "@/actions/createPostAction";
import { RichTextEditor } from "./RichTextEditor";

export default function CreatePostForm() {
	const t = useTranslations("Blog");
	const [state, formAction, isPending] = useActionState<
		CreatePostState,
		FormData
	>(createPost, null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const fieldErrors = state?.errors?.fieldErrors;
	const formErrors = state?.errors?.formErrors;
	return (
		<form className="px-4" action={formAction}>
			<FieldSet>
				<FieldGroup>
					<div className="flex gap-4">
						<Field data-invalid={!!fieldErrors?.title}>
							<Input
								id="title"
								name="title"
								type="text"
								placeholder={t("titlePlaceholder")}
								aria-invalid={!!fieldErrors?.title}
								className="text-2xl font-medium border-none"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							{fieldErrors?.title && (
								<FieldError id="title--error">
									{fieldErrors.title[0]}
								</FieldError>
							)}
						</Field>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Đang tạo..." : "Tạo bài viết"}
						</Button>
					</div>

					{/* Description */}
					{/* <Field data-invalid={!!fieldErrors?.description}> */}
					{/*   <Textarea */}
					{/*     id="description" */}
					{/*     name="description" */}
					{/*     rows={1} */}
					{/*     maxLength={200} */}
					{/*     placeholder={t("descriptionPlaceholder")} */}
					{/*     className="border-none" */}
					{/*     aria-invalid={!!fieldErrors?.description} */}
					{/*   /> */}
					{/*   {fieldErrors?.description && ( */}
					{/*     <FieldError>{fieldErrors.description[0]}</FieldError> */}
					{/*   )} */}
					{/* </Field> */}

					<Field data-invalid={!!fieldErrors?.content}>
						<FieldContent>
							<RichTextEditor
								value={content}
								onChange={setContent}
								placeholder="Bắt đầu viết..."
							/>
							<input type="hidden" name="content" value={content} />
						</FieldContent>
						{fieldErrors?.content && (
							<FieldError>{fieldErrors.content[0]}</FieldError>
						)}
					</Field>

					{(formErrors?.length ?? 0) > 0 && (
						<FieldError className="rounded-md bg-destructive/10 px-3 py-2">
							{formErrors?.[0]}
						</FieldError>
					)}
					{state?.message && (
						<FieldError className="rounded-md bg-destructive/10 px-3 py-2">
							{state.message}
						</FieldError>
					)}
				</FieldGroup>
			</FieldSet>
		</form>
	);
}
