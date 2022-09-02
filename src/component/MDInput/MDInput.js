import { useState } from "react";
import PropTypes from "prop-types";
import { marked } from "marked";
import "./MDInput.css";
import RenderIn from "../RenderIn/RenderIn";

marked.setOptions({ headerIds: false, gfm: true, breaks: true });

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
        wrap="soft"
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

const textDefaultInput = `# Markdown Basic
## Writing and formatting syntax
### Headings:
- # Heading level 1
- ## Heading level 2
- ### Heading level 3
- #### Heading level 4
- ##### Heading level 5
- ###### Heading level 6

## Styling text
Style | Syntax | Example
----- | ------ | -------
Bold  | ** ** or __ __ | **This is bold text**
Italic | * * or _ _ | *This text is italicized*
Strikethrough | ~~ ~~ | ~~This was mistaken text~~
Bold and nested italic | ** ** and _ _ | **This text is _extremely_ important**
All bold and italic | *** *** | ***All this text is important***
Subscript | \`\`\`<sub> </sub>\`\`\` | <sub>This is a subscript text</sub>
Superscript | \`\`\`<sup> </sup>\`\`\` | <sup>This is a superscript text</sup>

## Quoting text
Text that is not a quote
> Text that is a quote

`;

MDInput.defaultProps = {
  textInput: textDefaultInput,
};

export default MDInput;
