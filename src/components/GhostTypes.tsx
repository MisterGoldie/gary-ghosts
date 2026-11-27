import Image from "next/image";

const ghostTypes = [
  {
    id: "artistic",
    name: "The Artistic Ghost",
    image: "/artistic.png",
    alt: "Blue Artistic Ghost holding a paintbrush and a palette",
    description:
      "A creative spirit with a paintbrush in one hand and a palette in the other. The Artistic Ghost is always looking for a new way to express itself.",
  },
  {
    id: "fighter",
    name: "The Fighter Ghost",
    image: "/fighter.png",
    alt: "Fighter Ghost wearing red boxing gloves",
    description:
      "With boxing gloves on and a grin that never quits, the Fighter Ghost brings determination to every challenge. Even when knocked down, it gets right back up.",
  },
  {
    id: "responsible",
    name: "The Responsible Ghost",
    image: "/responsible.png",
    alt: "Responsible Ghost with a small white ghost pet",
    description:
      "The Responsible Ghost looks after his ghost pet, making sure his little companion is safe, happy, and never left behind.",
  },
];

export function GhostTypes() {
  return (
    <section className="mt-16" aria-labelledby="ghost-types-heading">
      <h2 id="ghost-types-heading" className="font-display text-3xl font-semibold sm:text-4xl">
        What kind of ghost are you?
      </h2>
      <p className="mt-3 text-sm text-muted">Pick a ghost to learn more about it.</p>

      <div className="mt-8 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {ghostTypes.map((ghost) => (
          <details key={ghost.id} className="group min-w-0">
            <summary className="cursor-pointer list-none rounded-xl p-1 focus-visible:-outline-offset-4 [&::-webkit-details-marker]:hidden">
              <Image
                src={ghost.image}
                alt={ghost.alt}
                width={2000}
                height={2000}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 210px"
                className="aspect-square w-full object-contain mix-blend-multiply"
              />
              <span className="mt-3 flex min-h-12 items-center justify-center gap-2">
                <span className="font-display text-base font-semibold leading-snug sm:text-lg">{ghost.name}</span>
                <span aria-hidden="true" className="shrink-0 text-xl text-wisp transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">+</span>
              </span>
              <span className="mt-1 block text-center text-xs text-muted group-open:hidden">More information</span>
              <span className="mt-1 hidden text-center text-xs text-muted group-open:block">Hide details</span>
            </summary>
            <div className="mt-3 border-t border-hairline px-1 pb-2 pt-3 text-sm leading-relaxed text-muted">
              <p>{ghost.description}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
