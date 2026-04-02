import { client } from './sanity'

// STARTSEITE
export async function getStartseite() {
  return client.fetch(`*[_type == "startseite"][0]`)
}

// TRAININGS
export async function getTrainings() {
  return client.fetch(`*[_type == "training"] | order(date asc)`)
}

// TESTIMONIALS
export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"]`)
}

export async function getTestimonialById(id: string) {
  return client.fetch(`*[_type == "testimonial" && _id == $id][0]`, { id })
}

// RETREAT (einzeln per slug)
export async function getRetreat(slug: string) {
  return client.fetch(`*[_type == "retreat" && slug.current == $slug][0]`, { slug })
}

// PAGE (einzeln per slug)
export async function getPage(slug: string) {
  return client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug })
}
