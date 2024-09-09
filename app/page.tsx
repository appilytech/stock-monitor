import { Typography, Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack sx={{ minHeight: 320, justifyContent: "center" }}>
      <Typography textAlign="center">
        Select a Stock Symbol to see details
      </Typography>
    </Stack>
  );
}
