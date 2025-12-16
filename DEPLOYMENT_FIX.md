# Deployment Error Fix Guide

## Error Summary

The deployment failed with:
```
[vite]: Rollup failed to resolve import "@supabase/supabase-js" from "/home/project/src/lib/supabaseClient.js"
```

## Root Cause

The deployment environment does not have the `@supabase/supabase-js` package installed. The build process cannot find this dependency.

## Solutions Applied

### 1. Updated Vite Configuration

**File:** `vite.config.js`

Added explicit dependency optimization:
```javascript
optimizeDeps: {
  include: ['@supabase/supabase-js'],
},
build: {
  commonjsOptions: {
    include: [/node_modules/],
  },
}
```

This helps Vite properly handle the Supabase dependency during the build process.

### 2. Made Supabase Client More Robust

**File:** `src/lib/supabaseClient.js`

Updated to handle missing environment variables gracefully:
```javascript
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
```

Now if environment variables are missing, the app won't crash - database features will simply be disabled.

### 3. Added Null Checks in Components

**Files:**
- `src/components/mobile/MobileParticipate.jsx`
- `src/components/mobile/MobileContact.jsx`

Both form submission functions now check if Supabase is available before attempting to use it:
```javascript
if (!supabase) {
  throw new Error('Database connection not available...');
}
```

## Deployment Steps to Fix the Error

### Option 1: Ensure Dependencies Are Installed (RECOMMENDED)

The deployment server needs to run:

```bash
npm install
```

**Before running:**
```bash
npm run build
```

Most deployment platforms (Vercel, Netlify, Render, etc.) do this automatically. If yours doesn't, you may need to configure it.

### Option 2: Verify package.json is Committed

Ensure `package.json` includes:
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.87.3",
    ...
  }
}
```

### Option 3: Clear Build Cache

Some deployment platforms cache dependencies. Try:
- Clearing the build cache in your deployment platform
- Forcing a clean rebuild
- Deleting and recreating the deployment

### Option 4: Check Build Command

Ensure your deployment platform uses the correct build command:

```bash
npm install && npm run build
```

Or configure two separate commands:
- Install command: `npm install`
- Build command: `npm run build`

## Platform-Specific Instructions

### Vercel
1. Go to Project Settings → General
2. Check "Install Command": Should be `npm install` (default)
3. Check "Build Command": Should be `npm run build`
4. Clear build cache: Settings → General → Clear Build Cache
5. Redeploy

### Netlify
1. Go to Site Settings → Build & Deploy
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables: Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
5. Clear cache and redeploy

### Render
1. Go to your service → Settings
2. Build Command: `npm install && npm run build`
3. Start Command: (leave empty for static sites)
4. Environment variables: Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
5. Clear build cache and redeploy

### Railway
1. Settings → Build Command: `npm install && npm run build`
2. Settings → Start Command: (not needed for static sites)
3. Variables: Add Supabase environment variables
4. Redeploy

### Generic Platforms

If your platform requires a custom build script, create `build.sh`:

```bash
#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Build complete!"
```

Make it executable:
```bash
chmod +x build.sh
```

Use `./build.sh` as your build command.

## Environment Variables Required

Ensure these are set in your deployment environment:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** These MUST start with `VITE_` prefix for Vite to include them in the build.

## Verification Steps

After applying the fix:

1. Check that `package.json` is in your repository
2. Check that `package-lock.json` is in your repository (recommended)
3. Verify environment variables are set in deployment platform
4. Trigger a new deployment
5. Watch the build logs for:
   - "Installing dependencies..." or similar
   - Successful installation of `@supabase/supabase-js`
   - Successful build completion

## Expected Build Output

You should see:
```
✓ 2472 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.46 kB │ gzip:   0.30 kB
dist/assets/index-*.css          31.24 kB │ gzip:   6.44 kB
dist/assets/index-*.js          950.14 kB │ gzip: 247.37 kB
✓ built in ~10s
```

## Testing the Fix Locally

To verify the fix works:

```bash
# Clean install
rm -rf node_modules
npm install

# Build
npm run build

# If successful, the deployment should work
```

## Common Issues

### Issue: "Module not found" after deployment

**Solution:** Environment variables are missing or incorrect.

1. Check spelling of `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Ensure they start with `VITE_` prefix
3. Redeploy after adding them

### Issue: Build succeeds but forms don't work

**Solution:** Environment variables not accessible at runtime.

1. Verify environment variables are set in deployment platform (not just locally)
2. Check browser console for warnings
3. Forms will show error message: "Database connection not available..."

### Issue: "Cannot read property 'from' of null"

**Solution:** Supabase client is null (no env vars).

This is now handled gracefully with our updates. Users will see a clear error message.

## If Issues Persist

If you still encounter the error after trying all solutions:

1. **Check deployment logs** for the exact error message
2. **Verify npm version**: Use Node 18+ and npm 8+
3. **Check for lock file conflicts**: Delete `package-lock.json`, run `npm install`, commit new lock file
4. **Try manual build**: SSH into deployment server (if possible) and run commands manually
5. **Contact platform support**: Provide them with build logs

## Alternative: Deploy Without Forms (Temporary)

If you need to deploy urgently without database features:

1. Set dummy environment variables:
   ```
   VITE_SUPABASE_URL=https://placeholder.supabase.co
   VITE_SUPABASE_ANON_KEY=placeholder_key
   ```

2. The app will build and run, but forms will show errors when submitted

3. Users can still email directly (mailto: links work)

## Success Indicators

You'll know the fix worked when:

✅ Build completes without errors
✅ Deployment succeeds
✅ Mobile site loads correctly
✅ Forms submit successfully (if env vars are configured)
✅ No console errors related to module resolution

## Summary of Changes Made

1. ✅ Updated `vite.config.js` with optimizeDeps configuration
2. ✅ Made `src/lib/supabaseClient.js` handle missing env vars gracefully
3. ✅ Added null checks in `MobileParticipate.jsx`
4. ✅ Added null checks in `MobileContact.jsx`
5. ✅ Verified local build succeeds
6. ✅ Created this comprehensive deployment guide

## Next Steps

1. **Retry deployment** with your platform
2. **Monitor build logs** to ensure dependencies install correctly
3. **Test the deployed site** to verify forms work
4. **Contact support** if issues persist (provide them with this guide)

---

**Built successfully?** You're ready to retry your deployment! The errors should be resolved.

**Still failing?** Share the complete build logs and we can investigate further.
