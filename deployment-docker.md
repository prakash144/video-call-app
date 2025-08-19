# PremiumMeet: Docker + GCP Cloud Run Deployment Guide

This guide explains how to containerize the PremiumMeet React/Vite app using Docker and deploy it on Google Cloud Run.

---

## 1️⃣ Prerequisites

* GCP account with billing enabled.
* GCloud CLI installed and authenticated.
* Docker installed locally.
* Node.js and npm installed.

---

## 2️⃣ Dockerfile Setup

Create a file named `Dockerfile` in the root of your project:

```dockerfile
# Stage 1: Build React App
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built app to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

---

## 3️⃣ Build Docker Image

```bash
docker build -t gcr.io/<PROJECT-ID>/premiummeet:latest .
```

Replace `<PROJECT-ID>` with your GCP project ID.

---

## 4️⃣ Push Image to Google Container Registry

```bash
docker push gcr.io/<PROJECT-ID>/premiummeet:latest
```

---

## 5️⃣ Deploy to Cloud Run

```bash
gcloud run deploy premiummeet \
  --image gcr.io/<PROJECT-ID>/premiummeet:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

* `--region` can be changed according to your preference.
* `--allow-unauthenticated` makes your app public.

---

## 6️⃣ Access Your App

After deployment, GCP will provide a URL like:

```
https://premiummeet-xxxxxx.a.run.app
```

Open it in your browser to see the live PremiumMeet app.

---

## 7️⃣ Notes

* To update the app:

    1. Make code changes.
    2. Build a new Docker image.
    3. Push to GCR.
    4. Deploy again with Cloud Run.

* Cloud Run automatically scales based on traffic.

* For custom domains, configure Cloud Run domain mapping.

---

**Congratulations!** Your PremiumMeet app is now running on GCP Cloud Run with Docker.
