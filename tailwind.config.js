/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'image-deskLight':
            "url('./images/bg-desktop-light.jpg')",
        'image-deskDark':
            "url('./images/bg-desktop-dark.jpg')",
        'image-mLight':
            "url('./images/bg-mobile-light.jpg')",
        'image-mDark':
            "url('./images/bg-mobile-dark.jpg')"
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
}
