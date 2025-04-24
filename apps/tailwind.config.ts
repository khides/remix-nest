import { DEFAULT_COOKIE_OPTIONS } from "@supabase/ssr";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    {
      pattern:
        /bg-andTopic-(main1|main2|main3|balance1|balance2|balance3|vari1|vari2|vari3|accent)-(200|300|400|500|600|700)/,
    },
    {
      pattern:
        /text-andTopic-(main1|main2|main3|balance1|balance2|balance3|vari1|vari2|vari3|accent)-(200|300|400|500|600|700)/,
    },
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "default-color": "#5d5d5d",
        "fgColor-default": "#1f2328",
        "fgColor-muted": "#636c76",
        "bgColor-hover": "#eef1f4",
        "bgColor-rest": "#f6f8fa",
        "bgColor-selected": "#d0d7de",
        "bcColor-accent-emphasis": "#0969da",
        "AppHeader-bg": "#f6f8fa",
        "borderColor-default": "#d0d7de",
        "borderColor-rest": "#d0d7de",
        "borderColor-muted": "rgba(208, 215, 222, 0.7)",
        "iconColor-rest": "#636c76",
        andTopic: {
          dark: "#27272A",
          main1: {
            DEFAULT: "#00A272",
            200: "#E6F9F1",
            300: "#C3F0E2",
            400: "#7ED8C4",
            500: "#00A272",
            600: "#008D69",
            700: "#006F51",
          },
          main2: {
            DEFAULT: "#A0D7D6",
            200: "#F0F9F9",
            300: "#E6F9F9",
            400: "#C3F0F0",
            500: "#A0D7D6",
            600: "#8CBEBD",
            700: "#6F9796",
          },
          main3: {
            DEFAULT: "#D8E480",
            200: "#F9FAF0",
            300: "#F4F9E6",
            400: "#EAF3CD",
            500: "#D8E480",
            600: "#BEC96A",
            700: "#97964F",
          },
          balance1: {
            DEFAULT: "#C3D600",
            200: "#F9FAE6",
            300: "#F6FAE6",
            400: "#F0F6E6",
            500: "#C3D600",
            600: "#A9BE00",
            700: "#8C9F00",
          },
          balance2: {
            DEFAULT: "#EBF5EC",
            200: "#F5FAF7",
            300: "#ECF6ED",
            400: "#D4E9D9",
            500: "#EBF5EC",
            600: "#D8EDDF",
            700: "#BFE2C7",
          },
          balance3: {
            DEFAULT: "#7CBEB3",
            200: "#E6F2F1",
            300: "#C3E6E1",
            400: "#7ECFC7",
            500: "#7CBEB3",
            600: "#6CAAA2",
            700: "#4E8E86",
          },
          vari1: {
            DEFAULT: "#945B57",
            200: "#F2E9E8",
            300: "#E6D3D1",
            400: "#C4A9A6",
            500: "#945B57",
            600: "#7C4A46",
            700: "#643935",
          },
          vari2: {
            DEFAULT: "#00A5B9",
            200: "#E6F7F9",
            300: "#C3EFF4",
            400: "#7EDDF0",
            500: "#00A5B9",
            600: "#008EA5",
            700: "#006F7F",
          },
          vari3: {
            DEFAULT: "#F4B1B2",
            200: "#F9E6E6",
            300: "#F9E6E6",
            400: "#F3C3C4",
            500: "#F4B1B2",
            600: "#DE9C9D",
            700: "#B77F80",
          },
          accent: {
            DEFAULT: "#004C46",

            200: "#00A272",
            300: "#007D75",
            400: "#006A6A",
            500: "#004C46",
            600: "#003F3A",
            700: "#002F2F",
          },
          suggestion: "#FFF9CD",
        },
        slate: {
          "50": "#f8fafc",
          "100": "#f1f5f9",
          "200": "#E2E8F0",
          "300": "#cbd5e1",
          "400": "#94a3b8",
          "500": "#64748b",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Noto Sans"',
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {},
      inset: {
        "0.5": "0.125rem", // 2px 相当
        "0.25": "0.0625rem", // 1px 相当
      },
      opacity: {
        "0": "0",
        "5": "0.05",
        "10": "0.1",
        "20": "0.2",
        "25": "0.25",
        "30": "0.3",
        "40": "0.4",
        "50": "0.5",
        "60": "0.6",
        "70": "0.7",
        "75": "0.75",
        "80": "0.8",
        "90": "0.9",
        "95": "0.95",
        "100": "1",
      },
      scale: {
        "200": "2",
      },
      sidebar: {
        DEFAULT: "hsl(var(--sidebar-background))",
        foreground: "hsl(var(--sidebar-foreground))",
        primary: "hsl(var(--sidebar-primary))",
        "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        accent: "hsl(var(--sidebar-accent))",
        "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        border: "hsl(var(--sidebar-border))",
        ring: "hsl(var(--sidebar-ring))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
