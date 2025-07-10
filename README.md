# JobPair AI

A comprehensive AI-powered career development platform designed to assist users in various aspects of their professional growth. The platform offers a range of intelligent tools and features to help users analyze their resumes, generate career roadmaps, create effective cover letters, and practice with mock interviews.

## Features

### 🔍 Resume Analyzer

Upload your resume and receive detailed analysis and insights to improve its effectiveness. Get actionable feedback on content, structure, and formatting.

### 🗺️ Roadmap Generator

Create a personalized roadmap for your career, highlighting key milestones and goals. Plan your professional journey with AI-guided recommendations.

### 📝 Cover Letter Generator

Generate well-structured and effective cover letters tailored to your job applications. Customize content based on job descriptions and your experience.

### 🎤 Mock Interview

Practice your interview skills with AI-powered mock interviews. Receive detailed feedback and suggestions for improvement to boost your confidence.

### 📊 History

View your past activities and progress on the platform. Track your career development journey and revisit previous analyses.

## Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Payments**: Clerk Billing
- **Database**: Prisma ORM
- **PDF Processing**: WebPDFLoader
- **File Upload**: ImageKit
- **AI Integration**: Gemini API
- **Webhooks**: Svix

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Database (PostgreSQL recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sowdarjya/jobpair_ai.git
cd jobpair-ai
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in the required environment variables:

- Database connection string
- Clerk authentication keys
- Clerk billing configuration
- Gemini API key
- ImageKit configuration (public key, private key, URL endpoint)

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign up/Login**: Create an account using Clerk authentication
2. **Choose Plan**: Select a subscription plan through Clerk Billing
3. **Upload Resume**: Navigate to the Resume Analyzer and upload your PDF resume
4. **Generate Roadmap**: Use the Roadmap Generator to create your career plan
5. **Create Cover Letters**: Generate tailored cover letters for job applications
6. **Practice Interviews**: Use the Mock Interview feature to improve your skills
7. **Track Progress**: View your history to monitor your career development journey
