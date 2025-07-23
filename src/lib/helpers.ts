type ToDollarOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  wholeNumber?: boolean;
};

export function toDollar(value: number | string, options: ToDollarOptions = {}): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    wholeNumber = false,
  } = options;

  const numericValue = Number(value);
  if (isNaN(numericValue)) return '$0.00';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: wholeNumber ? 0 : minimumFractionDigits,
    maximumFractionDigits: wholeNumber ? 0 : maximumFractionDigits,
  }).format(numericValue);
}
