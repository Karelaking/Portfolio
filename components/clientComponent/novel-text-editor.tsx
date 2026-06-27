"use client";

import { EditorContent, EditorRoot, Placeholder, StarterKit } from "novel";
import type { ReactElement } from "react";
import { useRef } from "react";

export interface NovelTextEditorProps {
	initialValue?: string;
	onChange: (html: string) => void;
	placeholder?: string;
}

export const NovelTextEditor = ({
	initialValue,
	placeholder = "Write your post content...",
	onChange,
}: NovelTextEditorProps): ReactElement => {
	const hasInitializedRef = useRef<boolean>(false);

	return (
		<EditorRoot>
			<EditorContent
				className="min-h-64 rounded-2xl border border-border bg-background px-4 py-3 text-foreground text-sm"
				editorProps={{
					attributes: {
						class:
							"focus-visible:outline-none prose prose-sm dark:prose-invert max-w-none min-h-52",
					},
				}}
				extensions={[
					StarterKit,
					Placeholder.configure({
						placeholder,
					}),
				]}
				immediatelyRender={false}
				onCreate={({ editor }): void => {
					if (hasInitializedRef.current) {
						return;
					}

					hasInitializedRef.current = true;

					if (initialValue && initialValue.trim().length > 0) {
						editor.commands.setContent(initialValue, false);
					}
				}}
				onUpdate={({ editor }): void => {
					onChange(editor.getHTML());
				}}
			/>
		</EditorRoot>
	);
};
