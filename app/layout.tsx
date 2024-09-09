import type { Metadata } from "next";
import Providers from "./components/Providers";
import { Stack, Paper, Typography } from "@mui/material";
import StockList from "./components/StockList";

export const metadata: Metadata = {
  title: "Stock Monitor",
  description:
    "Monitor Stock Price Movements. Demo project for converting a React App to React Native App.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Stack
            sx={{
              height: "100vh",
              px: 8,
              py: 3,
              alignItems: "center",
              background: "white",
            }}
          >
            <Typography variant="h1" sx={{ mt: 12 }}>
              Stock Monitor
            </Typography>
            <Typography
              sx={{
                mt: 2,
                maxWidth: { sm: "90%", md: "60%", textAlign: "center" },
              }}
            >
              Add your favourite stocks to a list and monitor the price. This is
              a demo project for conversion of React Web App to a React Native
              Mobile App. Stock Data provided by Financial Modeling Prep.
            </Typography>
            <Stack
              sx={{ mt: 8, width: "100%" }}
              direction="row"
              spacing={2}
              alignItems={"flex-start"}
            >
              <Paper
                sx={{
                  p: 4,
                  flex: 1,
                }}
                variant="outlined"
              >
                <StockList />
              </Paper>
              <Paper
                sx={{
                  p: 4,
                  flex: 1,
                }}
                variant="outlined"
              >
                {children}
              </Paper>
            </Stack>
            <Typography sx={{ position: "absolute", bottom: 8, right: 24 }}>
              Powered by APPiLY Technologies
            </Typography>
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
