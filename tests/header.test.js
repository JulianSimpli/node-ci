const Page = require('./helper/page.js')

let page

beforeEach(async () => {
  // use proxy
  page = await Page.build()
  // access to client
  await page.goto('http://localhost:3000')
})

afterEach(async () => {
  await page.close()
})

test('Logo element text', async () => {
  // get an element value from page
  const logoText = await page.getContentsOf('a.brand-logo')

  expect(logoText).toEqual('Blogster')
})

test('oauth login', async () => {
  await page.click('.right a')
  const url = await page.url()
  expect(url).toMatch(/accounts\.google\.com/)
})

test('generate valid login session and check out for logout button', async () => {
  await page.login()

  // look for logout button and its text
  const logoutText = await page.getContentsOf('a[href="/auth/logout"]')
  expect(logoutText).toEqual('Logout')
})
