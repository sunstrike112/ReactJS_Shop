import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjZlOWJmNmQ3YzYyMDM0MDg1MjM1NyIsImVtYWlsIjoicGhhcHRkcTExMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTI2VDIyOjA4OjUxLjIyMVoiLCJpYXQiOjE2ODUxMzg5MzEsImV4cCI6MTY4NTIyNTMzMX0.D7sFaaRhxDSUwDdhxOmqNXqgUYw7f5RUXlDbG8A4KlI'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjZlOWJmNmQ3YzYyMDM0MDg1MjM1NyIsImVtYWlsIjoicGhhcHRkcTExMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTI2VDIyOjA4OjUxLjIyMVoiLCJpYXQiOjE2ODUxMzg5MzEsImV4cCI6MTY5ODk2MjkzMX0.mYp1Jv6DHBW2m-rhouyiuc9x85gFsx7zPJXqMgYWOwQ'
const profile =
  '{"_id":"63f6e9bf6d7c620340852357","roles":["User"],"email":"phaptdq112@gmail.com","createdAt":"2023-02-23T04:21:19.580Z","updatedAt":"2023-02-23T06:19:22.491Z","__v":0,"avatar":"4ba9cf88-3a19-4b61-8fbe-1c7442abc5d7.PNG","date_of_birth":"1989-12-31T17:00:00.000Z"}'
beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token được set vào localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token được set vào localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toEqual(refresh_token)
  })
})

describe('clearLS', () => {
  it('Xóa hết access_token, refresh_token, profile', () => {
    setRefreshTokenToLS(refresh_token)
    setAccessTokenToLS(access_token)
    // setProfile tại đây
    // ...
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
  })
})
