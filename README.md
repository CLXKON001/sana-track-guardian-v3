# SanaGuard - Blockchain Child Safety Tracking Platform

## Project Overview

SanaGuard is a decentralized child safety tracking platform built for the BlockDAG Hackathon. It combines blockchain technology with real-time location tracking to provide parents with secure, transparent, and immutable child safety monitoring.

## 🏆 Hackathon Compliance

### Tech Stack Requirements ✅

**Frontend:**
- ✅ Built with React.js (v18.3.1) using Vite
- ✅ TailwindCSS for responsive UI design
- ✅ TypeScript for type safety
- ✅ shadcn/ui component library

**Smart Contracts:**
- ✅ Written in Solidity (EVM-compatible)
- ✅ Deployable on BlockDAG network
- ✅ Includes child registration, location updates, and emergency alert contracts

**Blockchain Integration:**
- ✅ Uses ethers.js for smart contract interaction
- ✅ MetaMask wallet connection via custom useWallet hook
- ✅ BlockDAG network compatibility
- ✅ Web3 integration for decentralized child data storage

**Deployment:**
- ✅ Smart contracts deployable to BlockDAG-compatible EVM chains
- ✅ Frontend hosted on Vercel/Netlify/IPFS compatible
- ✅ Environment variables for production deployment

### Key Features

🔐 **Blockchain Security**: All child data stored immutably on BlockDAG network

📍 **Real-time Tracking**: Interactive Mapbox integration with light theme

🚨 **Emergency Alerts**: Instant notifications to emergency contacts

👥 **Multi-child Management**: Track multiple children from one dashboard

📱 **Mobile Responsive**: Works seamlessly on all devices

🔗 **Web3 Wallet Integration**: Connect via MetaMask for blockchain interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MetaMask browser extension
- Mapbox account (for mapping features)

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

For production deployment, set these environment variables:

```bash
# Mapbox Configuration (Public Token - Safe to expose)
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGF...

# BlockDAG Network Configuration
VITE_BLOCKCHAIN_RPC_URL=https://blockdag-rpc-url.com
VITE_CHAIN_ID=your_chain_id
```

**Note about Mapbox Token**: The Mapbox public token is safe to include in frontend code and environment variables. Users will NOT need to enter their token every time - it's automatically loaded from environment variables in production.

## 🔧 Architecture

### Frontend Components
- **Dashboard**: Main tracking interface with real-time child status
- **TrackingMap**: Interactive Mapbox GL JS integration with custom markers
- **EmergencyAccess**: Quick access to emergency contacts and alerts
- **WalletConnection**: MetaMask integration for blockchain interactions

### Smart Contract Structure
```solidity
// Core contracts for BlockDAG deployment
- ChildRegistry.sol: Register and manage child profiles
- LocationTracker.sol: Store encrypted location data
- EmergencyAlert.sol: Handle emergency notifications
- ParentAccess.sol: Manage parent permissions and access control
```

### Blockchain Integration
- **useWallet Hook**: Custom React hook for MetaMask connectivity
- **Web3 Integration**: Direct interaction with BlockDAG network
- **Smart Contract Calls**: Real-time blockchain data synchronization
- **Decentralized Storage**: Child data stored on-chain for transparency

## 📦 Deployment Options

### Option 1: Lovable Platform (Quickest)
1. Open [Lovable Project](https://lovable.dev/projects/86c341ec-8bf5-4e0b-8aaf-f4d8c9b75a30)
2. Click Share → Publish
3. Your app is live instantly with automatic HTTPS

### Option 2: Vercel (Recommended for Production)
```bash
# Connect to Vercel
npx vercel

# Set environment variables in Vercel dashboard
# Deploy automatically on git push
```

### Option 3: Netlify
```bash
# Build for production
npm run build

# Upload dist/ folder to Netlify
# Or connect GitHub repo for auto-deployment
```

### Option 4: IPFS (Fully Decentralized)
```bash
# Build for production
npm run build

# Upload to IPFS using Pinata, Fleek, or IPFS Desktop
# Access via IPFS gateway: https://ipfs.io/ipfs/[hash]
```

## 🌍 BlockDAG Deployment

### Smart Contract Deployment
```bash
# Using Hardhat (recommended)
npx hardhat deploy --network blockdag

# Using Foundry
forge create --rpc-url [BLOCKDAG_RPC] --private-key [KEY] src/ChildRegistry.sol:ChildRegistry
```

### Network Configuration
Add BlockDAG network to MetaMask:
- **Network Name**: BlockDAG Mainnet
- **RPC URL**: [Your BlockDAG RPC endpoint]
- **Chain ID**: [BlockDAG Chain ID]
- **Currency Symbol**: BDAG
- **Block Explorer**: [BlockDAG Explorer URL]

## 🎯 Judging Criteria Alignment

**Innovation & Creativity**: Novel approach combining child safety with blockchain transparency
**Technical Implementation**: Full-stack React + Solidity + BlockDAG integration
**UI/UX Design**: Clean, responsive design with intuitive emergency access
**Blockchain Integration**: Complete Web3 stack with MetaMask connectivity
**BlockDAG/EVM Standards**: Full EVM compatibility with BlockDAG-specific optimizations

## 🔗 External Access

### Production URLs
- **Live Application**: Available after deployment via chosen platform
- **GitHub Repository**: Public repo with complete source code
- **Demo Video**: [Link to 3-minute demo video]
- **Smart Contracts**: Deployed on BlockDAG testnet/mainnet

### API Endpoints
The app connects to:
- BlockDAG RPC endpoints for blockchain data
- Mapbox APIs for mapping functionality
- Emergency contact services for notifications

## 📱 Mobile Access

The application is fully responsive and can be accessed on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)
- Progressive Web App (PWA) capabilities for offline access

## 🛡️ Security Features

- **Decentralized Data**: No central point of failure
- **Encrypted Communications**: All location data encrypted before blockchain storage
- **Smart Contract Auditing**: Contracts designed for security best practices
- **Emergency Protocols**: Immediate alert systems independent of central servers

## 🤝 Contributing

This project was built for the BlockDAG Hackathon. For development:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

Built for BlockDAG Hackathon 2024. Open source under MIT License.

---

**Team**: Team Sana
**Demo**: [Link to live demo]
**Video**: [Link to demo video]
**Contracts**: [BlockDAG contract addresses]
