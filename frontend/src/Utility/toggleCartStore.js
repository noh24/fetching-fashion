import { createContext, useState } from "react";

const ToggleCartStore = createContext();

const ToggleCartStoreContext = (props) => {
  const [toggleCart, setToggleCart] = useState(false);

  const toggleCartStore = {
    toggleCart: [toggleCart, setToggleCart],
  };
  return (
    <ToggleCartStore.Provider value={toggleCartStore}>
      {props.children}
    </ToggleCartStore.Provider>
  );
};
export { ToggleCartStoreContext, ToggleCartStore };
