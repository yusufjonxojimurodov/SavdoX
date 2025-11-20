export function phoneCodeValidator(value) {
  if (!value) return false;

  var firstTwo = value.replace(/[-\s]/g, "").slice(0, 2);

  var allowedCodes = [
    "90",
    "91",
    "88",
    "50",
    "93",
    "94",
    "95",
    "77",
    "99",
    "98",
    "97",
    "20",
    "33",
    "96",
    "61",
  ];

  return allowedCodes.includes(firstTwo);
}
