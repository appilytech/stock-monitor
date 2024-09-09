"use client";
import React, { useState } from "react";
import {
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import FindStock from "./FindStock";
import { StockProps } from "../utils";
import Center from "./Center";

import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import stock, { add, remove } from "@/app/store/stock";
import { RootState } from "../store/store";
import { useStockQuotes } from "../hooks/useStockQuotes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StockList() {
  const pathname = usePathname();
  const [newStock, setNewStock] = useState<StockProps | null>(null);
  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stocks);

  const { data: quotes } = useStockQuotes(stocks.map((stock) => stock.symbol));

  const addStockHandler = (stock: StockProps | null) => {
    if (stock) {
      dispatch(add(stock));
      setNewStock(null);
    }
  };

  const removeHandler = (stock: StockProps) => {
    dispatch(remove(stock.symbol));
  };

  const StockItem = ({ stock }: { stock: StockProps }) => {
    return (
      <ListItem
        key={stock.symbol}
        disableGutters
        secondaryAction={
          <IconButton onClick={() => removeHandler(stock)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <Link href={"/" + stock.symbol}>
          <ListItemButton selected={pathname === "/" + stock.symbol}>
            <ListItemText primary={`${stock.symbol} (${stock.name})`} />
            {stock.price && (
              <Stack>
                <Typography>{stock?.price}</Typography>
                <Typography
                  color={stock?.changesPercentage < 0 ? "red" : "green"}
                >
                  {stock?.changesPercentage}
                </Typography>
              </Stack>
            )}
          </ListItemButton>
        </Link>
      </ListItem>
    );
  };

  return (
    <Stack sx={{ minHeight: 320 }}>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <FindStock stock={newStock} onChange={setNewStock} />
        <IconButton onClick={() => addStockHandler(newStock)}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Typography variant="h6" sx={{ my: 3 }}>
        Your WishList
      </Typography>
      {(quotes || stocks)?.length > 0 ? (
        <List>
          {(quotes || stocks).map((quote) => (
            <StockItem stock={quote} />
          ))}
        </List>
      ) : (
        <Typography>
          No items in your wishlist. Add stocks to start monitoring.
        </Typography>
      )}
    </Stack>
  );
}
