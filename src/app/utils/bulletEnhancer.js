const verbs = [
  'Built',
  'Designed',
  'Developed',
  'Optimized',
  'Improved'
]

export function enhanceBullet(text) {
  if (!text) return text

  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)]
  return `${randomVerb} ${text} resulting in improved performance and usability.`
}
