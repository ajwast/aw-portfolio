import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./routes/home";
function App() {
  return (
    <div>
      <Header />
      <main className="bg-gray-900">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
