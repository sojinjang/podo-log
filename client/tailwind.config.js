const BOOK_COLOR = [
  "000000",
  "008fff",
  "50e3c2",
  "82af20",
  "6200ee",
  "018786",
  "309054",
  "b00020",
  "2c3f50",
  "e054b8",
  "e39801",
  "ff5436",
];

const BG_BOOK_COLOR = BOOK_COLOR.reduce((acc, cur) => {
  acc.push(`bg-[#${cur}]`);
  return acc;
}, []);

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  safelist: BG_BOOK_COLOR,
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
        notosans: ["Noto Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
};
