import { session } from 'electron'

// Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest
const allowedPermissions: string[] = []

export function configureSessionPermissions(): void {
  // https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content
  const partition = 'default'
  session
    .fromPartition(partition)
    .setPermissionRequestHandler((webContents, permission, permCallback) => {
      if (allowedPermissions.includes(permission)) {
        permCallback(true)
      } else {
        console.error(
          `The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`
        )

        permCallback(false)
      }
    })
}

export function configureSessionCSP() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy':
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' appfiles: data:"
      }
    })
  })
}
