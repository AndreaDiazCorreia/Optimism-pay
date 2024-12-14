# OptimismPay Backend

A TypeScript-based Express backend for handling cross-chain transactions on the Optimism Superchain.

## Features

- Transaction initiation and status tracking
- Supported tokens listing
- Health check endpoint
- TypeScript support
- Request validation
- API key authentication
- Error handling
- Logging

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3000
   API_KEY=your-api-key-here
   ```

3. Development:
   ```bash
   npm run dev
   ```

4. Production build:
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Health Check
- `GET /api/health`
  - Returns server status

### Transactions
- `POST /api/transactions`
  - Initiates a new transaction
  - Requires API key in `x-api-key` header
  - Body: `{ senderAddress, recipientAddress, token, amount }`

- `GET /api/transactions/:id`
  - Gets transaction status
  - Requires API key in `x-api-key` header

### Tokens
- `GET /api/tokens`
  - Lists supported tokens
  - Requires API key in `x-api-key` header
