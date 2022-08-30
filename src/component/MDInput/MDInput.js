import { useState } from "react";
import PropTypes from "prop-types";
import { marked } from "marked";
import "./MDInput.css";
import RenderIn from "../RenderIn/RenderIn";

function MDInput({ outputElementId, textInput }) {
  const [insecureHtml, setInsecureHtml] = useState(marked.parse(textInput));
  return (
    <div id="mdi-component">
      <textarea
        id="editor"
        name="editor"
        data-testid="editor"
        autoComplete="off"
        autoCorrect="off"
        onChange={(e) => setInsecureHtml(marked.parse(e.target.value))}
      >
        {textInput}
      </textarea>

      <RenderIn elementId={outputElementId}>
        <div
          id="preview"
          data-testid="preview"
          dangerouslySetInnerHTML={{ __html: insecureHtml }}
        />
      </RenderIn>
    </div>
  );
}

MDInput.propTypes = {
  outputElementId: PropTypes.string.isRequired,
  textInput: PropTypes.string,
};

const textDefaultInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There are also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here...
And here. | Okay. | I think we get it.

- And of course, there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

MDInput.defaultProps = {
  textInput: textDefaultInput,
};

export default MDInput;
