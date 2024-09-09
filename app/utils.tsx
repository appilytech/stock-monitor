export type StockProps = {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  dayLow: number;
  dayHigh: number;
  marketCap: number;
  eps: number;
  pe: number;
  sharesOutstanding: number;
};

export const toMillions = (num: number) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num.toString();
};

export const toPercent = (num: number) => {
  return num.toFixed(2) + "%"
}
