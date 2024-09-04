import React from 'react';

const MDXComponents = {
	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className="text-4xl font-bold my-4" {...props} />
	),
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="text-base my-2" {...props} />
	),
};

export default MDXComponents;