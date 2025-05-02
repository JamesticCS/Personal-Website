import ExperienceClient from './ExperienceClient'

export const metadata = { title: 'Experience' }

/** Server Component — just renders the client version */
export default function ExperiencePage() {
  return <ExperienceClient />
}
