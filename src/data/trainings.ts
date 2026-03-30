export interface Training {
  title: string;
  date: string;
  location: string;
  level: string;
  href: string;
  image: string;
}

export const trainings: Training[] = [
  {
    title: "Level 1a — Rücken & Nacken",
    date: "18–19 April 2026",
    location: "Zürich, Switzerland",
    level: "Level 1a",
    href: "/zurich",
    image: "/images/general/dan-two-men.jpg",
  },
  {
    title: "An Evolution of Sensitivity",
    date: "10–16 May 2026",
    location: "Alpujarra, Spain",
    level: "Level 2",
    href: "/spain",
    image: "/images/spain/hero.jpg",
  },
  {
    title: "The Essence of Deep Touch",
    date: "1–7 June 2026",
    location: "Near Lisbon, Portugal",
    level: "Level 1",
    href: "/portugal",
    image: "/images/portugal/hero.jpg",
  },
  {
    title: "Level 1b — Bauch, Becken, Beine",
    date: "13–14 June 2026",
    location: "Zürich, Switzerland",
    level: "Level 1b",
    href: "/zurich",
    image: "/images/general/dan-two-men.jpg",
  },
  {
    title: "The Essence of Deep Touch",
    date: "24–30 January 2027",
    location: "Mazunte, México",
    level: "Level 1",
    href: "/mazunte",
    image: "/images/mazunte/hero.jpg",
  },
];

// Subset shown on homepage (first 4, excluding Spain Level 2)
export const homepageTrainings = trainings.filter(t =>
  ["Level 1a", "Level 1", "Level 1b"].includes(t.level)
).slice(0, 4);
