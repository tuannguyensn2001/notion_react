import useCounterStore from "~/store/useCounterStore";
// import ToolTip from "./components/Tooltip/Tooltip";
function App() {
  const { counter, increase } = useCounterStore((state) => state);

  return (
    <div className={'tw-bg-red-500'}>
      <div>{counter}</div>
      <button onClick={increase} >increase</button>
    </div>
    // <ToolTip placement="right" title='promp text' color='#333'>
    //   <button
    //     style={{
    //       backgroundColor: "#fff",
    //       padding: "8px 16px",
    //       color: "#000",
    //       fontWeight: '600',
    //       borderRadius: "12px",
    //       border: '1px solid red',
    //     }}
    //   >
    //     Hover me
    //   </button>
    // </ToolTip>
  );
}

export default App;
