import React from "react";
import { Box } from "@mui/material";

export default function Center({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexGrow: 1
      }}
    >
      {children}
    </Box>
  );
}
