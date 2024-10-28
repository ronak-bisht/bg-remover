// app/api/auth/callback/route.js
export async function GET(req, res) {
    await app.auth.callback(req, res); // Finalize the OAuth process
    res.redirect('/'); // Redirect to your app's main page after authentication
  }
  