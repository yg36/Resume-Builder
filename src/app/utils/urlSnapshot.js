export function generateSnapshot(resume) {
  const encoded = btoa(JSON.stringify(resume))
  window.location.hash = encoded
}

export function loadSnapshot() {
  if (window.location.hash) {
    return JSON.parse(atob(window.location.hash.substring(1)))
  }
}
