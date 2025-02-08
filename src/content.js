(async () => {
    const apiKey = 'YOUR_OPENAI_API_KEY';
    const url = window.location.href;
    const content = document.body.innerText;

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: `Summarize the following content: ${content}`,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const summary = data.choices[0].text.trim();

    if (typeof browser !== 'undefined') {
        // For Firefox and Safari
        browser.runtime.sendMessage({ summary });
    } else if (typeof chrome !== 'undefined') {
        // For Chrome
        chrome.runtime.sendMessage({ summary });
    } else {
        alert(`Summary: ${summary}`);
        }
})();