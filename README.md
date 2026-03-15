# PrivacyGuard AI Protector 🛡️

# Demo Video Link - https://youtu.be/-jVMXwOHgB0

# chrome-extension
PrivacyGuard (chrome extension) project for Ciphathon '26

**PrivacyGuard AI Protector** is a Chrome extension built to prevent the accidental leakage of Personally Identifiable Information (PII), sensitive credentials, and proprietary corporate data to public Large Language Models (LLMs). 

By acting as a "Zero-Trust" gateway, it monitors your chat inputs and pauses data exfiltration if sensitive information is detected, allowing you to redact it before it leaves your browser.

## ✨ Features
* **Real-time Interception:** Scans text locally before it is sent to the LLM.
* **Smart Redaction Engine:** Automatically detects and offers to redact sensitive information replacing it with tags like `[REDACTED_EMAIL]`.
* **Actionable Warning Overlay:** Provides an in-page popup to either send a sanitized version of your prompt or cancel and edit.
* **Local Analytics Dashboard:** The extension popup tracks your "Security Rank," total blocked leaks, and categorizes threats (API keys vs. PII).
* **Detailed Security Logs:** A dedicated logs page records the timestamp, leak type, and platform of every blocked threat.

## 🎯 Supported Platforms
The extension is configured to actively monitor input on:
* ChatGPT (`chatgpt.com`)
* Claude (`claude.ai`)
* Google Gemini (`gemini.google.com`)
* Google AI Studio (`aistudio.google.com`)

## 🔍 What it Detects
The engine uses Regex patterns to identify:
* **Credit Card Numbers**
* **AWS API Keys** (`AKIA...`)
* **Email Addresses**
* **IPv4 Addresses**
* **Proprietary Markers** (e.g., `INTERNAL_ONLY`, `CONFIDENTIAL`)
* **Database Connection Strings** (MongoDB, Postgres, MySQL)
* **High Entropy Secrets** (32-128 character alphanumeric strings)

---

## 🚀 How to Set Up the Project

Because this is a custom extension, you will need to load it manually via Chrome's Developer Mode.

### Step 1: Prepare the Files
1. Create a new folder on your computer (e.g., `PrivacyGuard_Extension`).
2. Ensure all the project files are saved in this single folder:
   * `manifest.json`
   * `content.js`
   * `popup.html`
   * `popup.js`
   * `logs.html`
   * `logs.js`
   * `style.css`

### Step 2: Install in Google Chrome
1. Open Google Chrome.
2. In the URL bar, type `chrome://extensions/` and hit **Enter**.
3. In the top right corner of the Extensions page, toggle the switch for **Developer mode** to **ON**.
4. Click the **Load unpacked** button that appears in the top-left menu.
5. Select the `PrivacyGuard_Extension` folder you created in Step 1.
6. The extension should now appear in your list of active extensions.

### Step 3: Test It Out!
1. Pin the extension to your browser toolbar (click the puzzle piece icon, then click the pin next to PrivacyGuard).
2. Open a supported platform like [ChatGPT](https://chatgpt.com) or [Google Gemini](https://gemini.google.com).
3. Type a fake email (e.g., `test@example.com`) or a fake AWS key into the chat text box and press **Enter**.
4. The red SentinelGate warning overlay should instantly appear, pausing your submission!

## 🛠️ File Structure
* `manifest.json`: The core configuration and permissions file for Chrome.
* `content.js`: The main logic injected into the web pages to scan, intercept text, and log data.
* `style.css`: Visual styling for the in-page warning overlay.
* `popup.html` / `popup.js`: The UI and logic for the quick-access extension dropdown menu.
* `logs.html` / `logs.js`: The UI and logic for the detailed activity history page.

## Team Neural Mavericks 
Neural Mavericks - Aaditya Hingmire,
                   Parth Bhad,
                   Yugraj Mangate,
                   Manasvi Yeole

