module.exports = {
    async postVisit(page, context) {
        // Take a screenshot of each story
        const screenshotsDir = `${process.cwd()}/__screenshots__`;
        const fs = require("fs");

        // Create screenshots directory if it doesn't exist
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }

        // Generate a clean filename from the story ID
        const filename = `${context.id}.png`;
        const filepath = `${screenshotsDir}/${filename}`;

        // Capture screenshot
        await page.screenshot({
            path: filepath,
            fullPage: true,
        });

        console.log(`📸 Screenshot saved: ${filename}`);
    },
};
