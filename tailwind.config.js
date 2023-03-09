module.exports = {
    important: true,
    darkMode: 'class',
    content: [
      './src/**/*.js',
      // './src/tailwind_extra.js',
      // './src/safelist.js'
    ],
    theme: {
      extend: {
        padding: {
          '1/2': '50%',
          '1/5': '20%',
          full: '100%',
        },
      }
    },
    safelist: [
      {
        pattern: /bg-(.+)-(.+)/,
        variants: ['hover'],
      },
      {
        pattern: /top-(.+)/,
      },
      {
        pattern: /left-(.+)/,
      },
      {
        pattern: /right-(.+)/,
      },
      {
        pattern: /bottom-(.+)/,
      },
      {
        pattern: /text-(.+)/,
        variants: ['hover'],
      },
      {
        pattern: /text-(.+)-(.+)/,
        variants: ['hover'],
      },
      {
        pattern: /font-(.+)/,
      },
      {
        pattern: /p-(.+)/,
      },
      {
        pattern: /p-(.+)-(.+)/,
      },
      {
        pattern: /m-(.+)-(.+)/,
      },
      {
        pattern: /mt-(.+)/,
      },
      {
        pattern: /h-(.+)/,
      },
      {
        pattern: /w-(.+)/,
      },
      {
        pattern: /flex-(.+)/,
      },
      {
        pattern: /min-(.+)-(.+)/,
      },
      {
        pattern: /min-h-(.+)/,
      },
      {
        pattern: /max-(.+)-(.+)/,
      },
      {
        pattern: /border-(.+)/,
        variants: ['hover']
      },
      {
        pattern: /opacity-(.+)/,
      },
      {
        pattern: /border-(.+)-(.+)/,
        variants: ['hover'],
      },
      {
        pattern: /space-(.+)-(.+)/,
      },
      {
        pattern: /justify-(.+)/,
      },
      {
        pattern: /items-(.+)/,
      },
      {
        pattern: /grid-(.+)-(.+)/,
        variants: ['lg', 'xl', '2xl', '3xl'],
      },
      {
        pattern: /translate-(.+)-(.+)/,
      },
      {
        pattern: /scale-(.+)-(.+)/,
      },
      {
        pattern: /scale-(.+)/,
      },
      {
        pattern: /to-(.+)-(.+)/,
      },
      {
        pattern: /from-(.+)-(.+)/,
      }
    ],
    plugins: [
      require('tailwind-scrollbar'),
      require('@tailwindcss/forms'),
      // require('tailwind-safelist-generator')({
      //   path: 'safelist.js',
      //   patterns: [
      //     'text-{colors}',
      //     'bg-{colors}',
      //     'p-{gap}'
      //   ]
      // })
    ]
  }
  