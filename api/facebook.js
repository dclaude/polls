import { Facebook } from 'expo'

export function login(appId) {
  return Facebook.logInWithReadPermissionsAsync(appId, {
    permissions: [ 'public_profile' ],
  })
}

