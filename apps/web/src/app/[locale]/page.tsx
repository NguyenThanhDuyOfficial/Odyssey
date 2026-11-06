import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <main className="container mx-auto">
      <section className="flex flex-col items-center">
        <div className="relative w-80 aspect-square">
          <Image
            src="/hero.png"
            alt="hero"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center">
          <h1>{t.rich("title", { br: () => <br /> })}</h1>
          <p>{t("description")}</p>
        </div>
      </section>
    </main>
  );
}
