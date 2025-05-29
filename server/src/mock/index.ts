export const movies = Array.from({ length: 1_000_000 }, (_, i) => ({
  id: i,
  title: `Movie ${i + 1}`,
  description: `Description for Movie ${i + 1}`,
  isChecked: false,
}))
