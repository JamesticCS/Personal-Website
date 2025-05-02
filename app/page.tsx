export default function HomePage() {
  return (
    <section className="flex h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Jesse&nbsp;Hines
        </span>
      </h1>
      <p className="max-w-lg text-lg text-gray-400">
        Mathematics student at the University of Waterloo. I build software, explore math, and write about what I learn.
      </p>
    </section>
  )
}
