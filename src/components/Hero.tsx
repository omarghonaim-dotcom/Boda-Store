import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section id="hero">
      <ScrollReveal>
        <div className="mt-30 flex justify-center items-center px-4">
          <img
            className="rounded-2xl max-w-full h-auto"
            src="/images/hero.png"
            alt=""
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
