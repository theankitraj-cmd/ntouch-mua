/**
 * 🚀 Instant URL Indexing Script for ntouchmua.com
 * 
 * Submits ALL website URLs to:
 *   1. IndexNow (Bing, Yandex, Seznam, Naver — instant)
 *   2. Google Indexing API (requires service account JSON)
 * 
 * Usage:
 *   node scripts/submit-urls.mjs
 *   node scripts/submit-urls.mjs --google   (include Google Indexing API)
 */

const SITE_HOST = 'ntouchmua.com';
const SITE_URL = `https://${SITE_HOST}`;

// IndexNow API key — also served at /api/indexnow/[key]
const INDEXNOW_KEY = 'b4f7c8a2e9d14b3f8e6a1c5d7f0e2b9a';

// All URLs to submit
const ALL_URLS = [
  '/',
  '/nancy-mehta',
  '/review',
  '/blog',
  '/blog/the-perfect-saree-draping-secrets-for-your-big-day',
  '/blog/winter-wedding-glow-prepping-your-skin-for-a-bihar-celebration',
  '/blog/revamping-tradition-modern-bihari-bridal-looks',
  // Portfolio categories
  '/portfolio/bridal-makeup',
  '/portfolio/party-makeup',
  '/portfolio/engagement-makeup',
  '/portfolio/hd-airbrush-makeup',
  // Location pages
  '/locations/boring-road',
  '/locations/kankarbagh',
  '/locations/patliputra',
  '/locations/raja-bazar',
  '/locations/bailey-road',
  '/locations/gola-road',
  '/locations/anisabad',
  '/locations/danapur',
  '/locations/kumhrar',
  '/locations/phulwari-sharif',
].map(path => `${SITE_URL}${path}`);

// ═══════════════════════════════════════
//  IndexNow (Bing, Yandex, Seznam, Naver)
// ═══════════════════════════════════════
async function submitIndexNow() {
  const engines = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  const body = JSON.stringify({
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: ALL_URLS,
  });

  console.log('\n📡 Submitting to IndexNow...');
  console.log(`   URLs: ${ALL_URLS.length}`);

  for (const engine of engines) {
    try {
      const resp = await fetch(engine, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body,
      });
      const status = resp.status;
      const emoji = status === 200 || status === 202 ? '✅' : '⚠️';
      console.log(`   ${emoji} ${new URL(engine).hostname}: HTTP ${status}`);
    } catch (err) {
      console.log(`   ❌ ${new URL(engine).hostname}: ${err.message}`);
    }
  }
}

// ═══════════════════════════════════════
//  Google Indexing API (JWT)
// ═══════════════════════════════════════
async function submitGoogle() {
  let credentials;
  try {
    const { readFileSync } = await import('fs');
    const { join } = await import('path');
    const credPath = join(process.cwd(), 'google-service-account.json');
    credentials = JSON.parse(readFileSync(credPath, 'utf8'));
  } catch (err) {
    console.log('\n⚠️  Google Indexing API skipped.');
    console.log('   Error loading credentials:', err.message);
    console.log('   Place your service account JSON as google-service-account.json');
    console.log('   in the project root.');
    return;
  }

  // Build JWT
  const { SignJWT, importPKCS8 } = await import('jose');
  const privateKey = await importPKCS8(credentials.private_key, 'RS256');

  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .sign(privateKey);

  // Exchange JWT for access token
  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const { access_token } = await tokenResp.json();

  if (!access_token) {
    console.log('   ❌ Failed to get Google access token');
    return;
  }

  console.log('\n🔍 Submitting to Google Indexing API...');

  // Submit in batches of 5 (rate limit friendly)
  for (let i = 0; i < ALL_URLS.length; i += 5) {
    const batch = ALL_URLS.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(url =>
        fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            url,
            type: 'URL_UPDATED',
          }),
        }).then(async r => {
          const status = r.status;
          let error = '';
          if (status !== 200) {
            try {
              const data = await r.json();
              error = data.error?.message || 'Unknown error';
            } catch {
              error = await r.text();
            }
          }
          return { url, status, error };
        })
      )
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        const { url, status, error } = result.value;
        const emoji = status === 200 ? '✅' : '⚠️';
        console.log(`   ${emoji} ${url} → ${status}${error ? ` (${error})` : ''}`);
      } else {
        console.log(`   ❌ Error: ${result.reason}`);
      }
    }

    // Small delay between batches
    if (i + 5 < ALL_URLS.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

// ═══════════════════════════════════════
//  Main
// ═══════════════════════════════════════
async function main() {
  console.log('══════════════════════════════════════');
  console.log('  🚀 ntouchmua.com — Instant Indexing');
  console.log('══════════════════════════════════════');
  console.log(`  Total URLs: ${ALL_URLS.length}`);

  await submitIndexNow();

  if (process.argv.includes('--google')) {
    await submitGoogle();
  } else {
    console.log('\n💡 Tip: Run with --google flag to also submit to Google Indexing API');
  }

  console.log('\n✨ Done! URLs submitted for instant indexing.');
}

main().catch(console.error);
