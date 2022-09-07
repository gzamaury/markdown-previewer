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
  this.setRangeText(text, start, end, "end");
};

export default function onkeydown(event, tab = "  ") {
  const keyPressed = event.keyCode;
  const textarea = event.target;
  const initialPosition = textarea.selectionStart;

  switch (keyPressed) {
    // tab
    case 9:
      textarea.replaceRangeWith(tab, initialPosition, initialPosition);
      event.preventDefault();
      break;

    // backspace
    case 8:
      if (
        textarea.getRange(initialPosition - tab.length, initialPosition) === tab
      ) {
        textarea.replaceRangeWith(
          "",
          initialPosition - tab.length,
          initialPosition
        );
        textarea.setCursorAt(initialPosition - tab.length);
        event.preventDefault();
      }
      break;

    // left arrow
    case 37:
      if (
        textarea.getRange(initialPosition - tab.length, initialPosition) === tab
      ) {
        textarea.setCursorAt(initialPosition - tab.length);
        event.preventDefault();
      }
      break;

    // right arrow
    case 39:
      if (
        textarea.getRange(initialPosition, initialPosition + tab.length) === tab
      ) {
        textarea.setCursorAt(initialPosition + tab.length);
        event.preventDefault();
      }
      break;
    default:
  }
}
