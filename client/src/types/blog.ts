export type BaseMDX = {
	id: string;
	title: string;
	description: string;
	published: Date;
	video?: string;
};

export type BlogType = BaseMDX & {
	time: number;
	tags: string[];
};

export type ProjectType = BaseMDX & {
	team: number;
	builtW: string[];
	github: string;
	website?: string;
};