export interface WritingRow {
  id: string;
  title: string;
  cover_image_src: string;
  cover_image_alt: string;
  content: string;
  tags: string[];
  published_at: string;
  order_index?: number;
  created_at?: Date;
  updated_at?: Date;
}
