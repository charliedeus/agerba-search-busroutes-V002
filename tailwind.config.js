/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/bg-02.jpg')",
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      },
      fontFamily: {
        sans: 'var(--font-inter)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
