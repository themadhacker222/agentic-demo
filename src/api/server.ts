import express from 'express';
import * as handlers from './mcpHandlers';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Endpoints
app.get('/mcp/get_member_profile', handlers.getMemberProfile);
app.get('/mcp/get_recommendations', handlers.getRecommendations);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Agentic Travel API listening on http://localhost:${PORT}`);
});