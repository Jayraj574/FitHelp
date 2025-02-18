/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        rubik:['Rubik-Regular','Sans-Serif'],
        "Rubik-Bold":["Rubik-Bold","sans-serif"],
        "Rubik-Italic":["Rubik-Italic","sans-serif"],
        "Rubik-Extrabold":["Rubik-Extrabold","sans-serif"],
        "Rubik-Light":["Rubik-Light","sans-serif"],
        "Rubik-Medium":["Rubik-Medium","sans-serif"],
        "Rubik-SemiBold":["Rubik-SemiBold","sans-serif"],
      },
      colors: {
        "primary":{
          100:'#F8D2D2',
          200:'#0061ff1A',
          300:'#0061ff',
        },
        accent:{
          100:'#FBFBFD'
        },
        black:{
          DEFAULT:'#000000',
          100:'#8c8e98',
          200:'#666876',
          300:'#191d31',
        },
        danger:'#f75555'
      }
    },
  },
  plugins: [],
}