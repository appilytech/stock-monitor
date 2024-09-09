"use client";
import {
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { StockProps, toMillions, toPercent } from "../utils";
import { useStockQuote } from "../hooks/useStockQuotes";
import Center from "../components/Center";

type AttributeProps = {
  label: string;
  formatter?: (value: any) => string;
};

const attributes: {
  [key: string]: AttributeProps;
} = {
  name: {
    label: "Name",
  },
  price: {
    label: "Today's Price",
    formatter: (value) => value.toFixed(2),
  },
  changesPercentage: {
    label: "Change %",
    formatter: (value) => toPercent(value),
  },
  dayLow: { label: "Day Low", formatter: (value) => value.toFixed(2) },
  dayHigh: { label: "Day High", formatter: (value) => value.toFixed(2) },
  marketCap: { label: "Market Cap", formatter: (value) => toMillions(value) },
  eps: { label: "EPS" },
  pe: { label: "P/E Ratio" },
  sharesOutstanding: {
    label: "Shares Outstanding",
    formatter: (value) => toMillions(value),
  },
};

export default function StockDetails({
  params,
}: {
  params: { stock: string };
}) {
  const { data, isPending, error } = useStockQuote(params.stock);

  return (
    <Stack sx={{ minHeight: 320 }}>
      <Typography variant="h6">{params.stock}</Typography>
      {data ? (
        <List>
          {Object.keys(attributes).map((key) => {
            const label = attributes[key].label;
            const formatter = attributes[key].formatter;
            const value = data[key as keyof StockProps];

            return (
              <ListItem key={key} divider>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontWeight: "500" }}
                />
                <ListItemText
                  primary={formatter ? formatter(value) : value}
                  primaryTypographyProps={{ textAlign: "end" }}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Center>
          {isPending ? (
            <CircularProgress />
          ) : (
            error && <Typography>{error.message}</Typography>
          )}
        </Center>
      )}
    </Stack>
  );
}
