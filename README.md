# Instagram Story Scraper

A Node.js CLI tool to download Instagram Stories (images and videos) from public and private accounts.

---

## 📦 Project Setup & Requirements

**Environment:**  
Node.js 18+ recommended (tested on v22.21.0)

**Dependencies:**
- [instagram-private-api](https://www.npmjs.com/package/instagram-private-api) – Accesses Instagram stories (requires login for private accounts)
- [axios](https://www.npmjs.com/package/axios) – Makes HTTP requests and downloads media
- [fs-extra](https://www.npmjs.com/package/fs-extra) – Handles file and folder operations
- [commander](https://www.npmjs.com/package/commander) – Provides a command-line interface
- [path](https://nodejs.org/api/path.html) – Built-in Node.js module for working with file paths

**Installation:**
```bash
npm install instagram-private-api axios fs-extra commander
```

---

## ⚙️ How to Run

1. Navigate to the folder:
   ```bash
   cd path/to/project
   ```
2. Open the terminal (right-click → **Open in Terminal** on Windows).
3. Run the command line tool:

```bash
node downloadStories.js --users <usernames...> --output <directory> --login <username> --password <password>
```

---

## 💡 Usage Examples

**Public Accounts:**
```bash
node downloadStories.js --users user1 --output ./downloads
```

**Private Accounts (requires login and you must follow them):**
```bash
node downloadStories.js --users user1 user2 --login myusername --password mypassword --output ./downloads
```

---

## 📁 Output Structure

| Directory | Example File Name | File Type |
|------------|-------------------|------------|
| `/downloads/{username}/` | `2025-11-14_12-34-56_image.jpg` | Image |
| `/downloads/{username}/` | `2025-11-14_12-35-01_video.mp4` | Video |

---

## ⚠️ Limitations

- Stories last only **24 hours**; must run frequently to capture all stories.  
- Public scraping only works for **public accounts**.  
- Private accounts require **login** and you must follow them.  
- Instagram may **block requests** if too many are made in a short time.  

---

## 📜 License

MIT License
