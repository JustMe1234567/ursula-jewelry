"use client";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight } from "@phosphor-icons/react/dist/icons/ArrowRight";
import { Bag } from "@phosphor-icons/react/dist/icons/Bag";
import { CaretLeft } from "@phosphor-icons/react/dist/icons/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/icons/CaretRight";
import { Heart } from "@phosphor-icons/react/dist/icons/Heart";
import { List } from "@phosphor-icons/react/dist/icons/List";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/icons/MagnifyingGlass";
import { Plus } from "@phosphor-icons/react/dist/icons/Plus";
import { UserCircle } from "@phosphor-icons/react/dist/icons/UserCircle";
import { X } from "@phosphor-icons/react/dist/icons/X";

const products = [
  {
    name: "Imprint Signet",
    material: "Recycled silver · moonstone",
    price: 14800,
    kind: "Rings",
    tone: "silver",
    image: "/products/gallery/imprint-signet-1.webp",
    gallery: [
      "/products/gallery/imprint-signet-1.webp",
      "/products/gallery/imprint-signet-2.webp",
      "/products/gallery/imprint-signet-3.webp",
      "/products/gallery/imprint-signet-4.webp",
    ],
    badge: "New",
    description:
      "A substantial hand-carved signet with a pale oval moonstone and layered silver shoulders, polished to preserve the maker’s marks.",
    sizes: ["5", "6", "7", "8"],
  },
  {
    name: "Fold Hoops",
    material: "18k gold vermeil",
    price: 16200,
    kind: "Earrings",
    tone: "gold",
    image: "/products/gallery/fold-hoops-1.webp",
    gallery: [
      "/products/gallery/fold-hoops-1.webp",
      "/products/gallery/fold-hoops-2.webp",
      "/products/gallery/fold-hoops-3.webp",
      "/products/gallery/fold-hoops-4.webp",
    ],
    badge: "Bestseller",
    description:
      "Interlaced open-frame hoops with an angular silhouette, mirror-polished edges, and a compact scale that stays comfortable all day.",
    sizes: ["One size"],
  },
  {
    name: "Mineral Pendant",
    material: "Gold vermeil · lab-grown spinel",
    price: 21900,
    kind: "Necklaces",
    tone: "gold",
    image: "/products/gallery/mineral-pendant-1.webp",
    gallery: [
      "/products/gallery/mineral-pendant-1.webp",
      "/products/gallery/mineral-pendant-2.webp",
      "/products/gallery/mineral-pendant-3.webp",
      "/products/gallery/mineral-pendant-4.webp",
    ],
    badge: "New",
    description:
      "A deep teal faceted spinel in a clean geometric bezel, suspended from a fine adjustable chain that sits just below the collarbone.",
    sizes: ["40–45 cm"],
  },
  {
    name: "Archive Cuff",
    material: "Oxidized recycled silver · 14k gold",
    price: 24600,
    kind: "Bracelets",
    tone: "silver",
    image: "/products/gallery/archive-cuff-1.webp",
    gallery: [
      "/products/gallery/archive-cuff-1.webp",
      "/products/gallery/archive-cuff-2.webp",
      "/products/gallery/archive-cuff-3.webp",
      "/products/gallery/archive-cuff-4.webp",
    ],
    badge: "Limited",
    description:
      "A hinged slim cuff engraved with a repeating leaf pattern, darkened by hand and punctuated with a single solid-gold stud.",
    sizes: ["S/M", "M/L"],
  },
  {
    name: "Trace Ring",
    material: "Recycled silver · lab-grown diamond",
    price: 16800,
    kind: "Rings",
    tone: "silver",
    image: "/products/gallery/trace-ring-1.webp",
    gallery: [
      "/products/gallery/trace-ring-1.webp",
      "/products/gallery/trace-ring-2.webp",
      "/products/gallery/trace-ring-3.webp",
      "/products/gallery/trace-ring-4.webp",
    ],
    badge: "Ursula signature",
    description:
      "A fine, softly textured silver band with a low bezel-set diamond—quiet alone and deliberately easy to stack.",
    sizes: ["5", "6", "7", "8"],
  },
  {
    name: "Nocturne Pendant",
    material: "Oxidized recycled silver · black spinel",
    price: 28500,
    kind: "Necklaces",
    tone: "silver",
    image: "/products/gallery/nocturne-pendant-1.webp",
    gallery: [
      "/products/gallery/nocturne-pendant-1.webp",
      "/products/gallery/nocturne-pendant-2.webp",
      "/products/gallery/nocturne-pendant-3.webp",
      "/products/gallery/nocturne-pendant-4.webp",
    ],
    badge: "Limited",
    description:
      "A four-lobed oxidized-silver pendant paved with black spinel, finished with beaded edges that catch a restrained glint of light.",
    sizes: ["45–50 cm"],
  },
  {
    name: "Aventurine Line",
    material: "Recycled silver · green aventurine",
    price: 18200,
    kind: "Bracelets",
    tone: "silver",
    image: "/products/gallery/aventurine-line-1.webp",
    gallery: [
      "/products/gallery/aventurine-line-1.webp",
      "/products/gallery/aventurine-line-2.webp",
      "/products/gallery/aventurine-line-3.webp",
      "/products/gallery/aventurine-line-4.webp",
    ],
    badge: "Ursula signature",
    description:
      "Faceted silver beads frame three hand-selected aventurine discs, with an adjustable lobster clasp for a close, fluid fit.",
    sizes: ["16 cm", "18 cm", "20 cm"],
  },
  {
    name: "Soft Current Chain",
    material: "18k gold vermeil",
    price: 23800,
    kind: "Necklaces",
    tone: "gold",
    image: "/products/gallery/soft-current-chain-1.webp",
    gallery: [
      "/products/gallery/soft-current-chain-1.webp",
      "/products/gallery/soft-current-chain-2.webp",
      "/products/gallery/soft-current-chain-3.webp",
      "/products/gallery/soft-current-chain-4.webp",
    ],
    badge: "Bestseller",
    description:
      "A whisper-fine gold-vermeil cable chain with a spring-ring clasp, designed to wear bare or carry a small pendant.",
    sizes: ["42 cm", "48 cm"],
  },
];
const peso = (n: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(n);
type Product = (typeof products)[number];

const productProfiles: Record<
  string,
  { wear: string; dimensions: string; construction: string; care: string }
> = {
  "Imprint Signet": {
    wear: "Its low, softly rounded profile makes a statement without catching on sleeves. Wear it alone on the index finger or anchor a mixed ring stack.",
    dimensions: "Face: 18 × 15 mm · Band: 5–8 mm · Approx. 12.6 g",
    construction:
      "Recycled 925 sterling silver with a natural moonstone in a hand-shaped bezel. Stone pattern and blue flash vary naturally.",
    care: "Moonstone is softer than quartz. Remove before exercise, bathing, or impact, then store separately in the supplied pouch.",
  },
  "Fold Hoops": {
    wear: "The folded face catches light from several angles while the rounded inner edge stays comfortable for long days. Their compact scale works from office hours into evening.",
    dimensions: "Drop: 24 mm · Width: 11 mm · Approx. 7.2 g per pair",
    construction:
      "Recycled sterling-silver core with nickel-free posts and 18k gold vermeil at a minimum thickness of 2.5 microns.",
    care: "Put on after perfume and lotion. Wipe dry after wear and avoid swimming to preserve the vermeil surface.",
  },
  "Mineral Pendant": {
    wear: "The adjustable chain places the stone at the collarbone or slightly lower, leaving enough space to layer a finer chain above it.",
    dimensions: "Pendant: 31 × 20 mm · Adjustable chain: 45–50 cm",
    construction:
      "Faceted lab-grown green spinel in an open-back setting, finished in 18k gold vermeil over recycled sterling silver.",
    care: "Clean with lukewarm water and a soft cloth only. Avoid ultrasonic cleaning, fragrance, and prolonged moisture.",
  },
  "Archive Cuff": {
    wear: "The narrow hinged profile sits close to the wrist and stacks cleanly beside a watch. The concealed clasp keeps the engraved pattern uninterrupted.",
    dimensions:
      "Inner circumference: 16.5 or 18 cm · Width: 7 mm · Approx. 22 g",
    construction:
      "Solid recycled 925 sterling silver with hand-engraved leaf work, an oxidized patina, a box clasp, and one flush-set 14k gold stud.",
    care: "The dark finish is intentional and evolves with contact. Do not use silver dip; Ursula can refresh the patina when needed.",
  },
  "Trace Ring": {
    wear: "A practical low setting keeps the diamond close to the hand. The 1.7 mm band pairs easily with a wedding band or wider signet.",
    dimensions: "Band: 1.7 mm · Diamond: 0.12 ct equivalent",
    construction:
      "Solid recycled 925 sterling silver with a softly textured surface and a round brilliant lab-grown diamond in a protective low bezel.",
    care: "Remove for heavy lifting and chlorine. If worn daily, have the setting professionally checked once a year.",
  },
  "Fracture Earrings": {
    wear: "Two articulated planes create movement without excessive weight. The asymmetric angle changes subtly between profile and front view.",
    dimensions: "Drop: 43 mm · Widest point: 16 mm · Approx. 8.5 g per pair",
    construction:
      "Hollow recycled-silver forms, nickel-free posts, and satin 18k gold vermeil with polished edges.",
    care: "Store flat in separate pouches. Avoid bending the articulated joins and keep away from saltwater and perfume.",
  },
  "Nocturne Pendant": {
    wear: "Nearly black indoors and charcoal in direct light, the stone gives a dark focal point to open collars, black tailoring, and simple tees.",
    dimensions: "Pendant: 27 × 18 mm · Chain: 50 cm",
    construction:
      "Lab-grown black spinel in recycled 925 silver with a four-prong mount, oxidized recesses, and an Ursula-tagged lobster clasp.",
    care: "Wipe after wear and avoid abrasive cloths, chlorine, or chemical silver dips that may remove the dark detailing.",
  },
  "Aventurine Line": {
    wear: "Sized to sit close to the wrist, the natural shifts from moss to translucent green make it an easy color layer beside silver or a watch.",
    dimensions: "Beads: 7–8 mm · Length: 18 cm plus 2 cm extender",
    construction:
      "Natural green aventurine beads on reinforced jewelry wire with recycled sterling-silver findings.",
    care: "Keep the stones dry and roll the bracelet over the hand rather than pulling the strand sharply.",
  },
  "Tidal Band": {
    wear: "A subtle rise travels around the band, giving a simple everyday ring a changing silhouette. Comfortable alone or beside a straight band.",
    dimensions: "Band: 4–7 mm · Approx. 8.4 g",
    construction:
      "Cast in solid recycled 925 sterling silver, then shaped and polished individually by hand.",
    care: "Use a soft silver cloth for light tarnish. Remove before chlorine, household cleaning, and abrasive work.",
  },
  "Still Life Ring": {
    wear: "The off-center pearl creates a deliberate imbalance while the low setting keeps the ring wearable. Best worn with space around it.",
    dimensions: "Pearl: 7–8 mm · Band: 3 mm",
    construction:
      "Freshwater cultured pearl on a recycled-silver band finished with 18k gold vermeil. Pearl shape and luster vary slightly.",
    care: "Pearls should be the last thing on and first thing off. Keep away from perfume, water, cosmetics, and ultrasonic cleaners.",
  },
  "Contour Drops": {
    wear: "The continuous line moves freely below the ear but remains light enough for extended wear. A clean choice with open necklines.",
    dimensions: "Drop: 48 mm · Approx. 4.6 g per pair",
    construction:
      "Recycled sterling-silver wire formed and soldered by hand with nickel-free posts and butterfly backs.",
    care: "Store flat to protect the contour. Wipe with a soft cloth and avoid pressure that could distort the line.",
  },
  "Soft Current Chain": {
    wear: "Wear it at 42 cm as a fine glint at the collarbone or extend it to 48 cm over a higher neckline. Its light cable links can also carry a small pendant.",
    dimensions: "Adjustable length: 42–48 cm · Chain width: 1.2 mm",
    construction:
      "Fine recycled-silver cable chain finished in 18k gold vermeil with a spring-ring clasp and soldered end links.",
    care: "Fasten before storage to prevent knots. Keep away from moisture and polish only with a dry, non-abrasive cloth.",
  },
  "Echo Collar": {
    wear: "The articulated sections settle along the collarbone rather than standing rigidly away from the body. Designed as the only necklace in the look.",
    dimensions: "Lengths: 38 or 42 cm · Width: 12 mm at center",
    construction:
      "Interlocking recycled sterling-silver sections joined by concealed rings and finished with an adjustable clasp.",
    care: "Lay flat in its box after wear. Do not fold the articulated sections or clean with liquid silver dip.",
  },
  "Relic Chain Bracelet": {
    wear: "Rounded links and an oversized toggle give the bracelet presence while remaining easy to fasten one-handed.",
    dimensions: "Lengths: 17 or 19 cm · Link width: 10 mm",
    construction:
      "Hollow recycled-silver links with 18k gold vermeil and a solid cast toggle closure.",
    care: "Check that the toggle is fully seated before wear. Avoid stacking beside sharp-edged watches that may scratch the finish.",
  },
  "Quiet Orbit Cuff": {
    wear: "The pearl appears suspended between the cuff ends. It should sit close without pinching and is intended as a single, quiet statement.",
    dimensions: "Inner circumference: 16 cm · Pearl: 8 mm",
    construction:
      "Recycled sterling-silver cuff with a freshwater cultured pearl secured on a concealed post.",
    care: "Adjust only once for fit. Protect the pearl from perfume and impact, and wipe the silver without touching it with polishing compound.",
  },
  "Afterlight Studs": {
    wear: "A softly mismatched pair for first or second piercings. The low baskets sit close to the lobe and layer easily with small hoops.",
    dimensions: "Diamonds: 0.10 and 0.08 ct equivalent · 3.0 and 2.7 mm",
    construction:
      "Solid 14k yellow gold with round brilliant lab-grown diamonds, FG color and VS clarity range, in four-prong baskets.",
    care: "Clean gently with warm water, mild soap, and a soft brush. Check the earring backs and settings regularly.",
  },
};

const journalArticles = [
  {
    slug: "imperfect-stack",
    title: "The art of the imperfect stack",
    category: "Style notes",
    date: "August 18, 2026",
    readTime: "5 min read",
    image: "/products/necklace-04.jpg",
    position: "50% 45%",
    excerpt:
      "How to layer chains, pendants, and textures so the result feels collected—not calculated.",
    intro:
      "A good stack should look as if it grew with you. The secret is not perfect symmetry; it is a quiet rhythm between different lengths, weights, and memories.",
    quote:
      "Leave one thing unresolved. That is often what makes a stack feel personal.",
    sections: [
      {
        heading: "Begin with the piece that matters most",
        paragraphs: [
          "Choose one anchor: a pendant you rarely remove, a chain inherited from family, or the piece you want to notice first. Everything else should support it rather than compete with it.",
          "For necklaces, place the anchor near the collarbone or at the lowest point of the stack. For rings, give it the strongest finger or the clearest silhouette.",
        ],
      },
      {
        heading: "Change one quality at a time",
        paragraphs: [
          "Vary length before adding more volume. Then introduce a second texture: a fine trace chain beside a paperclip link, or a smooth band next to a hand-finished surface. Two or three distinct qualities usually feel richer than several near-identical pieces.",
          "Mixing metals can work beautifully when one tone repeats at least twice. A small gold detail echoed elsewhere makes the contrast feel intentional.",
        ],
      },
      {
        heading: "Keep space in the composition",
        paragraphs: [
          "Jewelry needs breathing room. Leave a visible interval between necklace lengths and avoid filling every finger or wrist. The open spaces give each piece its own outline.",
          "Check the stack while moving, not only in a mirror. Sit, turn, and lift your hands. If chains knot or rings press together, edit one piece out. Comfort is part of the composition.",
        ],
      },
    ],
  },
  {
    slug: "silver-after-dark",
    title: "Silver after dark",
    category: "Material stories",
    date: "August 11, 2026",
    readTime: "4 min read",
    image: "/products/necklace-03.jpg",
    position: "50% 48%",
    excerpt:
      "A study in wearing cool-toned silver with black, ink blue, and the softness of evening light.",
    intro:
      "Silver changes character after sunset. Against dark cloth and warm skin, its cool reflection becomes sharper, quieter, and unexpectedly luminous.",
    quote: "At night, silver does not disappear. It draws the light closer.",
    sections: [
      {
        heading: "Let contrast do the work",
        paragraphs: [
          "Pair polished silver with black cotton, silk, or deep navy. A clean neckline gives a pendant room to catch light; a sculptural cuff becomes the bright point against a long sleeve.",
          "Oxidized or brushed finishes are subtler. Wear them with tactile fabrics such as linen or fine knit so the surface variation remains visible.",
        ],
      },
      {
        heading: "Choose one reflective focal point",
        paragraphs: [
          "Evening styling becomes stronger when there is a single place for the eye to land. If earrings are large, keep the neckline quiet. If a collar or pendant carries the look, choose smaller hoops or no earrings at all.",
          "This is less a rule than an editing tool: take one piece away, then decide whether the silhouette became clearer.",
        ],
      },
      {
        heading: "Care for silver in a humid climate",
        paragraphs: [
          "Humidity, fragrance, perspiration, and air exposure can speed up tarnish. Put silver on after lotions and perfume, wipe it with a dry soft cloth after wear, and store pieces separately in a closed pouch.",
          "Remove jewelry before swimming or using household cleaners. For deeper tarnish or textured finishes, ask a jeweler before using dips or abrasive polish; aggressive cleaning can change the intended surface.",
        ],
      },
    ],
  },
  {
    slug: "gift-with-language",
    title: "A gift with its own language",
    category: "Gift guide",
    date: "August 4, 2026",
    readTime: "6 min read",
    image: "/products/ring-04.jpg",
    position: "50% 54%",
    excerpt:
      "A practical guide to choosing jewelry that feels specific to one person and one moment.",
    intro:
      "The most memorable jewelry gift is rarely the loudest. It feels precise: the right metal, the right scale, and a detail that quietly says, “I notice you.”",
    quote:
      "Choose for the life they already live, then add one small element of surprise.",
    sections: [
      {
        heading: "Start with observation, not occasion",
        paragraphs: [
          "Notice what they reach for repeatedly. Do they wear warm gold or cool silver? Small pieces or a single bold form? Do they work with their hands, travel often, or prefer jewelry they never need to remove?",
          "These habits are more useful than trend forecasts. A successful gift belongs naturally in the recipient’s real wardrobe.",
        ],
      },
      {
        heading: "When you do not know their size",
        paragraphs: [
          "Earrings, pendants, adjustable bracelets, and gift cards are safer than fitted rings. If a ring is essential, borrow one they wear on the intended finger and have it measured by a jeweler—do not estimate from a photo.",
          "For necklaces, consider their usual neckline and frame. A versatile chain with adjustable length gives them more ways to wear it.",
        ],
      },
      {
        heading: "Give the meaning somewhere to live",
        paragraphs: [
          "Engrave a date, place, or private phrase when personalization is welcome. Keep the message concise enough to feel intimate rather than explanatory.",
          "Include a short handwritten note about why you chose the piece. The note creates context now; the jewelry carries that story forward long after the occasion.",
        ],
      },
    ],
  },
];
type JournalArticleData = (typeof journalArticles)[number];

function useStoreMotion(view: string) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let observer: IntersectionObserver | undefined;
    let removeListeners: Array<() => void> = [];
    const context = gsap.context(() => {
      const heroItems = scope.querySelectorAll(".hero-copy > *");
      if (heroItems.length)
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
        );
      const revealTargets = Array.from(
        scope.querySelectorAll<HTMLElement>(
          ".section-heading,.home-intro > *,.journal-heading > *,.journal-card,.product-card,.category,.feature-accordion,.newsletter > *",
        ),
      );
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            gsap.fromTo(
              element,
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power1.out",
                clearProps: "transform,opacity",
              },
            );
            observer?.unobserve(element);
          }),
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
      );
      revealTargets.forEach((element) => observer?.observe(element));
      const hoverTargets = Array.from(
        scope.querySelectorAll<HTMLElement>(
          ".button,.category,.journal-card,.product-card",
        ),
      );
      removeListeners = hoverTargets.map((element) => {
        const enter = () =>
          gsap.to(element, {
            y: -2,
            duration: 0.18,
            ease: "power1.out",
            overwrite: "auto",
          });
        const leave = () =>
          gsap.to(element, {
            y: 0,
            scale: 1,
            duration: 0.18,
            ease: "power1.out",
            overwrite: "auto",
          });
        const down = () =>
          gsap.to(element, {
            scale: 0.99,
            duration: 0.1,
            ease: "power1.out",
            overwrite: "auto",
          });
        const up = () =>
          gsap.to(element, {
            scale: 1,
            duration: 0.14,
            ease: "power1.out",
            overwrite: "auto",
          });
        element.addEventListener("mouseenter", enter);
        element.addEventListener("mouseleave", leave);
        element.addEventListener("pointerdown", down);
        element.addEventListener("pointerup", up);
        element.addEventListener("pointercancel", up);
        return () => {
          element.removeEventListener("mouseenter", enter);
          element.removeEventListener("mouseleave", leave);
          element.removeEventListener("pointerdown", down);
          element.removeEventListener("pointerup", up);
          element.removeEventListener("pointercancel", up);
        };
      });
    }, scope);
    return () => {
      observer?.disconnect();
      removeListeners.forEach((remove) => remove());
      context.revert();
    };
  }, [view]);
  return root;
}

const announcementItems = [
  "Complimentary insured Philippine delivery over ₱8,000",
  "GCash, Maya, Visa & Mastercard accepted",
  "Made in small batches · Dispatches in 2–4 business days",
  "Five-year craftsmanship warranty",
  "Client care Monday–Saturday · 10am–7pm PHT",
];
function AnnouncementBar() {
  return (
    <aside className="announcement" aria-label="Ursula shopping updates">
      <p className="sr-only">{announcementItems.join(". ")}</p>
      <div className="announcement-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="announcement-group" key={group}>
            {announcementItems.map((item) => (
              <span className="announcement-item" key={`${group}-${item}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function Storefront({ view = "home" }: { view?: string }) {
  const motionRoot = useStoreMotion(view);
  const [cart, setCart] = useState<Product[]>([]),
    [wish, setWish] = useState<string[]>([]),
    [drawer, setDrawerState] = useState<"menu" | "search" | "cart" | null>(
      null,
    ),
    [query, setQuery] = useState(""),
    [notice, setNotice] = useState("");
  const setDrawer = (next: "menu" | "search" | "cart" | null) => {
    if (next !== null) {
      setDrawerState(next);
      return;
    }
    const backdrop = document.querySelector<HTMLElement>(".drawer-backdrop");
    const panel = document.querySelector<HTMLElement>(".drawer");
    if (!backdrop || !panel || panel.dataset.closing === "true") {
      setDrawerState(null);
      return;
    }
    panel.dataset.closing = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawerState(null);
      return;
    }
    gsap
      .timeline({ onComplete: () => setDrawerState(null) })
      .to(panel, { x: 32, opacity: 0, duration: 0.24, ease: "power2.in" })
      .to(backdrop, { opacity: 0, duration: 0.2, ease: "power1.in" }, "<.03");
  };
  useLayoutEffect(() => {
    if (!drawer) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const backdrop = document.querySelector<HTMLElement>(".drawer-backdrop");
    const panel = document.querySelector<HTMLElement>(".drawer");
    const close = document.querySelector<HTMLButtonElement>(".drawer-close");
    const items = document.querySelectorAll<HTMLElement>(
      ".drawer-links a,.drawer .eyebrow,.drawer h2,.drawer input,.drawer .bag-row,.drawer .bag-total,.drawer .button,.drawer .microcopy",
    );
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawer(null);
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => close?.focus());
    if (!reduce) {
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.24, ease: "power1.out" },
      );
      gsap.fromTo(
        panel,
        { x: 36, opacity: 0.72 },
        {
          x: 0,
          opacity: 1,
          duration: 0.42,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
      );
      if (items.length)
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.045,
            delay: 0.1,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
        );
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      gsap.killTweensOf([backdrop, panel, ...Array.from(items)]);
    };
  }, [drawer]);
  const [sort, setSort] = useState("featured"),
    [filter, setFilter] = useState("All");
  const categoryForView: Record<string, Product["kind"]> = {
    rings: "Rings",
    earrings: "Earrings",
    necklaces: "Necklaces",
    bracelets: "Bracelets",
  };
  const shown = useMemo(() => {
    let x = products;
    const category = categoryForView[view];
    if (category) {
      x = x.filter(
        (product) => product.kind === category,
      );
    } else if (view === "new") {
      x = x.filter((product) => product.badge === "New");
    } else if (view === "fine-jewelry") {
      x = x.filter(
        (product) =>
          product.material.toLowerCase().includes("lab-grown diamond") ||
          product.material.toLowerCase().includes("14k gold"),
      );
    }
    if (view === "collections" && filter !== "All") {
      x = x.filter(
        (p) =>
          p.kind.toLowerCase() === filter.toLowerCase() ||
          p.material.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    if (query)
      x = x.filter((p) =>
        (p.name + p.kind + p.material)
          .toLowerCase()
          .includes(query.toLowerCase()),
      );
    return [...x].sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : 0,
    );
  }, [filter, query, sort, view]);
  const add = (p: Product) => {
    setCart((x) => [...x, p]);
    setNotice(`${p.name} added to your bag`);
    requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bag = document.querySelector(".bag-action");
      if (bag)
        gsap.fromTo(
          bag,
          { scale: 0.9 },
          {
            scale: 1,
            duration: 0.42,
            ease: "back.out(2)",
            clearProps: "transform",
          },
        );
    });
    setTimeout(() => setNotice(""), 2400);
  };
  const toggleWish = (p: Product) => {
    setWish((x) =>
      x.includes(p.name) ? x.filter((n) => n !== p.name) : [...x, p.name],
    );
    requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const saved = document.querySelector(".saved-action");
      if (saved)
        gsap.fromTo(
          saved,
          { scale: 0.92 },
          {
            scale: 1,
            duration: 0.38,
            ease: "back.out(2)",
            clearProps: "transform",
          },
        );
    });
  };
  const routeTitle: Record<string, string> = {
    shop: "Shop all jewelry",
    rings: "Rings",
    earrings: "Earrings",
    necklaces: "Necklaces",
    bracelets: "Bracelets",
    new: "New arrivals",
    "fine-jewelry": "Fine jewelry",
    "gift-cards": "Gift cards",
    wishlist: "Your wishlist",
    search: "Search Ursula",
    story: "Our story",
    craftsmanship: "Made slowly. Worn instinctively.",
    materials: "Materials & responsibility",
    journal: "The Ursula journal",
    appointments: "Virtual styling",
    personalization: "Personalization studio",
    care: "Jewelry care",
    repairs: "Repairs & warranty",
    shipping: "Shipping & returns",
    faq: "Frequently asked questions",
    contact: "Client care",
    account: "Your account",
    checkout: "Secure checkout",
  };
  const catalog = [
    "shop",
    "rings",
    "earrings",
    "necklaces",
    "bracelets",
    "new",
    "fine-jewelry",
    "collections",
    "impression",
  ].includes(view);
  return (
    <div id="top" ref={motionRoot}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <AnnouncementBar />
      <header className="site-header">
        <button
          className="menu-button utility-action"
          onClick={() => setDrawer("menu")}
          aria-label="Open menu"
        >
          <List size={20} weight="regular" aria-hidden="true" />
          <span>Menu</span>
        </button>
        <nav aria-label="Primary navigation">
          <a href="/shop">Jewelry</a>
          <a href="/new">New arrivals</a>
          <a href="/collections">Collections</a>
          <a href="/personalization">Bespoke</a>
          <a href="/journal">Journal</a>
        </nav>
        <a className="wordmark" href="/" aria-label="Ursula home">
          URSULA<span>MANILA</span>
        </a>
        <div className="header-actions">
          <button
            className="utility-action search-action"
            onClick={() => setDrawer("search")}
            aria-label="Search products"
          >
            <MagnifyingGlass size={20} weight="regular" aria-hidden="true" />
            <span>Search</span>
          </button>
          <a className="utility-action account-action" href="/account">
            <UserCircle size={20} weight="regular" aria-hidden="true" />
            <span>Account</span>
          </a>
          <a
            className="utility-action saved-action"
            href="/wishlist"
            aria-label={`${wish.length} saved pieces`}
          >
            <Heart
              size={20}
              weight={wish.length ? "fill" : "regular"}
              aria-hidden="true"
            />
            <span className="utility-label">Saved</span>
            {wish.length > 0 && (
              <span className="utility-count" aria-hidden="true">
                {wish.length}
              </span>
            )}
          </a>
          <button
            className="utility-action bag-action"
            onClick={() => setDrawer("cart")}
            aria-label={`Open bag with ${cart.length} items`}
          >
            <Bag size={20} weight="regular" aria-hidden="true" />
            <span className="utility-label">Bag</span>
            <span className="utility-count" aria-hidden="true">
              {cart.length}
            </span>
          </button>
        </div>
      </header>
      {view === "home" ? (
        <Home add={add} wish={wish} toggleWish={toggleWish} />
      ) : view === "journal" ? (
        <JournalIndex />
      ) : journalArticles.find((article) => article.slug === view) ? (
        <JournalArticle
          article={journalArticles.find((article) => article.slug === view)!}
        />
      ) : catalog ? (
        <Catalog
          title={routeTitle[view] || "The Impression Collection"}
          products={shown}
          collectionHero={["collections", "impression"].includes(view)}
          filter={filter}
          setFilter={setFilter}
          showFilters={view === "collections"}
          sort={sort}
          setSort={setSort}
          add={add}
          wish={wish}
          toggleWish={toggleWish}
        />
      ) : (
        <ContentPage
          view={view}
          title={routeTitle[view] || view.replaceAll("-", " ")}
          products={products}
          add={add}
          wish={wish}
          toggleWish={toggleWish}
        />
      )}
      <Footer />
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
      {drawer && (
        <div className="drawer-backdrop" onMouseDown={() => setDrawer(null)}>
          <aside className="drawer" onMouseDown={(e) => e.stopPropagation()}>
            <button
              className="drawer-close"
              onClick={() => setDrawer(null)}
              aria-label="Close panel"
            >
              <X size={20} weight="regular" aria-hidden="true" />
              <span>Close</span>
            </button>
            {drawer === "menu" && (
              <>
                <p className="eyebrow">Menu</p>
                <div className="drawer-links">
                  <a href="/shop">Shop all</a>
                  <a href="/new">New arrivals</a>
                  <a href="/rings">Rings</a>
                  <a href="/earrings">Earrings</a>
                  <a href="/necklaces">Necklaces</a>
                  <a href="/bracelets">Bracelets</a>
                  <a href="/story">Our story</a>
                </div>
              </>
            )}
            {drawer === "search" && (
              <>
                <p className="eyebrow">Search Ursula</p>
                <h2>What are you looking for?</h2>
                <label className="drawer-search">
                  <span className="sr-only">Search jewelry</span>
                  <MagnifyingGlass
                    size={21}
                    weight="regular"
                    aria-hidden="true"
                  />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try ‘silver ring’"
                  />
                </label>
                {query && (
                  <div className="search-results">
                    {shown.length ? (
                      shown.slice(0, 4).map((p) => (
                        <a key={p.name} href="/shop">
                          {p.name}
                          <span>{peso(p.price)}</span>
                        </a>
                      ))
                    ) : (
                      <p>No pieces found. Try “ring” or “gold”.</p>
                    )}
                  </div>
                )}
              </>
            )}
            {drawer === "cart" && (
              <>
                <p className="eyebrow">Your bag</p>
                <h2>
                  {cart.length
                    ? `${cart.length} piece${cart.length > 1 ? "s" : ""}`
                    : "Your bag is waiting"}
                </h2>
                {!cart.length && (
                  <Bag
                    className="drawer-empty-icon"
                    size={42}
                    weight="thin"
                    aria-hidden="true"
                  />
                )}
                {cart.map((p, i) => (
                  <div className="bag-row" key={i}>
                    <ProductArt product={p} />
                    <span>
                      {p.name}
                      <small>{peso(p.price)}</small>
                    </span>
                  </div>
                ))}
                {cart.length > 0 && (
                  <>
                    <div className="bag-total">
                      <span>Subtotal</span>
                      <b>{peso(cart.reduce((s, p) => s + p.price, 0))}</b>
                    </div>
                    <a
                      className="button button-primary full button-with-icon"
                      href="/checkout"
                    >
                      Checkout securely
                      <ArrowRight
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                      />
                    </a>
                    <p className="microcopy">
                      Taxes included. Free nationwide shipping.
                    </p>
                  </>
                )}
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function Home({
  add,
  wish,
  toggleWish,
}: {
  add: (p: Product) => void;
  wish: string[];
  toggleWish: (p: Product) => void;
}) {
  return (
    <main id="main">
      <section className="hero">
        <div
          className="hero-image"
          role="img"
          aria-label="Editorial portrait wearing sculptural Ursula jewelry in warm light"
        />
        <div className="hero-copy">
          <p className="eyebrow">New · The Impression Collection</p>
          <h1>
            Objects
            <br />
            with a pulse.
          </h1>
          <p>
            Hand-finished jewelry shaped in Manila—sculptural enough to be
            noticed, intimate enough to become yours.
          </p>
          <div className="hero-buttons">
            <a className="button button-primary" href="/collections/impression">
              Discover the collection
            </a>
            <a className="button button-secondary" href="/shop">
              Shop all jewelry
            </a>
          </div>
          <div className="hero-service">
            <span>Free delivery over ₱8,000</span>
            <span>Secure Philippine checkout</span>
          </div>
        </div>
        <div className="hero-caption">
          <span>01 / Impression</span>
          <span>Recycled silver · Gold vermeil · 14k gold</span>
        </div>
      </section>
      <section className="trust-strip" aria-label="Shopping assurances">
        <span>
          <b>Designed in Manila</b>Forms with a point of view
        </span>
        <span>
          <b>Made responsibly</b>Recycled precious metals
        </span>
        <span>
          <b>Protected for five years</b>Repairs and aftercare
        </span>
        <span>
          <b>Delivered nationwide</b>Tracked and insured
        </span>
      </section>
      <section className="home-intro">
        <p className="eyebrow">The Ursula point of view</p>
        <p>
          Jewelry should not finish an outfit. It should begin a conversation.
        </p>
        <a className="text-link" href="/story">
          Meet Ursula →
        </a>
      </section>
      <Categories />
      <ProductSection
        title="New forms"
        kicker="The latest release"
        products={products.slice(0, 4)}
        add={add}
        wish={wish}
        toggleWish={toggleWish}
      />
      <section className="split-story" id="collection">
        <div
          className="story-image portrait-one"
          role="img"
          aria-label="Close detail of a hand-finished pendant"
        />
        <div className="story-copy">
          <p className="eyebrow">The Impression Collection</p>
          <h2>
            Metal
            <br />
            remembers.
          </h2>
          <p>
            A study in softness, pressure, and permanence. Each surface keeps
            the trace of the process that shaped it.
          </p>
          <a className="text-link" href="/collections/impression">
            Enter the collection →
          </a>
        </div>
      </section>
      <section className="split-story reverse">
        <div className="story-copy">
          <p className="eyebrow">Inside the studio</p>
          <h2>
            Made slowly.
            <br />
            Worn instinctively.
          </h2>
          <p>
            Recycled precious metals, hand-finished surfaces, and small-batch
            production—guided by specialist hands from first form to final
            polish.
          </p>
          <a className="text-link" href="/craftsmanship">
            Discover our craft →
          </a>
        </div>
        <div
          className="story-image craft-image"
          role="img"
          aria-label="Sculptural silver jewelry photographed in the Ursula studio"
        />
      </section>
      <ProductSection
        title="Most collected"
        kicker="Ursula signatures"
        products={products.slice(4)}
        add={add}
        wish={wish}
        toggleWish={toggleWish}
      />
      <section className="assurance">
        <div>
          <span>01</span>
          <b>Responsible materials</b>
          <p>Recycled silver, considered stones, and transparent care.</p>
        </div>
        <div>
          <span>02</span>
          <b>Made in small batches</b>
          <p>Patient finishing and close attention to every surface.</p>
        </div>
        <div>
          <span>03</span>
          <b>Five-year warranty</b>
          <p>Thoughtful support long after your piece arrives.</p>
        </div>
        <div>
          <span>04</span>
          <b>Easy Philippine delivery</b>
          <p>Tracked shipping and straightforward 14-day returns.</p>
        </div>
      </section>
      <section className="quote">
        <div>
          <p className="eyebrow">Worn by you</p>
          <blockquote>
            “It feels discovered,
            <br />
            not simply bought.”
          </blockquote>
          <small>Mara L. · verified buyer, Quezon City</small>
        </div>
        <div>
          <p className="eyebrow">Private appointments</p>
          <h2>
            A closer look,
            <br />
            from wherever you are.
          </h2>
          <p>
            Meet an Ursula stylist online for sizing, gifting, and personal
            recommendations.
          </p>
          <a className="button button-light" href="/appointments">
            Book a complimentary session
          </a>
        </div>
      </section>
      <Journal />
      <Newsletter />
    </main>
  );
}

function Categories() {
  return (
    <section className="categories" aria-label="Shop by category">
      {["Rings", "Earrings", "Necklaces", "Bracelets"].map((x, i) => (
        <a href={`/${x.toLowerCase()}`} key={x} className={`category cat-${i}`}>
          <span>
            <small>0{i + 1}</small>
            {x}
          </span>
          <b>View</b>
        </a>
      ))}
    </section>
  );
}
function ProductArt({ product }: { product: Product }) {
  return (
    <div className="product-art has-image">
      <Image
        src={product.image}
        alt={`${product.name} shown alone — ${product.material.toLowerCase()}`}
        fill
        sizes="(max-width: 520px) 100vw, (max-width: 1100px) 50vw, 25vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

const galleryViewLabels = [
  "jewelry-only studio view",
  "worn view",
  "profile and construction view",
  "macro material detail",
];

function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const selectView = (index: number) => {
    setSelected((index + product.gallery.length) % product.gallery.length);
  };

  useLayoutEffect(() => {
    if (!stage.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(stage.current, { opacity: 1, scale: 1 });
      return;
    }
    gsap.fromTo(
      stage.current,
      { opacity: 0.35, scale: 1.012 },
      { opacity: 1, scale: 1, duration: 0.34, ease: "power2.out" },
    );
  }, [selected]);

  return (
    <div
      className="product-gallery"
      aria-label={`${product.name} image gallery`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") selectView(selected - 1);
        if (event.key === "ArrowRight") selectView(selected + 1);
      }}
    >
      <figure className="product-gallery-stage">
        <div className="product-gallery-image" ref={stage}>
          <Image
            src={product.gallery[selected]}
            alt={`${product.name}, ${galleryViewLabels[selected]}`}
            fill
            priority
            sizes="(max-width: 820px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <figcaption aria-live="polite">
          {galleryViewLabels[selected]} · {selected + 1} of{" "}
          {product.gallery.length}
        </figcaption>
        <button
          type="button"
          className="gallery-arrow gallery-arrow-left"
          onClick={() => selectView(selected - 1)}
          aria-label={`Previous image of ${product.name}`}
        >
          <CaretLeft size={20} weight="regular" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="gallery-arrow gallery-arrow-right"
          onClick={() => selectView(selected + 1)}
          aria-label={`Next image of ${product.name}`}
        >
          <CaretRight size={20} weight="regular" aria-hidden="true" />
        </button>
      </figure>
      <div className="product-gallery-thumbs" aria-label="Choose product image">
        {product.gallery.map((image, index) => (
          <button
            type="button"
            key={image}
            className={selected === index ? "active" : ""}
            onClick={() => selectView(index)}
            aria-label={`Show ${galleryViewLabels[index]} of ${product.name}`}
            aria-pressed={selected === index}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="76px"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
function ProductDisclosure({
  title,
  children,
  initial = false,
}: {
  title: string;
  children: ReactNode;
  initial?: boolean;
}) {
  const [open, setOpen] = useState(initial);
  const panel = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const id = `product-detail-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  useLayoutEffect(() => {
    gsap.set(panel.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
    });
    gsap.set(marker.current, { rotate: open ? 45 : 0 });
  }, []);
  const toggle = () => {
    const element = panel.current;
    if (!element) return;
    const next = !open;
    setOpen(next);
    const current = element.getBoundingClientRect().height;
    const target = element.scrollHeight;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    gsap.killTweensOf([element, marker.current]);
    if (reduce) {
      gsap.set(element, { height: next ? "auto" : 0, opacity: next ? 1 : 0 });
      gsap.set(marker.current, { rotate: next ? 45 : 0 });
      return;
    }
    gsap.fromTo(
      element,
      { height: current, opacity: next && current === 0 ? 0 : 1 },
      {
        height: next ? target : 0,
        opacity: next ? 1 : 0,
        duration: next ? 0.42 : 0.26,
        ease: next ? "power2.out" : "power2.inOut",
        onComplete: () => {
          if (next) gsap.set(element, { height: "auto" });
        },
      },
    );
    gsap.to(marker.current, {
      rotate: next ? 45 : 0,
      duration: 0.26,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  return (
    <div className="product-disclosure">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span>{title}</span>
        <span
          className="product-disclosure-mark"
          ref={marker}
          aria-hidden="true"
        >
          <Plus size={18} weight="regular" />
        </span>
      </button>
      <div
        className="product-disclosure-panel"
        id={id}
        ref={panel}
        aria-hidden={!open}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
function ProductModal({
  product,
  size,
  setSize,
  add,
  onClose,
}: {
  product: Product;
  size: string;
  setSize: (size: string) => void;
  add: (product: Product) => void;
  onClose: () => void;
}) {
  const backdrop = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const closing = useRef(false);
  const profile = productProfiles[product.name];
  const closeAnimated = () => {
    if (closing.current) return;
    closing.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    gsap
      .timeline({ onComplete: onClose })
      .to(dialog.current, {
        opacity: 0,
        y: 10,
        scale: 0.99,
        duration: 0.2,
        ease: "power1.in",
      })
      .to(
        backdrop.current,
        { opacity: 0, duration: 0.18, ease: "power1.in" },
        "<",
      );
  };
  useLayoutEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced)
      gsap.set([backdrop.current, dialog.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
    else
      gsap
        .timeline()
        .fromTo(
          backdrop.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.24, ease: "power1.out" },
        )
        .fromTo(
          dialog.current,
          { opacity: 0, y: 18, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: "power2.out" },
          "<.04",
        );
    dialog.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAnimated();
        return;
      }
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = Array.from(
        dialog.current.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      gsap.killTweensOf([backdrop.current, dialog.current]);
    };
  }, []);
  return (
    <div
      className="product-modal-backdrop"
      ref={backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeAnimated();
      }}
    >
      <section
        className="product-modal"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        tabIndex={-1}
      >
        <button className="product-modal-close" onClick={closeAnimated}>
          Close
        </button>
        <div className="product-modal-art">
          <ProductGallery product={product} />
        </div>
        <div className="product-modal-copy">
          <p className="eyebrow">
            {product.badge} · {product.kind}
          </p>
          <h2 id="product-modal-title">{product.name}</h2>
          <p className="product-modal-price">{peso(product.price)}</p>
          <p className="product-modal-material">{product.material}</p>
          <p className="product-modal-lead">{product.description}</p>
          <p className="product-modal-wear">{profile.wear}</p>
          <fieldset>
            <legend>
              {product.kind === "Rings"
                ? "Select size"
                : "Choose length / size"}
            </legend>
            <div className="size-options">
              {product.sizes.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={size === option ? "active" : ""}
                  aria-pressed={size === option}
                  onClick={() => setSize(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            className="button button-primary full"
            onClick={() => {
              add(product);
              closeAnimated();
            }}
          >
            Add to bag · {peso(product.price)}
          </button>
          <p className="stock-note">
            <span /> Made in small batches · Dispatches in 2–4 business days
          </p>
          <div className="commerce-details">
            <ProductDisclosure title="Design story" initial>
              <p>{product.description}</p>
              <p>{profile.wear}</p>
            </ProductDisclosure>
            <ProductDisclosure title="Details & dimensions">
              <p>{profile.dimensions}</p>
              <p>{profile.construction}</p>
            </ProductDisclosure>
            <ProductDisclosure title="Materials & care">
              <p>{profile.care}</p>
            </ProductDisclosure>
            <ProductDisclosure title="Delivery & returns">
              <p>
                Complimentary insured nationwide delivery over ₱8,000. Unworn,
                non-personalized pieces may be returned within 14 days of
                delivery.
              </p>
            </ProductDisclosure>
          </div>
          <p className="shop-payments">
            Secure checkout · GCash · Maya · Visa · Mastercard
          </p>
        </div>
      </section>
    </div>
  );
}
function ProductSection({
  title,
  kicker,
  products: addProducts,
  add,
  wish,
  toggleWish,
}: {
  title: string;
  kicker: string;
  products: Product[];
  add: (p: Product) => void;
  wish: string[];
  toggleWish: (p: Product) => void;
}) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const openProduct = (product: Product) => {
    setSelected(product);
    setSize(product.sizes[0]);
  };
  return (
    <section className="product-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{kicker}</p>
          <h2>{title}</h2>
        </div>
        <a href="/shop">Shop the full edit →</a>
      </div>
      <div className="product-grid">
        {addProducts.map((product) => (
          <article className="product-card" key={product.name}>
            <div className="product-label">{product.badge}</div>
            <button
              className="wish"
              onClick={() => toggleWish(product)}
              aria-label={`${wish.includes(product.name) ? "Remove" : "Add"} ${product.name} ${wish.includes(product.name) ? "from" : "to"} saved pieces`}
              aria-pressed={wish.includes(product.name)}
            >
              <Heart
                size={19}
                weight={wish.includes(product.name) ? "fill" : "regular"}
                aria-hidden="true"
              />
            </button>
            <button
              className="product-preview"
              onClick={() => openProduct(product)}
              aria-label={`View details for ${product.name}`}
            >
              <ProductArt product={product} />
              <span className="product-view-cue">View details</span>
            </button>
            <div className="product-info">
              <div>
                <p className="product-material">{product.material}</p>
                <button
                  className="product-name"
                  onClick={() => openProduct(product)}
                >
                  <h3>{product.name}</h3>
                </button>
                <p className="product-description">{product.description}</p>
                <b>{peso(product.price)}</b>
              </div>
              <button
                className="quick-add"
                onClick={() => add(product)}
                aria-label={`Add ${product.name} to bag`}
              >
                <Plus size={16} weight="regular" aria-hidden="true" />
                <span>Quick add</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {selected && (
        <ProductModal
          product={selected}
          size={size}
          setSize={setSize}
          add={add}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
function Catalog({
  title,
  products: ps,
  collectionHero,
  filter,
  setFilter,
  showFilters,
  sort,
  setSort,
  add,
  wish,
  toggleWish,
}: {
  title: string;
  products: Product[];
  collectionHero: boolean;
  filter: string;
  setFilter: (x: string) => void;
  showFilters: boolean;
  sort: string;
  setSort: (x: string) => void;
  add: (p: Product) => void;
  wish: string[];
  toggleWish: (p: Product) => void;
}) {
  const categoryProducts = products.filter(
    (product) => product.kind.toLowerCase() === title.toLowerCase(),
  );
  const heroProducts = categoryProducts.length ? categoryProducts : ps;
  const heroSource = heroProducts.length ? heroProducts : products;
  const collectionSlides = [
    ...heroSource.map((product) => ({ product, image: product.image })),
    ...heroSource.flatMap((product) =>
      product.gallery.slice(1).map((image) => ({ product, image })),
    ),
  ].slice(0, 5);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroTouchStart = useRef<number | null>(null);

  useEffect(() => {
    setHeroSlide(0);
  }, [title, filter]);

  useEffect(() => {
    if (collectionSlides.length < 2) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % collectionSlides.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [collectionSlides.length]);

  const moveHero = (direction: number) => {
    setHeroSlide(
      (current) =>
        (current + direction + collectionSlides.length) %
        collectionSlides.length,
    );
  };

  return (
    <main id="main">
      <section
        className={`collection-carousel${collectionHero ? "" : " category-carousel"}`}
        aria-roledescription="carousel"
        aria-label={`${title} featured pieces`}
        onTouchStart={(event) => {
          heroTouchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (heroTouchStart.current === null) return;
          const distance =
            event.changedTouches[0].clientX - heroTouchStart.current;
          if (Math.abs(distance) > 48) moveHero(distance > 0 ? -1 : 1);
          heroTouchStart.current = null;
        }}
      >
        <div
          className="collection-carousel-track"
          style={{ transform: `translateX(-${heroSlide * 100}%)` }}
        >
          {collectionSlides.map((slide, index) => (
            <figure
              className="collection-carousel-slide"
              key={`${slide.product.name}-${slide.image}`}
              aria-hidden={heroSlide !== index}
            >
              <Image
                src={slide.image}
                alt={
                  heroSlide === index
                    ? `${slide.product.name}, ${slide.product.material}`
                    : ""
                }
                fill
                priority={index < 2}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </figure>
          ))}
        </div>
        <div className="collection-carousel-shade" aria-hidden="true" />
        <div className="collection-carousel-copy">
          <p className="eyebrow">Jewelry shaped by instinct</p>
          <h1>{title}</h1>
          {collectionHero ? (
            <p>
              A study in softness, pressure, and permanence—sculptural forms
              made slowly in Manila.
            </p>
          ) : (
            <p>
              Discover the Ursula edit through considered details, hand-finished
              surfaces, and forms designed to be worn instinctively.
            </p>
          )}
          <a className="collection-carousel-link" href="#collection-grid">
            Explore {title.toLowerCase()} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="collection-carousel-meta" aria-live="polite">
          <span>{String(heroSlide + 1).padStart(2, "0")}</span>
          <span className="collection-carousel-line" aria-hidden="true" />
          <span>{String(collectionSlides.length).padStart(2, "0")}</span>
          <span>{collectionSlides[heroSlide]?.product.name}</span>
        </div>
        <div className="collection-carousel-controls">
          <button onClick={() => moveHero(-1)} aria-label="Previous featured image">
            <CaretLeft size={20} aria-hidden="true" />
          </button>
          <button onClick={() => moveHero(1)} aria-label="Next featured image">
            <CaretRight size={20} aria-hidden="true" />
          </button>
        </div>
      </section>
      <div
        className={`catalog-tools${showFilters ? "" : " sort-only"}`}
        style={showFilters ? undefined : { justifyContent: "flex-end" }}
      >
        {showFilters && (
          <div>
            {[
              "All",
              "Rings",
              "Earrings",
              "Necklaces",
              "Bracelets",
              "Gold vermeil",
              "Recycled silver",
            ].map((x) => (
              <button
                className={filter === x ? "active" : ""}
                key={x}
                onClick={() => setFilter(x)}
                aria-pressed={filter === x}
              >
                {x}
              </button>
            ))}
          </div>
        )}
        <label>
          Sort{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>
      {ps.length ? (
        <div id="collection-grid">
        <ProductSection
          key={`${filter}-${sort}`}
          title={`${ps.length} considered forms`}
          kicker="Ursula edit"
          products={ps}
          add={add}
          wish={wish}
          toggleWish={toggleWish}
        />
        </div>
      ) : (
        <section className="empty">
          <h2>No pieces match those filters.</h2>
          {showFilters && (
            <button
              className="button button-primary"
              onClick={() => setFilter("All")}
            >
              View all pieces
            </button>
          )}
        </section>
      )}
      <Newsletter />
    </main>
  );
}
const featureDetails: Record<string, string> = {
  "Born from instinct":
    "Each Ursula form begins with a hand-drawn gesture, then develops through carving, casting, and patient refinement.",
  "Designed in Manila":
    "Our collections respond to the city’s contrasts—soft light, hard edges, movement, heat, and intimate daily rituals.",
  "Made for every expression":
    "Gender-inclusive proportions and considered sizing invite each piece to be worn on your own terms.",
  "Small-batch production":
    "We make in measured quantities so specialist hands can give every surface and setting close attention.",
  "Hand-finished surfaces":
    "Subtle marks, softened edges, and intentional texture preserve the presence of the maker.",
  "Five-year warranty":
    "Manufacturing faults are covered for five years, with transparent repair support available beyond the warranty.",
  "Recycled precious metals":
    "Reclaimed silver and gold reduce demand for newly mined material without compromising beauty or durability.",
  "Lab-grown diamonds":
    "Selected for traceability and precise quality, our lab-grown stones offer the same optical character as mined diamonds.",
  "Responsible packaging":
    "Your order arrives in reusable, recyclable materials sized to reduce unnecessary volume.",
  "Store separately":
    "Keep each piece in its own soft pouch to limit scratches, tangles, and exposure to humid air.",
  "Avoid fragrance":
    "Apply perfume, lotion, and hair products before jewelry; allow skin to dry before putting pieces on.",
  "Use a soft cloth":
    "After wear, gently wipe metal and stones with a clean, dry cloth before storing them away.",
  "Photo assessment":
    "Send clear photos to client care and our team will review the piece before asking you to ship it.",
  "Transparent quote":
    "You receive the recommended work, estimated timing, and full cost before any repair begins.",
  "Nationwide return":
    "We coordinate secure tracked transport from anywhere in the Philippines when workshop care is required.",
  "Are pieces hypoallergenic?":
    "Our materials are disclosed on every product. Sensitive skin varies, so client care can help you choose the most suitable option.",
  "How do I find my size?":
    "Use our measuring guidance or book a complimentary virtual sizing session before placing your order.",
  "Can I return engraving?":
    "Personalized pieces are final sale unless faulty, so we provide a preview for approval before production.",
  "The imperfect stack":
    "Vary chain lengths, metal textures, and scale while leaving enough space for every piece to keep its own outline.",
  "Silver after dark":
    "Polished and oxidized silver catch evening light differently; pair one reflective focal piece with quieter supporting forms.",
  "Choosing with meaning":
    "Start with the recipient’s everyday habits, preferred metal, and scale, then add one personal detail that feels specific.",
  "30-minute video call":
    "Meet privately with an Ursula stylist through a secure video link from anywhere in the Philippines.",
  "Personal recommendations":
    "We prepare a focused edit around your style, sizing, budget, gifting occasion, and the jewelry you already wear.",
  "Complimentary service":
    "There is no appointment fee or obligation to purchase; considered advice is part of Ursula client care.",
  "Engraving from ₱1,200":
    "Add up to twelve characters to selected rings, pendants, and bracelets in our signature hand-lettered style.",
  "Selected stones":
    "Choose from a considered palette of birthstones, lab-grown diamonds, and spinels for eligible designs.",
  "Preview first":
    "You receive a digital placement preview and final quote before our studio begins your non-returnable piece.",
  "Free over ₱8,000":
    "Complimentary insured standard delivery is applied automatically to qualifying Philippine orders.",
  "2–4 days Metro Manila":
    "In-stock pieces usually leave our studio within two business days, followed by tracked local delivery.",
  "4–8 days provincial":
    "Provincial orders travel with an insured courier; island and remote addresses may require additional time.",
  "Live chat · 10am–7pm PHT":
    "Chat with Ursula client care Monday to Saturday for product, sizing, gifting, and order guidance.",
  "hello@ursulajewelry.com":
    "Include your order number and clear photos when relevant; your message goes directly to our client care team.",
  "One-day reply":
    "Most messages receive a considered response within one business day, excluding Philippine public holidays.",
  "Order tracking":
    "See fulfilment progress and courier tracking in one place as soon as your order leaves our Manila studio.",
  "Saved details":
    "Keep favorite pieces, delivery addresses, and contact information ready across your signed-in devices.",
  "Faster checkout":
    "Securely reuse saved delivery information and review your complete order history before purchasing.",
};
function AccordionItem({ label, index }: { label: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const id = `feature-${index}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  useLayoutEffect(() => {
    gsap.set(panel.current, { height: 0, opacity: 0 });
    gsap.set(marker.current, { rotate: 0 });
  }, []);
  const toggle = () => {
    const element = panel.current;
    if (!element) return;
    const next = !open;
    setOpen(next);
    const current = element.getBoundingClientRect().height;
    const target = element.scrollHeight;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    gsap.killTweensOf([element, marker.current]);
    if (reduce) {
      gsap.set(element, { height: next ? "auto" : 0, opacity: next ? 1 : 0 });
      gsap.set(marker.current, { rotate: next ? 45 : 0 });
      return;
    }
    gsap.fromTo(
      element,
      { height: current, opacity: next && current === 0 ? 0 : 1 },
      {
        height: next ? target : 0,
        opacity: next ? 1 : 0,
        duration: next ? 0.44 : 0.28,
        ease: next ? "power2.out" : "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          if (next) gsap.set(element, { height: "auto" });
        },
      },
    );
    gsap.to(marker.current, {
      rotate: next ? 45 : 0,
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  return (
    <article className="accordion-item" data-open={open}>
      <button
        className="accordion-trigger"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="accordion-index">0{index + 1}</span>
        <span>{label}</span>
        <span className="accordion-mark" ref={marker} aria-hidden="true" />
      </button>
      <div className="accordion-panel" id={id} ref={panel} aria-hidden={!open}>
        <p>
          {featureDetails[label] ||
            "Clear guidance, considered detail, and personal support before and after your purchase."}
        </p>
      </div>
    </article>
  );
}
function FeatureAccordion({ items }: { items: string[] }) {
  return (
    <section className="feature-accordion" aria-label="More information">
      <div className="accordion-intro">
        <p className="eyebrow">Explore the details</p>
        <h2>Everything worth knowing.</h2>
      </div>
      <div className="accordion-list">
        {items.map((item, index) => (
          <AccordionItem label={item} index={index} key={item} />
        ))}
      </div>
    </section>
  );
}
function ContentPage({
  view,
  title,
  products: ps,
  add,
  wish,
  toggleWish,
}: {
  view: string;
  title: string;
  products: Product[];
  add: (p: Product) => void;
  wish: string[];
  toggleWish: (p: Product) => void;
}) {
  if (view === "wishlist")
    return (
      <main id="main">
        <section className="page-hero">
          <p className="eyebrow">Saved for later</p>
          <h1>{title}</h1>
          <p>Sign in to keep your saved pieces across every device.</p>
        </section>
        <ProductSection
          title="Pieces to consider"
          kicker="Ursula favorites"
          products={ps.slice(0, 4)}
          add={add}
          wish={wish}
          toggleWish={toggleWish}
        />
      </main>
    );
  if (view === "checkout")
    return (
      <main id="main">
        <section className="checkout">
          <div>
            <p className="eyebrow">Secure checkout</p>
            <h1>Where should we send it?</h1>
            <div className="checkout-progress">
              <b>1 Information</b>
              <span>2 Delivery</span>
              <span>3 Payment</span>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                Email
                <input type="email" required placeholder="you@example.com" />
              </label>
              <div className="form-grid">
                <label>
                  First name
                  <input required />
                </label>
                <label>
                  Last name
                  <input required />
                </label>
              </div>
              <label>
                Philippine address
                <input required placeholder="House / unit, street, barangay" />
              </label>
              <div className="form-grid">
                <label>
                  City
                  <input required />
                </label>
                <label>
                  Province
                  <input required />
                </label>
                <label>
                  Postal code
                  <input required />
                </label>
              </div>
              <button className="button button-primary full">
                Continue to delivery
              </button>
            </form>
          </div>
          <aside>
            <p className="eyebrow">Order summary</p>
            <div className="bag-row">
              <ProductArt product={products[0]} />
              <span>
                {products[0].name}
                <small>{peso(products[0].price)}</small>
              </span>
            </div>
            <div className="bag-total">
              <span>Total</span>
              <b>{peso(products[0].price)}</b>
            </div>
            <p className="microcopy">
              Free insured nationwide delivery · Taxes included
            </p>
          </aside>
        </section>
      </main>
    );
  const copy: Record<string, [string, string[]]> = {
    story: [
      "Ursula creates intimate objects that become part of how you move through the world.",
      ["Born from instinct", "Designed in Manila", "Made for every expression"],
    ],
    craftsmanship: [
      "Every piece passes through specialist hands—from carving and casting to setting and polishing.",
      [
        "Small-batch production",
        "Hand-finished surfaces",
        "Five-year warranty",
      ],
    ],
    materials: [
      "We prioritize recycled metals, thoughtful sourcing, durable finishes, and transparent care.",
      [
        "Recycled precious metals",
        "Lab-grown diamonds",
        "Responsible packaging",
      ],
    ],
    journal: [
      "Notes on material, form, care, and the rituals that make jewelry your own.",
      ["The imperfect stack", "Silver after dark", "Choosing with meaning"],
    ],
    appointments: [
      "Meet one-to-one with an Ursula stylist online for sizing, gifting, and layering.",
      [
        "30-minute video call",
        "Personal recommendations",
        "Complimentary service",
      ],
    ],
    personalization: [
      "Build a piece around initials, a date, a private word, or a meaningful stone.",
      ["Engraving from ₱1,200", "Selected stones", "Preview first"],
    ],
    care: [
      "Simple care preserves surface, shape, and shine for years of daily wear.",
      ["Store separately", "Avoid fragrance", "Use a soft cloth"],
    ],
    repairs: [
      "Our five-year warranty covers manufacturing faults, with repair care beyond it.",
      ["Photo assessment", "Transparent quote", "Nationwide return"],
    ],
    shipping: [
      "Secure delivery across Metro Manila and nationwide with tracking.",
      ["Free over ₱8,000", "2–4 days Metro Manila", "4–8 days provincial"],
    ],
    faq: [
      "Quick guidance on sizing, materials, delivery, personalization, warranty, and returns.",
      [
        "Are pieces hypoallergenic?",
        "How do I find my size?",
        "Can I return engraving?",
      ],
    ],
    contact: [
      "Speak with client care for product advice, orders, gifts, returns, or repairs.",
      ["Live chat · 10am–7pm PHT", "hello@ursulajewelry.com", "One-day reply"],
    ],
    account: [
      "Sign in to see orders, saved pieces, addresses, returns, and warranty requests.",
      ["Order tracking", "Saved details", "Faster checkout"],
    ],
  };
  const c = copy[view] || [
    "This service is designed with the same care as every piece.",
    ["Personal guidance", "Secure and private", "Here when needed"],
  ];
  return (
    <main id="main">
      <section className="editorial-hero">
        <div>
          <p className="eyebrow">Ursula · Philippines</p>
          <h1>{title}</h1>
          <p>{c[0]}</p>
          <a
            className="button button-primary"
            href={
              view === "account"
                ? "/account/sign-in"
                : view === "appointments"
                  ? "/appointments/book"
                  : "/contact"
            }
          >
            {view === "account"
              ? "Sign in securely"
              : view === "appointments"
                ? "Book an appointment"
                : "Talk to client care"}
          </a>
        </div>
        <div className="editorial-image" />
      </section>
      <FeatureAccordion items={c[1]} />
      {view === "journal" && <Journal />}
      <Newsletter />
    </main>
  );
}
function Journal() {
  return (
    <section className="journal">
      <div className="journal-heading">
        <div>
          <p className="eyebrow">The Ursula Journal</p>
          <h2>
            Objects, rituals,
            <br />
            ways of wearing.
          </h2>
        </div>
        <div>
          <p>
            Considered notes on personal style, precious materials, and caring
            for the pieces that move through life with you.
          </p>
          <a className="text-link" href="/journal">
            Explore all stories →
          </a>
        </div>
      </div>
      <JournalGrid />
    </section>
  );
}
function JournalGrid() {
  return (
    <div className="journal-grid">
      {journalArticles.map((article, i) => (
        <a
          href={`/journal/${article.slug}`}
          key={article.slug}
          className={`journal-card journal-card-${i}`}
        >
          <div className="journal-image">
            <Image
              src={article.image}
              alt={`${article.title} — ${article.category.toLowerCase()}`}
              fill
              sizes="(max-width: 820px) 100vw, 33vw"
              style={{ objectFit: "cover", objectPosition: article.position }}
            />
          </div>
          <div className="journal-card-copy">
            <div className="journal-meta">
              <span>{article.category}</span>
              <span>{article.readTime}</span>
            </div>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <span className="journal-read">
              Read story <b>→</b>
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
function JournalIndex() {
  return (
    <main id="main">
      <header className="journal-index-hero">
        <p className="eyebrow">The Ursula Journal</p>
        <h1>
          Notes for a life
          <br />
          lived in jewelry.
        </h1>
        <p>
          Personal style, thoughtful gifting, material knowledge, and
          care—written for how jewelry is actually worn in the Philippines.
        </p>
      </header>
      <section className="journal journal-index">
        <JournalGrid />
      </section>
      <Newsletter />
    </main>
  );
}
function JournalArticle({ article }: { article: JournalArticleData }) {
  return (
    <main id="main">
      <article className="article">
        <header className="article-header">
          <a href="/journal" className="article-back">
            ← All journal stories
          </a>
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.excerpt}</p>
          <div className="article-meta">
            <span>{article.date}</span>
            <span>{article.readTime}</span>
            <span>Ursula Studio</span>
          </div>
        </header>
        <figure className="article-hero">
          <Image
            src={article.image}
            alt={`Jewelry detail for ${article.title}`}
            width={1600}
            height={1000}
            priority
            style={{ objectFit: "cover", objectPosition: article.position }}
          />
          <figcaption>
            Ursula Journal · photographed in considered detail
          </figcaption>
        </figure>
        <div className="article-layout">
          <aside>
            <span>In this story</span>
            {article.sections.map((section, i) => (
              <a href={`#section-${i + 1}`} key={section.heading}>
                {String(i + 1).padStart(2, "0")} · {section.heading}
              </a>
            ))}
          </aside>
          <div className="article-body">
            <p className="article-intro">{article.intro}</p>
            {article.sections.map((section, i) => (
              <section id={`section-${i + 1}`} key={section.heading}>
                <p className="article-number">0{i + 1}</p>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {i === 0 && <blockquote>{article.quote}</blockquote>}
              </section>
            ))}
            <div className="article-end">
              <p className="eyebrow">Continue exploring</p>
              <h2>Find the form that feels like yours.</h2>
              <a className="button button-primary" href="/shop">
                Shop the Ursula edit
              </a>
            </div>
          </div>
        </div>
      </article>
      <Journal />
    </main>
  );
}
function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow">Stay close</p>
        <h2>Private previews, new forms, and notes from the studio.</h2>
      </div>
      {done ? (
        <p role="status">
          <b>You’re on the list.</b>
          <br />A quiet note will arrive soon.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input id="email" type="email" required placeholder="Email address" />
          <button>Join the list</button>
          <small>Unsubscribe anytime.</small>
        </form>
      )}
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <a className="footer-brand" href="/">
        URSULA<span>Jewelry shaped by instinct.</span>
      </a>
      <div>
        <b>Shop</b>
        <a href="/shop">All jewelry</a>
        <a href="/new">New arrivals</a>
        <a href="/fine-jewelry">Fine jewelry</a>
        <a href="/gift-cards">Gift cards</a>
      </div>
      <div>
        <b>Client care</b>
        <a href="/contact">Contact</a>
        <a href="/shipping">Shipping & returns</a>
        <a href="/care">Jewelry care</a>
        <a href="/repairs">Repairs & warranty</a>
        <a href="/faq">FAQ</a>
      </div>
      <div>
        <b>About</b>
        <a href="/story">Our story</a>
        <a href="/craftsmanship">Craftsmanship</a>
        <a href="/materials">Responsibility</a>
        <a href="/journal">Journal</a>
      </div>
      <div>
        <b>Services</b>
        <a href="/personalization">Personalization</a>
        <a href="/appointments">Styling session</a>
        <a href="/account">Track an order</a>
      </div>
      <div className="footer-bottom">
        <span>Philippines · PHP</span>
        <span>Privacy · Terms · Accessibility · Cookies</span>
      </div>
    </footer>
  );
}
