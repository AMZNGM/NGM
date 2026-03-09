export function splitChars(text) {
  if (!text) return []
  return Array.from(text)
}

export function splitWords(text) {
  if (!text) return []
  return text.match(/\S+|\s+/g) || []
}
