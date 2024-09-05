export type Blog = {
	id: string;
	title: string;
	description: string;
	published: Date;
	time?: number;
	tags?: string[];
	team?: number;
	builtW?: string[];
	github?: string;
	website?: string;
	video?: string;
};