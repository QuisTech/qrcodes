# Deploying to Vercel

Moving your APC Badge System online is very easy. Follow these steps:

## Prerequisites
1.  A [GitHub](https://github.com/) account.
2.  A [Vercel](https://vercel.com/) account (sign up with GitHub).

## Step 1: Upload to GitHub
1.  Initialize a git repository in your project folder:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new **Private** repository on GitHub.
3.  Push your code to GitHub:
    ```bash
    git remote add origin YOUR_GITHUB_REPO_URL
    git branch -M main
    git push -u origin main
    ```

## Step 2: Connect to Vercel
1.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New"** > **"Project"**.
3.  Import the repository you just created.
4.  Vercel will detect it as a **Vite** project.
5.  Click **"Deploy"**.

## Step 3: Done!
Once deployed, Vercel will provide you with a URL (e.g., `apc-badge-system.vercel.app`).
You can visit this URL on any computer, tablet, or phone to use the scanner and generator.

---
### Why Vercel?
- **SSL (HTTPS)**: Required for the camera/webcam to work on most browsers. Vercel provides this for free.
- **Fast**: Worldwide CDN ensures the app is snappy for event staff.
- **Easy Updates**: Every time you push to GitHub, the site updates automatically.
