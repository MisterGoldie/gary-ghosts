"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      "With boxing gloves on and a heart that never quits, the Fighter Ghost brings determination to every challenge. Even when knocked down, it gets right back up.",
  },
  {
    id: "responsible",
    name: "The Responsible Ghost",
    image: "/responsible.png",
    alt: "Responsible Ghost with a small white ghost pet",
    description:
      "The Responsible Ghost looks after his ghost pet, making sure his little companion is safe, happy, and never left behind.",
  },
  {
    id: "standard",
    name: "The Standard Ghost",
    image: "/standard.png",
    alt: "Orange Standard Ghost with a simple smile and a patched sheet",
    description:
      "A pretty average ghost. The Standard Ghost keeps things simple and takes each day as it comes.",
  },
  {
    id: "childish",
    name: "The Childish Ghost",
    image: "/childish-ghost.png",
    alt: "Hooded Childish Ghost holding a green trick-or-treat bucket",
    description:
      "The youngest ghost in the group, the Childish Ghost is a kid who just likes to have fun. Every day is a chance to play and find a new adventure.",
  },
];

type GhostType = (typeof ghostTypes)[number];

export function GhostTypes() {
  const [selected, setSelected] = useState<GhostType | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    const source = triggerRef.current?.getBoundingClientRect();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    let animation: Animation | undefined;
    if (source && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && typeof dialog.animate === "function") {
      const target = dialog.getBoundingClientRect();
      const x = source.left + source.width / 2 - target.left - target.width / 2;
      const y = source.top + source.height / 2 - target.top - target.height / 2;
      const scale = Math.min(source.width / target.width, source.height / target.height);
      animation = dialog.animate([
        { transform: "translate(" + x + "px, " + y + "px) scale(" + scale + ")", opacity: 0.4 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
      ], { duration: 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
    }

    return () => {
      animation?.cancel();
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [selected]);

  return (
    <section className="mt-16" aria-labelledby="ghost-types-heading">
      <h2 id="ghost-types-heading" className="font-display text-3xl font-semibold sm:text-4xl">
        What kind of ghost are you?
      </h2>
      <p className="mt-3 text-sm text-muted">Pick a ghost to learn more about it.</p>

      <div className="mt-8 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {ghostTypes.map((ghost) => (
          <button
            key={ghost.id}
            type="button"
            aria-haspopup="dialog"
            aria-controls="ghost-detail-dialog"
            onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(ghost); }}
            className="group panel min-w-0 cursor-pointer overflow-hidden p-1 text-center text-bone transition-colors hover:border-wisp/50 focus-visible:-outline-offset-4"
          >
            <Image
              src={ghost.image}
              alt={ghost.alt}
              width={2000}
              height={2000}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 210px"
              className="aspect-square w-full object-contain mix-blend-multiply"
            />
            <span className="relative mt-3 flex min-h-12 items-center justify-center px-5">
              <span className="w-full text-center font-display text-base font-semibold leading-snug sm:text-lg">{ghost.name}</span>
              <span aria-hidden="true" className="absolute right-1 top-1/2 -translate-y-1/2 text-xl text-wisp">+</span>
            </span>
            <span className="mt-1 block text-center text-xs text-muted">More information</span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        id="ghost-detail-dialog"
        aria-labelledby="ghost-detail-name"
        aria-describedby="ghost-detail-description"
        className="panel fixed inset-0 m-auto h-fit max-h-[90dvh] w-[92vw] max-w-3xl overflow-y-auto p-0 text-bone backdrop:bg-black/45 backdrop:backdrop-blur-sm"
        onClose={() => {
          setSelected(null);
          if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
        }}
      >
        {selected && (
          <div className="relative p-5 pt-16 sm:p-8 sm:pt-16">
            <button type="button" autoFocus onClick={() => dialogRef.current?.close()} className="btn btn-outline absolute right-4 top-4 min-h-11 !px-4 !py-2">
              Close
            </button>
            <div className="grid items-center gap-5 sm:grid-cols-[1.15fr_1fr] sm:gap-8">
              <Image
                src={selected.image}
                alt={selected.alt}
                loading="eager"
                width={2000}
                height={2000}
                sizes="(max-width: 640px) 90vw, 420px"
                className="mx-auto aspect-square max-h-[45dvh] w-full object-contain mix-blend-multiply sm:max-h-[65dvh]"
              />
              <div className="text-center">
                <h3 id="ghost-detail-name" className="font-display text-3xl font-semibold sm:text-4xl">{selected.name}</h3>
                <p id="ghost-detail-description" className="mt-4 text-base leading-relaxed text-muted">{selected.description}</p>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
