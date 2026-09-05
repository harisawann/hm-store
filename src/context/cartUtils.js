/** "RS.3,950" -> 3950. Falls back to 0 for anything unparsable so totals never show NaN. */
export function parsePrice(price) {
  if (typeof price === "number") return price;
  const numeric = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function formatPrice(amount) {
  return `RS.${Math.round(amount).toLocaleString("en-PK")}`;
}
