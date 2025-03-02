const dotenv = require('dotenv');
const puppeteer = require('puppeteer');
const OpenAI = require('openai');

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL;

const client = new OpenAI(apiKey);

async function fetchPageContent(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const content = await page.evaluate(() => document.body.innerText);
        await browser.close();
        return content;
    } catch (error) {
        console.error('Error fetching page content:', error);
        return null;
    }
}

async function summarizeContent(content) {
    //console.log('Content:', content); // Log the content
    if (content) {
        try {
            const response = await client.chat.completions.create({
                messages: [{ role: 'user', content: `Summarize the following content: ${content}` }],
                model: model
            }).asResponse();
            //console.log('Response:', response);
            const summary = response.choices[0].message.content.trim();
            return summary;
        } catch (error) {
            console.error('Error summarizing content:', error);
            return null;
        }
    } else {
        console.error('Content is undefined or empty');
    }
}

async function main() {
    const url = process.argv[2];
    if (!url) {
        console.error('Please provide a URL as an argument.');
        process.exit(1);
    }

    const content = await fetchPageContent(url);
    if (content) {
        const summary = await summarizeContent(content);
        if (summary) {
            console.log('Summary:', summary);
        } else {
            console.error('Failed to summarize content.');
        }
    } else {
        console.error('Failed to fetch page content.');
    }
}

main();