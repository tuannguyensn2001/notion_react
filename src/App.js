import useCounterStore from "~/store/useCounterStore";

function App(){

  const {counter,increase} = useCounterStore(state => state);

  return(
      <div className={'tw-bg-red-500'}>
        <div>{counter}</div>
        <button onClick={increase} >increase</button>
      </div>
  )
}

export default App;