export const formatCurrency = (number: number, locale = "en") => {
  return new Intl.NumberFormat(locale, {
    currency: "USD",
    style: "currency",
  }).format(number);
};
