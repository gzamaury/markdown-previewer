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

`;

MDInput.defaultProps = {
  textInput: textDefaultInput,
};

export default MDInput;
