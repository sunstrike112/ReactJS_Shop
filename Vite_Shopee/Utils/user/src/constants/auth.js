export const LOGIN_WITH_ACCOUNTS = {
  EMAIL: 'email',
  LOGIN_ID: 'loginId'
}
export const LOGIN_WITH_ACCOUNT_OPTIONS = [
  { value: LOGIN_WITH_ACCOUNTS.EMAIL, label: 'profile.home.email' },
  { value: LOGIN_WITH_ACCOUNTS.LOGIN_ID, label: 'profile.home.login_ID' }
]

export const loginWithAccountTextMap = {
  [LOGIN_WITH_ACCOUNTS.EMAIL]: 'profile.home.email',
  [LOGIN_WITH_ACCOUNTS.LOGIN_ID]: 'profile.home.login_ID'
}
