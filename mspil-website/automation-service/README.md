# MSPIL Marketing Automation Service

AI-powered marketing agent for automated news monitoring, content creation, and social media management.

## Features

- 🤖 **AI Chat Interface** - Natural language interaction for content creation
- 📰 **News Monitoring** - Automated scraping of sugar/ethanol industry news
- 💼 **LinkedIn Integration** - Automated posting with images
- 🎨 **AI Image Generation** - DALL-E 3 powered marketing visuals
- 📅 **Content Scheduling** - Plan and automate posts
- 📊 **Analytics Tracking** - Performance metrics and insights

## Setup

1. **Install Dependencies**
```bash
cd automation-service
npm install
```

2. **Environment Variables**
Copy `.env.example` to `.env` and fill in:
- `OPENAI_API_KEY` - OpenAI API key for GPT-4 and DALL-E 3
- `LINKEDIN_ACCESS_TOKEN` - LinkedIn OAuth token
- `LINKEDIN_PAGE_ID` - Your LinkedIn company page ID
- `DATABASE_URL` - PostgreSQL connection string

3. **Database Setup**
The service will automatically create required tables on first run.

4. **Run Service**
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Chat
- `POST /api/chat/message` - Send message to AI agent
- `GET /api/chat/history/:sessionId` - Get chat history
- `GET /api/chat/commands` - List available commands

### News
- `GET /api/news/latest` - Get latest industry news
- `GET /api/news/category/:category` - News by category
- `GET /api/news/search?q=query` - Search news

### Content
- `POST /api/content/create` - Create content post
- `POST /api/content/generate-image` - Generate AI image
- `POST /api/content/schedule` - Schedule future post
- `GET /api/content/analytics` - Get performance metrics

## WebSocket Events

Connect to WebSocket for real-time chat:
- `join_chat` - Join marketing chat room
- `user_message` - User message broadcast
- `agent_message` - AI agent response

## Deployment to Railway

1. Create new Railway project
2. Add PostgreSQL database
3. Set environment variables
4. Deploy from GitHub:
```bash
railway login
railway link
railway up
```

## Natural Language Commands

The AI agent understands commands like:
- "Post about our new ethanol milestone to LinkedIn"
- "Generate an image of our sugar factory"
- "What are the latest sugar industry news?"
- "Schedule a post for tomorrow at 10 AM"
- "Show me last week's post performance"

## Security Notes

- All API keys stored as environment variables
- Rate limiting on LinkedIn API (100 posts/day)
- OpenAI rate limiting (60 requests/minute)
- HTTPS only in production
- Database connections use SSL

## Monitoring

- Health check: `GET /health`
- Logs stored in `error.log` and `combined.log`
- Real-time monitoring via Railway dashboard