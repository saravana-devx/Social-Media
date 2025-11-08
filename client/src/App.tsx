import "./App.css";
import RouterProvider from "./providers/RouterProvider";

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
