import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "./deps/react.ts";
import { Editor } from "./editor.tsx";
import { CursorView } from "./types.ts";
import { selectedTextFromLines } from "./util.ts";

const className = "input";

type Props = {
  editor: Editor;
  cursorView: CursorView;
};

function getInputElement(): HTMLTextAreaElement | undefined {
  const e = document.getElementsByClassName(className);
  return e[0] instanceof HTMLTextAreaElement ? e[0] : void 0;
}

export function TextInput({ editor, cursorView }: Props): JSX.Element {
  const [isComposition, setComposition] = useState(false);

  const handleInput = () => {
    if (isComposition) {
      return;
    }
    const textarea = getInputElement();
    if (textarea == null) {
      throw Error("textarea == null");
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
          case "ArrowLeft":
            editor.moveCursor(false);
            break;
          case "ArrowRight":
            editor.moveCursor(true);
            break;
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
    const textarea = getInputElement();
    if (textarea != null && cursorView.left > 0) {
      setTimeout(() => textarea.focus(), 0);
    }
  }, [cursorView]);

  useEffect(() => {
    const textarea = getInputElement();
    if (textarea == null) {
      return;
    }
    const selection = editor.selection;
    if (selection.start.line !== -1) {
      const [, text] = selectedTextFromLines(editor.getLines(), selection);
      textarea.value = text;
      textarea.select();
    } else {
      textarea.value = "";
    }
  }, [editor.selection]);

  return (
    <textarea
      className={className}
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
