import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
