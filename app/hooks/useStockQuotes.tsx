import { useQuery } from "@tanstack/react-query";
import { StockProps } from "../utils";

const fetchQuote = async (symbol: string): Promise<Array<StockProps>> => {
  const API_KEY = process.env.NEXT_PUBLIC_FMP_STOCK_API_KEY;

  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(
      response?.status === 429
        ? "API Request Limit Reached"
        : response.statusText || "Error Fetching Stock Data"
    );
  }
  const data = await response.json();
  return data;
};

const useStockQuotes = (symbols: string[]) => {
  return useQuery({
    queryKey: ["quote", [...symbols]],
    queryFn: () => fetchQuote(symbols.join()),
  });
};

const useStockQuote = (symbol: string) => {
  return useQuery({
    queryKey: ["quote", symbol],
    queryFn: () => fetchQuote(symbol),
    select: (results) => results[0],
  });
};

export { useStockQuotes, useStockQuote };