export const createSlug = (input: string) => {
  const slug = input
    .normalize('NFD') // Separa caracteres acentuados de seus modificadores
    .replace(/\p{Diacritic}/gu, '') // Remove apenas os diacríticos (acentos)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres indesejados
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
  return { slug }
}
