/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sora: ["Sora"],
    },
    extend: {},

    colors: {
      "white": "white",
      "red": "red",
      "blue": "rgb(104, 187, 255);",
      "purple-cus":"rgb(119, 119, 252)",
      "white-cus":"rgb(239, 240, 255)",
    }
    
    ,
    boxShadow:{

      "boxShadow":"0px 0px 14px 3px rgb(222, 224, 250)",
    }
  },
  plugins: [],
}