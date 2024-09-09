import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";
import { StockProps } from "../utils";;

const fetchStocks = async (symbol = ""): Promise<StockProps[]> => {
  const qs = queryString.stringify({
    query: symbol,
    apikey: process.env.NEXT_PUBLIC_FMP_STOCK_API_KEY,
  });

  const response = await fetch(
    "https://financialmodelingprep.com/api/v3/search?" + qs
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

const useStockSearch = (symbol = "") => {
  return useQuery({
    queryKey: ["stocks", symbol],
    queryFn: () => fetchStocks(symbol),
  });
};

export { useStockSearch };
