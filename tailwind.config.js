module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)", surface: "var(--surface)", ink: "var(--ink)",
        muted: "var(--muted)", line: "var(--line)", brand: "var(--brand)",
        brandsoft: "var(--brandsoft)", brandink: "var(--brandink)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
