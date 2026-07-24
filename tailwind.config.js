/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmBeige:     '#F7F1E8',
        warmBeigeDark: '#F3E8D5',
        pastelPurple:  '#C9B6E4',
        mutedLavender: '#E8DDF2',
        dustyPurple:   '#8D6AAE',
        darkPlum:      '#302637',
        greyBrown:     '#6F6268',
        lightLavender: '#F4EFF9',
        softCream:     '#F9F5EE',
      },
      fontFamily: {
        // Display font — Kanit: hero titles, section headings, large numbers, project names
        kanit:   ['Kanit', 'sans-serif'],
        // Body / UI font — Manrope: paragraphs, nav, buttons, labels, captions
        manrope: ['Manrope', 'sans-serif'],
      },
      lineHeight: {
        body: '1.65',  // comfortable reading line-height for Manrope paragraphs
      },
      letterSpacing: {
        body: '-0.01em', // subtle negative tracking for clean Manrope body text
      },
    },
  },
  plugins: [],
}
