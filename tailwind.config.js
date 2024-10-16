/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#343541', // Main background color
        'message-user': '#202123', // User message background
        'message-assistant': '#444654', // Assistant message background
        'input-bg': '#40414F', // Input area background
        'primary-text': '#FFFFFF', // Primary text color
        'secondary-text': '#ACB2BE', // Secondary text color
        'accent-color': '#10A37F', // Accent color (e.g., for buttons)
      },
    },
  },
  plugins: [],
}
