import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Provider as ChakraUI } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraUI>
        <App />
      </ChakraUI>
    </BrowserRouter>
  </Provider>
);
