# PremiumMeet GCP Deployment Guide

This guide provides ready-to-go steps to deploy your **PremiumMeet** React + Vite app on **Google Cloud Platform (GCP)** using two approaches:

1. **Static Hosting on GCP (Simplest)**
2. **App Engine (Flexible/Standard)**

---

## 1️⃣ Static Hosting on GCP (Simplest)

This approach uses **Google Cloud Storage (GCS)** to host your static frontend app.

### Steps:

1. **Build your app:**

   ```bash
   npm install
   npm run build
   ```

   This will generate a `dist/` folder containing the production build.

2. **Create a GCS bucket:**

    * Go to **GCP Console → Storage → Browser → Create Bucket**
    * Bucket name should be unique globally.
    * Select **Region** and **Storage Class** as per your needs.

3. **Upload your build:**

    * Use GCP Console to upload the contents of `dist/`.
    * OR use `gsutil`:

      ```bash
      gsutil cp -r dist/* gs://<YOUR_BUCKET_NAME>/
      ```

4. **Make the bucket public:**

   ```bash
   gsutil iam ch allUsers:objectViewer gs://<YOUR_BUCKET_NAME>
   ```

5. **Set the bucket for website hosting:**

   ```bash
   gsutil web set -m index.html -e index.html gs://<YOUR_BUCKET_NAME>
   ```

6. **Optional - Use Cloud CDN or Custom Domain**

    * Enable **Cloud CDN** for fast delivery.
    * Map a **custom domain** using **Cloud DNS**.

✅ Your app will now be live at: `https://storage.googleapis.com/<YOUR_BUCKET_NAME>/index.html`

---

## 2️⃣ App Engine (Flexible/Standard)

This approach uses **GCP App Engine** to host your app with automatic scaling.

### Steps:

1. **Build your app:**

   ```bash
   npm install
   npm run build
   ```

2. **Create `app.yaml` file** in your project root:

   ```yaml
   runtime: nodejs18

   handlers:
     - url: /static
       static_dir: dist

     - url: /.*
       static_files: dist/index.html
       upload: dist/index.html
   ```

3. **Deploy to App Engine:**

   ```bash
   gcloud app deploy
   ```

4. **Open your app:**

   ```bash
   gcloud app browse
   ```

✅ Your app will now be live on the default App Engine URL: `https://<PROJECT_ID>.uc.r.appspot.com`

---

**Notes:**

* Static Hosting is cheapest and simplest for SPAs.
* App Engine provides more flexibility if you plan to add backend APIs in the future.
* Ensure your **GCP project** is properly set up and you have billing enabled for App Engine.
