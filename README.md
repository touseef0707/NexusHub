# NexusHub - YouTube Collaboration Platform

NexusHub is a SaaS platform designed for YouTubers and freelance video editors to collaborate on video projects. It provides a centralized workspace for managing projects, assigning tasks, and communicating with team members.

## Features

- **User Authentication**: Secure authentication with Clerk, including role-based access control.
- **Role-Based Access**: Different interfaces and permissions for YouTubers (Creators) and Video Editors.
- **Project Management**: Create, manage, and track video projects from start to finish.
- **Team Collaboration**: Invite editors to your organization and assign them to specific projects.
- **Real-time Notifications**: Stay updated with real-time notifications about project updates and comments.
- **YouTube Integration**: Connect your YouTube account to access your channel data (coming soon).

## Tech Stack

- **Frontend**: Next.js with TypeScript and App Router
- **Authentication**: Clerk
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Real-time Updates**: Socket.io

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nexushub.git
cd nexushub
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

You'll need to create a Clerk application at [clerk.dev](https://clerk.dev) and obtain your API keys.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Setting Up Clerk

1. Create an account at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Go to API Keys and copy your Publishable Key and Secret Key
4. Add them to your `.env.local` file
5. Configure your OAuth providers (Google) in the Clerk dashboard

## Setting Up User Roles

To set up user roles in Clerk:

1. Go to your Clerk Dashboard
2. Navigate to JWT Templates
3. Add a custom claim for the user's role
4. Use the Clerk Admin API to update user metadata with their role (creator or editor)

## Deployment

The application can be deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add your environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
