# Deploying on Vercel

## Overview
This guide explains how to deploy Analytics Pro on Vercel, a platform for frontend frameworks and static sites.

## Prerequisites
- A Vercel account.
- Your project set up with a Git repository.

## Steps to Deploy
1. Import your Git repository into Vercel from the Vercel dashboard.

2. Configure your project settings in Vercel:
   - Set the build command to `npm run build` and the output directory to `public` or `build` depending on your setup.

3. Add necessary environment variables in the Vercel project settings.

4. Deploy your application by pushing changes to your Git repository. Vercel automatically deploys new commits.

## Accessing the Deployed Application
Once deployed, Vercel provides a URL to access your application. You can also configure custom domains in your Vercel project settings.