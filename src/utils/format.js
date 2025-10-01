export function formatPrice(value) {
  if (!value) return "0";
  return value.toLocaleString("uz-UZ");
}
