import MDInput from "../MDInput/MDInput";
import "./MDPreviewer.css";

function MDPreviewer() {
  return (
    <div id="mdp-component">
      <div id="md-in-container">
        <MDInput outputElementId="md-out-container" />
      </div>
      <div id="md-out-container" />
    </div>
  );
}
export default MDPreviewer;
