// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'soft-gray':  '0 1px 16px -2px rgba(255, 0, 0, 0.36)',
      },
    },
  },
  plugins: [],
}
