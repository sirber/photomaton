Passport.js setup notes

Install runtime dependencies (run in `backend`):

```
bun add passport passport-local passport-google-oauth20 passport-facebook passport-microsoft express-session bcrypt
```

Install TypeScript types (dev):

```
bun add -d @types/express-session @types/passport @types/bcrypt
```

Environment variables to set for production social login:
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
- `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`, `FACEBOOK_CALLBACK_URL`
- `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_CALLBACK_URL`

Next steps:
- Implement strategy files for Google/Facebook/Microsoft in `src/auth/strategies/`.
- Protect routes using `req.isAuthenticated()` or middleware.
