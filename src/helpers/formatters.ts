export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(" ").substring(0, 19) : "";
};

export const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 2) {
    return digits.substring(0, 2) + " / " + digits.substring(2, 4);
  }
  return digits;
};

export const formatPrice = (price: number, currency: string = "USD", locale: string = "en-US"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
