import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
	"p",
	"br",
	"strong",
	"em",
	"s",
	"u",
	"h1",
	"h2",
	"h3",
	"h4",
	"ul",
	"ol",
	"li",
	"blockquote",
	"code",
	"pre",
	"a",
	"img",
	"hr",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title", "class"];

export function sanitizeHtml(html: string): string {
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS,
		ALLOWED_ATTR,
		FORBID_ATTR: ["onerror", "onload", "onclick"],
	});
}
