# Manglish to Oxford English Translator

A single-page web application for translating Manglish to Oxford English using the Kakitangan.com API.

## Features
- Two text boxes: Input (Manglish) and Output (Oxford English)
- Copy to clipboard button
- API key authentication via modal
- Token stored in cookies for 7 days

## Setup

1. Install dependencies:
```bash
npm install -g yarn
yarn install
```

2. Start development server:
```bash
yarn run dev
```

3. Build for production:
```bash
yarn run build
```

4. Deploy to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

## Environment Variables
Create a `.env` file with:
```
VITE_API_URL=https://api.kakitangan.com
```

## Development
- Development server runs on `http://localhost:3000`
- Uses Vite for fast development
- TypeScript for type safety
