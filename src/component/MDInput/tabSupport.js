HTMLTextAreaElement.prototype.setCursorAt = function setCursorAt(position) {
  this.setSelectionRange(position, position);
  this.focus();
};

HTMLTextAreaElement.prototype.getRange = function getRange(start, end) {
  return this.value.substring(start, end);
};

HTMLTextAreaElement.prototype.replaceRangeWith = function replaceRangeWith(
  text,
  start,
  end
) {
  this.setRangeText(text, start, end, "preserve");
};

HTMLTextAreaElement.prototype.hasSelection = function hasSelection() {
  if (this.selectionStart === this.selectionEnd) {
    return false;
  }
  return true;
};

HTMLTextAreaElement.prototype.getSelection = function getSelection() {
  return this.value.substring(this.selectionStart, this.selectionEnd);
};

HTMLTextAreaElement.prototype.setSelection = function setSelection(start, end) {
  this.selectionStart = start;
  this.selectionEnd = end;
  this.focus();
};

HTMLTextAreaElement.prototype.insertTextAt = function insertTextAt(
  text,
  position
) {
  this.replaceRangeWith(text, position, position);
  this.setCursorAt(position + text.length);
};

HTMLTextAreaElement.prototype.removeTextAt = function removeTextAt(
  text,
  position,
  removeBefore = true
) {
  const start = removeBefore ? position - text.length : position;
  const end = removeBefore ? position : position - text.length;

  if (this.getRange(start, end) === text) {
    this.replaceRangeWith("", start, end);
  }
};

HTMLTextAreaElement.prototype.tab = "  ";

HTMLTextAreaElement.prototype.tabulateSelection = function tabulateSelection() {
  const tabbedSelection = this.getSelection()
    .split("\n")
    .map((s) => `${this.tab}${s}\n`)
    .join("")
    .slice(0, -1);

  this.replaceRangeWith(
    tabbedSelection,
    this.selectionStart,
    this.selectionEnd
  );
};

HTMLTextAreaElement.prototype.unTabulateSelection =
  function unTabulateSelection() {
    const unTabbedSelection = this.getSelection()
      .split("\n")
      .map((s) =>
        (s.startsWith(this.tab)
          ? s.substring(this.tab.length, s.length)
          : s
        ).concat("\n")
      )
      .join("")
      .slice(0, -1);

    this.replaceRangeWith(
      unTabbedSelection,
      this.selectionStart,
      this.selectionEnd
    );
  };

HTMLTextAreaElement.prototype.removeTextAtSelection =
  function removeTextAtSelection(text, removeBefore = true) {
    const start = removeBefore
      ? this.selectionStart - text.length
      : this.selectionEnd;
    const end = removeBefore
      ? this.selectionStart
      : this.selectionEnd + text.length;

    if (this.getRange(start, end) === text) {
      this.replaceRangeWith("", start, end);
    }
  };

export default function onkeydown(event) {
  const keyPressed = event.keyCode;
  const textarea = event.target;
  const { tab } = textarea;
  const cursorPosition = textarea.selectionStart;
  const shiftPressed = event.shiftKey;

  switch (keyPressed) {
    // tab
    case 9:
      if (textarea.hasSelection()) {
        // has selection and shift pressed
        if (shiftPressed) {
          textarea.unTabulateSelection();
          textarea.removeTextAtSelection(tab);
          // has selection and shift not pressed
        } else {
          textarea.tabulateSelection();
        }
      } else if (shiftPressed) {
        // has not selection and shift pressed
        textarea.removeTextAt(tab, cursorPosition);
      } else {
        // has not selection and shift not pressed
        textarea.insertTextAt(tab, cursorPosition);
      }
      event.preventDefault();
      break;

    // backspace
    case 8: {
      const start = cursorPosition - tab.length;
      const end = cursorPosition;

      if (textarea.getRange(start, end) === tab) {
        textarea.replaceRangeWith("", start, end);
        event.preventDefault();
      }
      break;
    }
    default:
  }
}
