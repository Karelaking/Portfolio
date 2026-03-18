"use client";

import { EditorContent, EditorRoot, Placeholder, StarterKit } from "novel";
import type { ReactElement } from "react";
import { useRef } from "react";

export interface NovelTextEditorProps {
  initialValue?: string;
  placeholder?: string;
  onChange: (html: string) => void;
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
        className="border-border bg-background text-foreground min-h-64 rounded-2xl border px-4 py-3 text-sm"
        immediatelyRender={false}
        extensions={[
          StarterKit,
          Placeholder.configure({
            placeholder,
          }),
        ]}
        editorProps={{
          attributes: {
            class:
              "focus-visible:outline-none prose prose-sm dark:prose-invert max-w-none min-h-52",
          },
        }}
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
