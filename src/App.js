import "./App.css";
import FlavorForm from "./FlavorForm";

function App() {
  return (
    <div className="overflow-y-auto h-[100vh] pb-3">
      <img src="/Top-banner-checkout-3.jpg" alt="bake-info" />
      <FlavorForm />
      <div
        style={{ margin: "-0.3rem 0.5rem", position: "relative", zIndex: 100 }}
      >
      </div>
    </div>
  );
}

export default App;
