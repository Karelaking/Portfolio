export interface WritingRow {
	content: string;
	cover_image_alt: string;
	cover_image_src: string;
	created_at?: Date;
	id: string;
	order_index?: number;
	published_at: string;
	tags: string[];
	title: string;
	updated_at?: Date;
}
