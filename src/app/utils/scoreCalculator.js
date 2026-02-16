export function calculateScore(resume) {
  let score = 0

  if (resume.summary) score += 20
  if (resume.skills.length > 0) score += 20
  if (resume.projects.length > 0) score += 20
  if (resume.experience.length > 0) score += 20
  if (resume.links.length > 0) score += 20

  return score
}
