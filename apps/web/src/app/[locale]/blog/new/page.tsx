import { Suspense } from "react";
import CreatePostForm from "@/components/CreatePostForm";

export default function New() {
	return (
		<main className="container mx-auto">
			<Suspense fallback={<NewSkeleton />}>
				<CreatePostForm />
			</Suspense>
		</main>
	);
}

export function NewSkeleton() {
	return <div>Đang tải...</div>;
}
