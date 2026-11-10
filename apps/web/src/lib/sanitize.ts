import sanitizeHtmlLib, { type Attributes, type Tag } from "sanitize-html";

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

const ALLOWED_ATTR: Record<string, string[]> = {
	a: ["href", "target", "rel", "title"],
	img: ["src", "alt", "title"],
	"*": ["class"],
};

export function sanitizeHtml(html: string): string {
	return sanitizeHtmlLib(html, {
		allowedTags: ALLOWED_TAGS,
		allowedAttributes: ALLOWED_ATTR,
		allowedSchemes: ["http", "https", "mailto", "tel"],
		allowedSchemesByTag: {
			img: ["http", "https", "data"],
		},
		transformTags: {
			a: (tagName: string, attribs: Attributes): Tag => {
				const next: Attributes = { ...attribs };

				if (next.target === "_blank") {
					const rel = (next.rel ?? "").split(/\s+/).filter(Boolean);
					if (!rel.includes("noopener")) rel.push("noopener");
					if (!rel.includes("noreferrer")) rel.push("noreferrer");
					next.rel = rel.join(" ");
				}

				return { tagName, attribs: next };
			},
		},
		disallowedTagsMode: "discard",
		parser: {
			lowerCaseTags: true,
		},
	});
}
