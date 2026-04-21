export function Header() {
  return (
    <header className="p-6 text-blue-50 bg-cyan-950 flex justify-between align-bottom">
      <div className="text-4xl font-semibold tracking-wider">
        Alex Wastnidge
      </div>
      <nav className="flex gap-3">
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Blog</a>
        <a href="">Experience</a>
        <a href="">Skills</a>
      </nav>
    </header>
  );
}
