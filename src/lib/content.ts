/**
 * Lokale Content-Abfragen — ersetzt Sanity komplett.
 * Alle Daten kommen aus src/content/ (Astro Content Collections).
 */
import { getCollection, getEntry } from 'astro:content';

export async function getTestimonials() {
  return (await getCollection('testimonials')).map(t => t.data);
}

export async function getPage(slug: string) {
  const entry = await getEntry('pages', slug);
  return entry?.data ?? null;
}

export async function getRetreat(slug: string) {
  const entry = await getEntry('retreats', slug);
  return entry?.data ?? null;
}

export async function getTrainings() {
  return (await getCollection('trainings')).map(t => t.data);
}

export async function getStartseite() {
  const hero = (await getEntry('hero', 'zurich'))?.data;
  const methode = (await getEntry('zurichSektionen', 'methode'))?.data;
  const entwickelst = (await getEntry('zurichSektionen', 'entwickelst'))?.data;
  const erfahrungsraum = (await getEntry('zurichSektionen', 'erfahrungsraum'))?.data;
  const ueber = (await getEntry('zurichSektionen', 'ueber'))?.data;
  return { hero, methode, entwickelst, erfahrungsraum, ueber };
}
