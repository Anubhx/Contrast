# Environment Variables Configuration

To run the Contrast MVP locally with all its features, you need to set up your `.env.local` file in the root of your project (`contrast/.env.local`).

Copy the block below and paste it into your `.env.local` file, replacing the placeholder values with your actual keys.

```env
# 1. Gemini API
# Required for generating the AI-powered audit explanations
# Get this from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="your_gemini_api_key_here"

# 2. Supabase Storage
# Required for rate limiting, URL caching, and recent audits list
# Get these by creating a Supabase project, navigating to Project Settings -> API.
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url_here"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key_here"

# 3. Browserless
# Required to run headless Chrome in the cloud instead of inside Vercel
# Get this from: https://www.browserless.io/
BROWSERLESS_API_KEY="your_browserless_api_key_here"

# 4. Base URL
# Required for absolute URL resolution in certain routes (like the report page)
NEXT_PUBLIC_URL="http://localhost:3000"
```

## Quick Setup for Vercel Users
If your project is linked to Vercel and you have set up the variables in your Vercel dashboard, you can automatically pull them down to your local machine by running:

```bash
vercel env pull .env.local
```
