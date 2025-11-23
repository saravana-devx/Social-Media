import "./App.css";
import { RouterProvider } from "./providers";

function App() {
  return (
    <>
      <div className="bg-background w-screen h-screen overflow-x-hidden">
        <RouterProvider />
      </div>
    </>
  );
}

export default App;
