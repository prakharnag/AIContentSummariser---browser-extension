(async () => {
    // Define the model directly for testing
    const model = window.env?.OPENAI_MODEL || 'gpt-3.5-turbo'; // Fallback to a default model
    const url = window.location.href;
    const content = document.body.innerText;

    const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
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