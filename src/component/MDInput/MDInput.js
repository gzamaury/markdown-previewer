import { useState } from "react";
import PropTypes from "prop-types";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "./MDInput.css";
import RenderIn from "../RenderIn/RenderIn";

const markedOptions = {
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  headerIds: false,
  gfm: true,
  breaks: true,
};

marked.setOptions(markedOptions);

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
        defaultValue={textInput}
        onChange={(e) => setInsecureHtml(marked.parse(e.target.value))}
      />

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
Bold  | \`** **\` or \`__ __\` | **This is bold text**
Italic | \`* *\` or \`_ _\` | *This text is italicized*
Strikethrough | \`~~ ~~\` | ~~This was mistaken text~~
Bold and nested italic | \`** **\` and \`_ _\` | **This text is _extremely_ important**
All bold and italic | \`*** ***\` | ***All this text is important***
Subscript | \`<sub> </sub>\` | <sub>This is a subscript text</sub>
Superscript | \`<sup> </sup>\` | <sup>This is a superscript text</sup>

## Quoting text
Text that is not a quote
> Text that is a quote

## Quoting code
You can call out code or a command within a sentence with single backticks (\`\`\`\` \` \`\`\`\`), e.g. the \`console.log()\` method outputs a message to the web console.

To format code or text into its own distinct block, use triple backticks (\`\`\`\` \`\`\` \`\`\`\`).

\`\`\`js
// JS - destructuring assignment
let a, b;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20
\`\`\`

## Links
You can create an inline link by wrapping link text in brackets \`[ ]\`, and then wrapping the URL in parentheses \`( )\`.

These examples are based on [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

## Images
You can display an image by adding \`!\` and wrapping the alt text in \`[ ]\`. Then wrap the link for the image in parentheses \`()\`.

![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`;

MDInput.defaultProps = {
  textInput: textDefaultInput,
};

export default MDInput;
