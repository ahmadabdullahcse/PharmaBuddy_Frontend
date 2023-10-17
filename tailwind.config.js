/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#20807A",
          secondary: "#F5F5F5",
          accent: "#F5F5F5",
          neutral: "#A0B3AB",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
