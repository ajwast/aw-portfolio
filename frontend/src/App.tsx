import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router-dom";
import backgroundImg from "./assets/pinkbg.jpg";
function App() {
  return (
    <div className="max-w-screen m-auto flex flex-col min-h-screen">
      <Header />
      <main
        className="w-full grow bg-cover bg-center
                       flex flex-col items-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
