# AidConnect - Connect Hearts, Change Lives

AidConnect is a compassionate platform that bridges the gap between generous donors and families in need. Whether it's food, shelter, or clothing - help is just a connection away.

## Features

### For Donors
- **Easy Registration**: Simple signup process with donation preferences
- **Smart Matching**: Get matched with local needs that align with your interests
- **Impact Tracking**: See the real difference you're making in your community
- **Secure Platform**: Identity verification and background checks for safety

### For Recipients
- **Request Help**: Submit detailed requests for assistance
- **Local Support**: Connect with donors in your area
- **Multiple Categories**: Food, clothing, shelter, utilities, transportation, healthcare
- **Privacy Protection**: Your information is kept secure and confidential

### Core Functionality
- **Dashboard**: Personalized dashboard for both donors and recipients
- **Real-time Matching**: Smart algorithm connects needs with available help
- **Messaging System**: Secure communication between donors and recipients
- **Location-based**: Find help or offer assistance in your local area
- **Mobile Responsive**: Works seamlessly on all devices

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/aidconnect.git
cd aidconnect
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open (https://v0-no-poverty.vercel.app/) in your browser

## Project Structure

\`\`\`
aidconnect/
├── app/
│   ├── dashboard/          # User dashboard
│   ├── login/             # Authentication
│   ├── register/          # User registration
│   ├── request-help/      # Help request form
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
\`\`\`

## Key Pages

- **Homepage** (`/`): Landing page with platform overview
- **Registration** (`/register`): Donor and recipient signup
- **Login** (`/login`): User authentication
- **Dashboard** (`/dashboard`): Personalized user dashboard
- **Request Help** (`/request-help`): Form for submitting help requests

## Contributing

We welcome contributions to AidConnect! Please read our contributing guidelines and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you need help or have questions about AidConnect, please contact our support team or open an issue on GitHub.

---

Built with ❤️ for communities in need.
