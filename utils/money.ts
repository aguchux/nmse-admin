export const toNaira = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'symbol',
  }).format(amount);
};

export const shortMoney = (amount: number): string => {
  if (amount < 1e3) return `${amount}`;
  if (amount >= 1e3 && amount < 1e6) return `${(amount / 1e3).toFixed(1)}K`;
  if (amount >= 1e6 && amount < 1e9) return `${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e9 && amount < 1e12) return `${(amount / 1e9).toFixed(1)}B`;
  return `${amount}`;
};

export const monify = (amount: number): string => {
  if (amount < 1e3) return `${amount}`;
  if (amount >= 1e3 && amount < 1e6) return `${(amount / 1e3).toFixed(1)}K`;
  if (amount >= 1e6 && amount < 1e9) return `${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e9 && amount < 1e12) return `${(amount / 1e9).toFixed(1)}B`;
  return `${amount}`;
};

export const strippedPrice = (rawPrice: string): number => {
  return Number(rawPrice.replace(/[^0-9.]/g, '')) || 0;
};
