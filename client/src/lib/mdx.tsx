import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Blog } from '@/types/blog';

const rootDirectory = path.join(process.cwd(), 'src', 'content');

export const getPostBySlug = async (id: string, type: string) => {
	id = id.replace(/\.mdx$/, '');
	const fileContent = fs.readFileSync(path.join(rootDirectory, type, `${id}.mdx`), { encoding: 'utf8' });

	const { frontmatter, content } = await compileMDX<Blog>({
		source: fileContent,
		options: { parseFrontmatter: true }
	});

	const meta: Blog = { ...frontmatter, id: id };

	return { meta, content };
};

export const getAllPostsMeta = async (type: string) => {
	const files = fs.readdirSync(path.join(rootDirectory, type));

	const posts = await Promise.all(
		files.map(file => getPostBySlug(file, type).then(({ meta }) => meta))
	);

	return posts;
};