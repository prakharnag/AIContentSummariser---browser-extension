document.getElementById('summarizeBtn').onclick = async () => {
    const content = document.getElementById('content').value;
    console.log(content);
    const response = await fetch('http://localhost:3000/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    const result = await response.json();
    document.getElementById('result').textContent = result.summary;
}; 