Mini GitHub Explorer
A modern, responsive GitHub user search application built with Next.js, TypeScript, and Tailwind CSS.
Features

1. Search GitHub users by username
2. Display user profile information (avatar, name, bio, stats)
3. Show latest 5 repositories
4. Google/GitHub authentication
5. Loading states and error handling
6. Fully responsive design
7. Clean, modern UI with shadcn/ui components

Tech Stack

Framework: Next.js 15.5
Language: TypeScript
Styling: Tailwind CSS
Components: shadcn/ui
Authentication: NextAuth.js
Icons: Lucide React

Getting Started
Prerequisites

Node.js 18.17 or later
npm or yarn package manager

Installation

Clone the repository:

bashgit clone https://github.com/Bookieblue/github-explorer.git
cd mini-github-explorer

Install dependencies:

bashnpm install
# or
yarn install

Set up environment variables:
Create a .env.local file in the root directory:

envNEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-app-id
GITHUB_SECRET=your-github-app-secret
Setting Up Authentication (Optional)
To enable authentication features:

Google OAuth:

Go to Google Cloud Console
Create a new project or select existing one
Enable Google+ API
Create OAuth 2.0 credentials
Add http://localhost:3000/api/auth/callback/google to authorized redirect URIs


GitHub OAuth:

Go to GitHub Settings > Developer settings > OAuth Apps
Create a new OAuth App
Set Authorization callback URL to http://localhost:3000/api/auth/callback/github



Running the Application

Start the development server:

bashnpm run dev
# or
yarn dev

Open http://localhost:3000 in your browser

Usage

Authentication: Sign in with Google or Github
Search: Type any GitHub username and press enter or click the search button
View Results: See user profile, stats, and their latest 5 repositories

