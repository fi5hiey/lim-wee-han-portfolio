/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: 'rgb(var(--night) / <alpha-value>)',
        coal: 'rgb(var(--coal) / <alpha-value>)',
        sumi: 'rgb(var(--sumi) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ash: 'rgb(var(--ash) / <alpha-value>)',
        crimson: 'rgb(var(--crimson) / <alpha-value>)',
        vermil: 'rgb(var(--crimson-hi) / <alpha-value>)',
        moss: 'rgb(var(--moss) / <alpha-value>)',
        silver: 'rgb(var(--silver) / <alpha-value>)',
      },
      fontFamily: {
        // Gloock for Latin display; Japanese glyphs fall through to Shippori Mincho
        serif: ['Gloock', '"Shippori Mincho B1"', '"Hiragino Mincho ProN"', '"Yu Mincho"', 'Georgia', 'serif'],
        // Brush calligraphy for decorative kanji only
        brush: ['"Yuji Syuku"', '"Shippori Mincho B1"', '"Yu Mincho"', 'serif'],
        sans: ['"Zen Kaku Gothic New"', '"Hiragino Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { label: '0.22em' },
    },
  },
  plugins: [],
};
