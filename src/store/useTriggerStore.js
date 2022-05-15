import create from "zustand";

const useTriggerStore = create((set) => ({
  trigger: "",
  handleTrigger: (inputTrigger) => {
    console.log(inputTrigger)
    set((state) => ({
      ...state,
      trigger: inputTrigger,
    }));
  },
}));

export default useTriggerStore;
