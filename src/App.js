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
        <div
          id="chatImage"
          style={{
            cursor: "pointer",
            background: "#ddbcbd",
            border: "2px solid #7c0101",
            padding: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#7c0101",
            borderRadius: "0.5rem",
          }}
        >
          Have questions? Click for live chat!
        </div>
      </div>
    </div>
  );
}

export default App;
