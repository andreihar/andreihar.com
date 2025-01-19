import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { BlogType, ProjectType } from '@/types/blog';

const rootDirectory = path.join(process.cwd(), 'src', 'content');
type PostResult<T> = T & { source: string; };
type PostType = 'project' | 'blog';
type InferPostType<T extends PostType> = T extends 'project' ? ProjectType : BlogType;

export const getPostBySlug = async <T extends PostType>(id: string, type: T): Promise<PostResult<InferPostType<T>>> => {
	id = id.replace(/\.mdx$/, '');
	const fileContent = fs.readFileSync(path.join(rootDirectory, type, `${id}.mdx`), { encoding: 'utf8' });

	const { frontmatter } = await compileMDX<InferPostType<T>>({
		source: fileContent,
		options: { parseFrontmatter: true }
	});

	let content = fileContent.replace(/^---[\s\S]*?---/, '').trim();
	const meta: InferPostType<T> = { ...frontmatter, id, published: new Date(frontmatter.published) } as InferPostType<T>;
	return { ...meta, source: content };
};

export const getAllPostsMeta = async <T extends PostType>(type: T): Promise<InferPostType<T>[]> => {
	const files = fs.readdirSync(path.join(rootDirectory, type));
	const posts = await Promise.all(
		files.map(file => getPostBySlug(file, type).then(({ source, ...meta }) => meta as unknown as InferPostType<T>))
	);
	posts.sort((a, b) => b.published.getTime() - a.published.getTime());
	return posts;
};