import MDInput from "../MDInput/MDInput";

function MDPreviewer() {
  return (
    <div>
      <div id="md-in-container">
        <MDInput outputElementId="md-out-container" />
      </div>
      <div
        id="md-out-container"
        style={{
          height: "50vh",
          overflow: "auto",
        }}
      />
    </div>
  );
}
export default MDPreviewer;
