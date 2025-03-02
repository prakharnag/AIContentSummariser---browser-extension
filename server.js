const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Add this line to parse JSON request bodies
app.use(express.json());

app.use('/api', createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/v1/completions',
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Authorization', `Bearer ${process.env.OPENAI_API_KEY}`);
    }
}));

app.use(express.static('dist'));

// New endpoint for summarization
app.post('/summarize', async (req, res) => {
    const { content } = req.body; // Assuming content is sent in the request body

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct', // or any other model you prefer
                prompt: `Summarize the following content into bullet points: ${content}`,
                max_tokens: 150, // Adjust as needed
            }),
        });

        const data = await response.json();
        
        // Format the output into bullet points
        const bulletPoints = data.choices[0].text.split('\n').map(point => `- ${point}`).join('\n');
        
        res.json({ summary: bulletPoints });
        console.log(bulletPoints);
    } catch (error) {
        console.error('Error summarizing content:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
