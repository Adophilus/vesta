export function Hero() {
  return (
    <section className="h-screen grid grid-cols-2">
      <div />
      <div
        className="bg-cover bg-center flex flex-col"
        style={{
          backgroundImage: "url('/images/hero.jpg')"
        }}
      >
        <div className="grow bg-black/50" />
      </div>
    </section >
  )
}
