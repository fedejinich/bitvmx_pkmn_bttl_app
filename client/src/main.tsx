import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Mount the app to the root element
createRoot(document.getElementById("root")!).render(<App />);
