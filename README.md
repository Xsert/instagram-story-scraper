Instagram Story Scraper

A Node.js CLI tool to download Instagram Stories (images and videos) from public accounts and optionally private accounts (requires login).

---

Project Setup & Requirements:

Environment: Node.js 18+ recommended (tested on v22.21.0)

Dependencies:
- instagram-private-api – Access stories (requires login for private accounts)
- axios – Requests and media download
- fs-extra – File and folder handling
- commander – CLI interface
- path – Built-in, for file paths

Installation:
npm install instagram-private-api axios fs-extra commander

---

Running the Tool:

1. Navigate to the project folder:
   cd path/to/project

2. Open terminal in that folder.

3. Run the script via command line:

Command structure:
node downloadStories.js --users <usernames...> --output <directory> --login <username> --password <password>

---

Usage Examples:

Public accounts only:
node downloadStories.js --users nasa natgeo --output ./downloads

Private accounts (requires login and following the account):
node downloadStories.js --users friend1 friend2 --login myusername --password mypassword --output ./downloads

Output structure:
/downloads/{username}/
  ├── 2025-11-14_12-34-56_image.jpg
  └── 2025-11-14_12-35-01_video.mp4

---

Limitations:

- Stories last only 24 hours; run frequently to capture all stories.
- Public scraping only works for public accounts.
- Private accounts require login and the user must follow them.
- Instagram may block requests if too many requests are made in a short time.
