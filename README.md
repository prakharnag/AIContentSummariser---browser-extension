# My Browser Extension

This is a simple web browser extension that demonstrates how to create a browser extension with a background script and a content script.

## Project Structure

```
my-browser-extension
├── src
│   ├── background.js      # Background script for handling events and managing extension lifecycle
│   ├── content.js         # Content script for manipulating the DOM of web pages
│   └── manifest.json      # Configuration file for the browser extension
├── package.json           # npm configuration file
└── README.md              # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-browser-extension
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Build the extension:
   - For Chrome:
     ```
     npm run build:chrome
     ```
   - For Safari:
     ```
     npm run build:safari
     ```

2. Load the extension in your browser:
   - For Chrome: Go to `chrome://extensions/`, enable "Developer mode", and click "Load unpacked". Select the `my-browser-extension/src` directory.
   - For Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select the `manifest.json` file in the `src` directory.
   - For Safari: Open Safari, enable the Develop menu (Preferences > Advanced > Show Develop menu in menu bar), then go to `Develop > Show Extension Builder`, and select the `safari-extension` directory.

3. Interact with the extension as needed.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see.

## License

This project is licensed under the MIT License.