import MDInput from "../MDInput/MDInput";
import "./MDPreviewer.css";

function MDPreviewer() {
  return (
    <div id="mdp-component">
      <div id="md-input" className="container">
        <MDInput outputElementId="md-preview" />
      </div>
      <div id="md-preview" className="container" />
    </div>
  );
}
export default MDPreviewer;
