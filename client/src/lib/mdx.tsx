import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Blog } from '@/types/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from '@/components/MDXComponents';

const rootDirectory = path.join(process.cwd(), 'src', 'content');

export const getPostBySlug = async (id: string, type: string) => {
	id = id.replace(/\.mdx$/, '');
	const filePath = path.join(rootDirectory, type, `${id}.mdx`);
	const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

	// Extract frontmatter
	const { frontmatter } = await compileMDX<Blog>({
		source: fileContent,
		options: { parseFrontmatter: true }
	});

	// Remove frontmatter from fileContent
	const contentWithoutFrontmatter = fileContent.replace(/^---[\s\S]*?---/, '').trim();

	const meta: Blog = { ...frontmatter, id: id };

	// Create MdxRender component
	const MdxRender = () => (
		<MDXRemote source={contentWithoutFrontmatter} components={MDXComponents} />
	);

	return { meta, source: <MdxRender /> };
};

export const getAllPostsMeta = async (type: string) => {
	const files = fs.readdirSync(path.join(rootDirectory, type));

	const posts = await Promise.all(
		files.map(file => getPostBySlug(file, type).then(({ meta }) => meta))
	);

	return posts;
};