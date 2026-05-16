// src/app/page.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-green-400 mb-4">
              Available for opportunities
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Ahmad Ilham
            </h1>

            <h2 className="text-2xl text-zinc-300 mt-4">
               Aiming for WHV Pathways
            </h2>

            <p className="text-zinc-400 mt-6 leading-relaxed">
              Passionate about technology, healthcare pathways,
              and international career development.
              Currently building skills in software engineering,
              backend development, and global workforce readiness.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="https://linkedin.com"
                target="_blank"
                className="bg-white text-black px-5 py-3 rounded-2xl font-semibold hover:scale-105 transition"
              >
                LinkedIn
              </a>

              <a
                href="#projects"
                className="border border-zinc-700 px-5 py-3 rounded-2xl hover:bg-zinc-900 transition"
              >
                View Projects
              </a>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-5 mt-8 text-zinc-400 text-xl">
              <a href="#">GitHub</a>
              <a href="#">LinkedIn</a>
              <a href="#">Email</a>
            </div>
          </div>

<div className="flex justify-center">
  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-1">
    
    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
      <img
        src="/foto.jpg"
        alt="Ahmad Ilham"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-4">
              Career Vision
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              I aim to build an international career pathway
              through technology, healthcare, and mining support industries,
              especially in Australia through WHV and long-term skilled migration pathways.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-4">
              Hallew
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>• Backend Development</li>
              <li>• English & IELTS Preparation</li>
              <li>• Healthcare Pathway Research</li>
              <li>• International Career Preparation</li>
            </ul>
          </div>

        </div>
      </section>

      {/* SKILLS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10">
          Skills
        </h2>

        <div className="flex flex-wrap gap-4">
          {[
            "Next.js",
            "React",
            "Tailwind CSS",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "Communication",
            "Problem Solving",
          ].map((skill) => (
            <div
              key={skill}
              className="px-5 py-3 bg-zinc-900 rounded-2xl border border-zinc-800"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold mb-10">
          Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-3">
              IoT Pest Repellent
            </h3>

            <p className="text-zinc-400">
              Smart ultrasonic pest repellent using IoT,
              solar panel, strobe LED, and predator sound.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-3">
              WHV Career Planning
            </h3>

            <p className="text-zinc-400">
              Structured roadmap for Australia WHV,
              certifications, IELTS, and skilled migration pathway.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-3">
              Fullstack Learning Journey
            </h3>

            <p className="text-zinc-400">
              Personal learning roadmap for becoming
              a fullstack developer and backend engineer.
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-12 text-black">

          <h2 className="text-5xl font-bold">
            Let's Work Together
          </h2>

          <p className="mt-4 text-lg">
            Open for collaboration, networking,
            and international opportunities.
          </p>

          <button className="mt-8 bg-black text-white px-6 py-4 rounded-2xl">
            Contact Me
          </button>

        </div>
      </section>

    </main>
  );
}