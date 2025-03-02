// This file contains the background script for the extension. It handles events and manages the extension's lifecycle, such as responding to browser actions and managing state.

chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Summarizer extension installed.');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Extension started');
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'https://www.example.com' });
});
    
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.summary) {
        console.log(`Summary received: ${message.summary}`);
        // You can add more logic here to handle the summary, e.g., display it in a popup
    }
});

// You can add more event listeners or functionality as needed