// ? Component
import Tooltip from "./components/Tooltip/Tooltip";

const buttonStyle = {
  padding: "8px 16px",
  borderRadius: "12px",
  color: "#fff",
  backgroundColor: "#333",
};
function App() {
  return (
    <Tooltip
      placement="right"
      title="promp text"
      color="#20b6d8"
      trigger="click"
    >
      <button style={buttonStyle}>Hover me</button>
      {/* <input type="text" name="" id="" placeholder="Hello" /> */}
    </Tooltip>
  );
}
export default App;