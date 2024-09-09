'use client';
import { Inter } from "next/font/google";
import { createTheme } from '@mui/material/styles'

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
    typography: {
      fontFamily: inter.style.fontFamily,
      h1: {
        fontSize: 64
      },
      body1: {
        fontSize: 18
      }
    },
  });
  
  export default theme;