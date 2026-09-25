import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section id="hero">
      <ScrollReveal>
        <div className="mt-30 flex justify-center items-center ">
          <img
            className="rounded-2xl"
            width={950}
            src="/public/images/hero.png"
            alt=""
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
