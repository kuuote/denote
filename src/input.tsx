import React, { useCallback, useLayoutEffect, useState } from "./deps/react.ts";
import { Editor } from "./editor.tsx";
import { CursorView } from "./types.ts";

type Props = {
  editor: Editor;
  cursorView: CursorView;
};

export function TextInput({ editor, cursorView }: Props): JSX.Element {
  const [isComposition, setComposition] = useState(false);

  const handleInput = () => {
    if (isComposition) {
      return;
    }
    const textarea = document.getElementsByClassName("input")?.[0];
    if (!(textarea instanceof HTMLTextAreaElement)) {
      throw Error("!(textarea instanceof HTMLTextAreaElement)");
    }
    editor.input(textarea.value);
    textarea.value = "";
  };

  const handleCompositionStart = useCallback(() => {
    setComposition(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setComposition(false);
    handleInput();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      let prevent = true;
      if (e.ctrlKey) {
        switch (e.key) {
          default:
            prevent = false;
        }
      } else if (e.altKey) {
        switch (e.key) {
          default:
            prevent = false;
        }
      } else {
        switch (e.key) {
          case "Backspace":
            editor.backSpace();
            break;
          default:
            prevent = false;
        }
      }
      if (prevent) {
        e.preventDefault();
      }
    },
    [],
  );

  useLayoutEffect(() => {
    const textarea = document.getElementsByTagName("textarea")[0];
    if (textarea && cursorView.left > 0) {
      setTimeout(() => textarea.focus(), 0);
    }
  }, [cursorView]);
  return (
    <textarea
      className="input"
      style={{
        position: "absolute",
        left: cursorView.left,
        top: cursorView.top,
        width: isComposition ? "auto" : 1,
        height: cursorView.height,
        lineHeight: cursorView.height,
        opacity: isComposition ? 1 : 0,
      }}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      spellCheck="false"
      wrap="off"
    >
    </textarea>
  );
}
