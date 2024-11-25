module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        // các loader khác...
      ],
    },
    // các phần cấu hình khác...
  };
  