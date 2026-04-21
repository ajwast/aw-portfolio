import profileImage from "../assets/profile.jpg";

export function Hero() {
  return (
    <div className="flex flex-col flex-wrap bg-cyan-950 text-blue-50 shadow-lg m-auto mt-3 justify-center max-w-200 border rounded">
      <h1 className="font-bold text-4xl p-2 m-auto">Alex Wastnidge</h1>
      <img
        src={profileImage}
        alt=""
        className="rounded-full max-h-50 max-w-50 p-2 m-auto mb-2"
      />
      <p className="border-b m-auto font-bold">
        Creative Technologist · Music · AI · Web Development
      </p>

      <p className="m-auto p-2">
        I design and build experimental tools that blend sound, code, and human
        creativity.
      </p>
    </div>
  );
}
