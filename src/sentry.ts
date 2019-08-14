import * as Sentry from '@sentry/electron'

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE,
  })
  // Sentry.captureException(new Error('renderer testing'))
}
