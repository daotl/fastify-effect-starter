export function cookieStr(
  key: string,
  value: string,
  attributes: {
    maxAge?: number
    httpOnly?: boolean
  } = {},
): string {
  const attrs = {
    // Default values:
    maxAge: 1800,
    httpOnly: true,
    // Override
    ...attributes,
  }
  return `${key}=${value}; Path=/; Max-Age=${attrs.maxAge}; ${
    attributes.httpOnly ? 'HttpOnly;' : ''
  } ${process.env['NODE_ENV'] !== 'dev' ? 'Secure;' : ''}`
}
