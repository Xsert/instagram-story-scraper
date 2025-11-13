#!/usr/bin/env node

const { IgApiClient } = require('instagram-private-api');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const { program } = require('commander');

program
  .requiredOption('-u, --users <usernames...>', 'Instagram usernames to download stories from')
  .option('-o, --output <directory>', 'Output directory', './downloads')
  .option('--login <username>', 'Instagram username for private accounts')
  .option('--password <password>', 'Instagram password for private accounts');

program.parse(process.argv);
const options = program.opts();

const ig = new IgApiClient();

/**
 * Login to Instagram if credentials provided
 */
async function loginIfNeeded() {
  if (options.login && options.password) {
    ig.state.generateDevice(options.login);
    try {
      await ig.account.login(options.login, options.password);
      console.log('[INFO] Logged in successfully');
    } catch (err) {
      console.error('[ERROR] Login failed:', err.message);
      process.exit(1);
    }
  } else {
    console.log('[INFO] No login provided. Accessing public stories only.');
  }
}

/**
 * Download a single media file
 */
async function downloadMedia(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, response.data);
    console.log(`[SUCCESS] Saved: ${outputPath}`);
  } catch (err) {
    console.error(`[ERROR] Failed to download ${url}:`, err.message);
  }
}

/**
 * Process stories for a single user
 */
async function processUserStories(username) {
  try {
    const userId = await ig.user.getIdByUsername(username);
    const feed = ig.feed.userStory(userId);
    const stories = await feed.items();

    if (!stories || stories.length === 0) {
      console.log(`[INFO] No stories found for ${username}`);
      return;
    }

    for (const story of stories) {
      const timestamp = new Date(story.taken_at * 1000)
        .toISOString()
        .replace(/:/g, '-')
        .replace(/\..+/, '');
      let mediaUrl, fileExt, mediaType;

      if (story.media_type === 1) {
        mediaUrl = story.image_versions2.candidates[0].url;
        fileExt = 'jpg';
        mediaType = 'image';
      } else if (story.media_type === 2) {
        mediaUrl = story.video_versions[0].url;
        fileExt = 'mp4';
        mediaType = 'video';
      } else {
        continue; // skip unsupported types
      }

      const outputPath = path.join(options.output, username, `${timestamp}_${mediaType}.${fileExt}`);
      await downloadMedia(mediaUrl, outputPath);
    }
  } catch (err) {
    console.error(`[ERROR] Failed to fetch stories for ${username}:`, err.message);
  }
}

/**
 * Main
 */
(async () => {
  await loginIfNeeded();

  for (const username of options.users) {
    console.log(`[INFO] Processing stories for: ${username}`);
    await processUserStories(username);
  }

  console.log('[INFO] Finished downloading stories.');
})();
