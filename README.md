# LAH - Tranlate Manglish to English

A single-page web application for Kakitangan.com users to translate Manglish to Oxford English.

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

## Development
- Development server runs on `http://localhost:3000`
- Uses Vite for fast development
- TypeScript for type safety
