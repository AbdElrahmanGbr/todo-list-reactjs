const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        "containerBg-dark": "hsl(235, 21%, 11%)",
        "containerBg-light": "hsl(236, 33%, 92%)",
        "todoBg-dark": "hsl(235, 24%, 19%)",
        "todoBg-light": "hsl(0, 0%, 98%)",
        "linedText-dark": "hsl(233, 14%, 35%)",
        "linedText-light": "hsl(233, 11%, 84%)",
        "filterText-dark": "hsl(234, 11%, 52%)",
        "filterText-light": "hsl(236, 9%, 61%)",
        "filterText-darkHover": "hsl(236, 33%, 92%)",
        "filterText-lightHover": "hsl(235, 19%, 35%)",
        "allBtn": "hsl(220, 98%, 61%)",
        "linear-gradient-1": "hsl(192, 100%, 67%)",
        "linear-gradient-2": "hsl(280, 87%, 65%)",
        "todosText-dark": "hsl(234, 39%, 85%)",
        "todosText-light": "hsl(235, 19%, 35%)",
        "borderColor": "hsl(237, 14%, 26%)",
        white: '#fff',
        gray:{
          100: '#f7fafc',
          //..
          900: '#1a202c'
        }
      },
      fontFamily: {
        "customSans": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2.5xl': '1.2rem',
      },
      fontWeight:{
        'semiBold': '700',
      },
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
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  plugins: [require('@tailwindcss/forms')],
}
