"use client";
import React, { useMemo, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useStockSearch } from "../hooks/useStockSearch";
import { debounce } from "@mui/material/utils";
import { StockProps } from "../utils";

export default function FindStock({
  stock,
  onChange,
}: {
  stock: StockProps | null
  onChange?: (stock: StockProps | null) => void;
}) {
  const [symbol, setSymbol] = useState("");
  const { data, isPending, error, isError } = useStockSearch(symbol);

  const getSymbol = useMemo(
    () => debounce((value) => setSymbol(value), 400),
    []
  );

  return (
    <Autocomplete
      filterOptions={(x) => x}
      sx={{display: 'flex', flex: 1}}
      options={data || []}
      value={stock}
      loading={isPending}
      noOptionsText={symbol ? "No Matching Stocks" : "Search Stock by typing"}
      isOptionEqualToValue={(option: StockProps, value: StockProps) => option.symbol === value.symbol}
      renderInput={(params) => {
        return <TextField {...params} label="Search Stock Symbol" />;
      }}
      onInputChange={(_, value) => getSymbol(value)}
      getOptionLabel={(option) => `${option.symbol} (${option.name})`}
      onChange={(event, value) => onChange?.(value)}
    />
  );
}
