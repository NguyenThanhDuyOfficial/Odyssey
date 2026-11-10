"use client";

import {
	Collapsible,
	CollapsibleContent,
} from "@nguyenthanhduyofficial/ui/components/collapsible";
import { Textarea } from "@nguyenthanhduyofficial/ui/components/textarea";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { IoIosMore, IoMdCode, IoMdRedo, IoMdUndo } from "react-icons/io";

interface RichTextEditorProps {
	value: string;
	onChange: (html: string) => void;
	placeholder?: string;
}

export function RichTextEditor({
	value,
	onChange,
	placeholder,
}: RichTextEditorProps) {
	const [isHtmlMode, setIsHtmlMode] = useState(false);
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			Link.configure({
				openOnClick: false,
				HTMLAttributes: { class: "text-primary underline cursor-pointer" },
			}),
			Placeholder.configure({
				placeholder: placeholder ?? "Bắt đầu viết nội dung...",
			}),
		],
		content: value,
		editorProps: {
			attributes: {
				class:
					"prose prose-sm sm:prose-base dark:prose-invert max-w-none min-h-[280px] focus:outline-none p-4",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value); // false = không trigger onUpdate
		}
	}, [value, editor]);

	const toggleHtmlMode = () => {
		if (editor && isHtmlMode) {
			editor.commands.setContent(value);
		}
		setIsHtmlMode((v) => !v);
	};

	if (!editor) {
		return <div className="min-h-70 animate-pulse rounded-md bg-muted" />;
	}

	return (
		<div className="rounded-md border border-input focus-within:ring-2 focus-within:ring-ring">
			<EditorToolbar
				editor={editor}
				isHtmlMode={isHtmlMode}
				onToggleHtmlMode={toggleHtmlMode}
			/>
			{isHtmlMode ? (
				<Textarea value={value} onChange={(e) => onChange(e.target.value)} />
			) : (
				<EditorContent editor={editor} />
			)}
		</div>
	);
}

function EditorToolbar({
	editor,
	isHtmlMode,
	onToggleHtmlMode,
}: {
	editor: Editor;
	isHtmlMode: boolean;
	onToggleHtmlMode: () => void;
}) {
	const [isMoreOpen, setIsMoreOpen] = useState(false);
	return (
		<div className="border-b border-input p-2">
			<div className="flex flex-wrap items-center gap-1 ">
				<ToolbarButton
					onClick={onToggleHtmlMode}
					isActive={isHtmlMode}
					label={isHtmlMode ? "Chuyển sang soạn thảo" : "Chuyển sang HTML"}
				>
					<IoMdCode />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().undo()}
					label="Undo"
				>
					<IoMdUndo />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().redo()}
					label="Redo"
				>
					<IoMdRedo />
				</ToolbarButton>
				<ToolbarButton onClick={() => setIsMoreOpen((v) => !v)} label="More">
					<IoIosMore />
				</ToolbarButton>
				{/* <div className="mx-1 h-6 w-px bg-border" /> */}
				{/* <ToolbarButton */}
				{/*   onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} */}
				{/*   isActive={editor.isActive("heading", { level: 2 })} */}
				{/*   label="Heading 2" */}
				{/* > */}
				{/*   H2 */}
				{/* </ToolbarButton> */}
				{/* <ToolbarButton */}
				{/*   onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} */}
				{/*   isActive={editor.isActive("heading", { level: 3 })} */}
				{/*   label="Heading 3" */}
				{/* > */}
				{/*   H3 */}
				{/* </ToolbarButton> */}
				{/* <div className="mx-1 h-6 w-px bg-border" /> */}
				{/* <ToolbarButton */}
				{/*   onClick={() => editor.chain().focus().toggleBulletList().run()} */}
				{/*   isActive={editor.isActive("bulletList")} */}
				{/*   label="Bullet List" */}
				{/* > */}
				{/*   • List */}
				{/* </ToolbarButton> */}
				{/* <ToolbarButton */}
				{/*   onClick={() => editor.chain().focus().toggleOrderedList().run()} */}
				{/*   isActive={editor.isActive("orderedList")} */}
				{/*   label="Ordered List" */}
				{/* > */}
				{/*   1. List */}
				{/* </ToolbarButton> */}
			</div>

			<Collapsible open={isMoreOpen}>
				<CollapsibleContent>
					<div className="flex flex-wrap items-center gap-1">
						<ToolbarButton
							onClick={() => editor.chain().focus().toggleBold().run()}
							isActive={editor.isActive("bold")}
							label="Bold"
						>
							<strong>B</strong>
						</ToolbarButton>
						<ToolbarButton
							onClick={() => editor.chain().focus().toggleItalic().run()}
							isActive={editor.isActive("italic")}
							label="Italic"
						>
							<em>I</em>
						</ToolbarButton>
						<ToolbarButton
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							isActive={editor.isActive("underline")}
							label="Underline"
						>
							<u>U</u>
						</ToolbarButton>
						<ToolbarButton
							onClick={() => editor.chain().focus().toggleStrike().run()}
							isActive={editor.isActive("strike")}
							label="Strike"
						>
							<s>S</s>
						</ToolbarButton>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

function ToolbarButton({
	onClick,
	isActive,
	disabled,
	label,
	children,
}: {
	onClick: () => void;
	isActive?: boolean;
	disabled?: boolean;
	label: string;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={label}
			aria-pressed={isActive}
			className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors disabled:opacity-40 ${
				isActive
					? "bg-primary/10 text-primary"
					: "text-muted-foreground hover:bg-muted hover:text-foreground"
			}`}
		>
			{children}
		</button>
	);
}
