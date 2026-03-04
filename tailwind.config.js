/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Primary
        navy: '#1a237e',
        'navy-dark': '#0d1754',
        'navy-light': '#283593',
        'navy-pale': '#e8eaf6',

        // Severity
        critical: '#b71c1c',
        'critical-bg': '#ffebee',
        high: '#e65100',
        'high-bg': '#fff3e0',
        medium: '#f57f17',
        'medium-bg': '#fffde7',
        low: '#1565c0',
        'low-bg': '#e3f2fd',

        // Status
        success: '#2e7d32',
        'success-bg': '#e8f5e9',
        warning: '#f57f17',
        'warning-bg': '#fff8e1',

        // Neutrals
        'bg-page': '#f0f2f5',
        'bg-card': '#ffffff',
        border: '#e8eaf6',
        'border-dark': '#bdbdbd',

        // Text
        'text-primary': '#1a1a2e',
        'text-secondary': '#424242',
        'text-muted': '#9e9e9e',
        'text-on-navy': '#ffffff',

        // Saffron
        saffron: '#ff6f00',
        'saffron-light': '#fff3e0',
      },
    },
  },
  plugins: [],
};
