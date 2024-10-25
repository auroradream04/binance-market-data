# Binance Market Data Generator

This project is a web application built with Next.js that allows users to generate and download historical market data from Binance. The application provides a user-friendly interface to select trading pairs, time intervals, and date ranges for data extraction.

## Features

- Fetches historical market data from Binance.
- Allows selection of multiple trading pairs.
- Supports various time intervals for data granularity.
- Provides date range selection for data extraction.
- Generates Excel files with the selected market data.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/auroradream04/binance-market-data-generator.git
   cd binance-market-data-generator
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Usage

1. Open the application in your browser.
2. Select the trading pairs you are interested in.
3. Choose the desired time interval and date range.
4. Click the "Generate Market Data" button to generate and download the market data.

## Self-Hosting

This application is designed to be self-hosted. There is no public demo available. The primary goal is to generate files locally, with the website serving as the user interface.

## Project Structure

- `src/app`: Contains the main application components and pages.
- `src/app/utils.ts`: Utility functions for fetching data and handling Excel files.
- `src/app/main.ts`: Server-side logic for generating market data.
- `src/app/components/Dashboard.tsx`: The main dashboard component for user interaction.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) for the application framework.
- [Binance API](https://binance-docs.github.io/apidocs/spot/en/) for market data.
- [XLSX](https://github.com/SheetJS/sheetjs) for Excel file generation.
