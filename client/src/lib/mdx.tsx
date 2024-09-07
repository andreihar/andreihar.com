import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Blog } from '@/types/blog';

const rootDirectory = path.join(process.cwd(), 'src', 'content');

export const getPostBySlug = async (id: string, type: string) => {
	id = id.replace(/\.mdx$/, '');
	const fileContent = fs.readFileSync(path.join(rootDirectory, type, `${id}.mdx`), { encoding: 'utf8' });

	const { frontmatter } = await compileMDX<Blog>({
		source: fileContent,
		options: { parseFrontmatter: true }
	});
	let content = fileContent.replace(/^---[\s\S]*?---/, '').trim();
	const meta: Blog = { ...frontmatter, id, published: new Date(frontmatter.published) };
	if (frontmatter.video) {
		content = `# Video Demo\n\n<YouTubeEmbed video="${frontmatter.video}" />\n\n${content}`;
	}
	return { meta, source: content };
};

export const getAllPostsMeta = async (type: string) => {
	const files = fs.readdirSync(path.join(rootDirectory, type));
	const posts = await Promise.all(
		files.map(file => getPostBySlug(file, type).then(({ meta }) => meta))
	);

	posts.sort((a, b) => b.published.getTime() - a.published.getTime());
	return posts;
};