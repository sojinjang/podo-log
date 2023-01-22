module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "bg-pink": "#FFE0F3",
        "bg-middle-purple": "#E8DBFF",
        "bg-purple": "#F6F1FF",
        "purple-1000": "#BB86FC",
        "gray-1000": "#959595",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        jua: ["Jua", "sans-serif"],
        dohyeon: ["Do Hyeon", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
};
