const Page = require('./helper/page.js')

let page

beforeEach(async () => {
  page = await Page.build()
  await page.goto('http://localhost:3000/')
})

afterAll(async () => {
  await page.close()
})

describe('When logged in', async () => {
  beforeEach(async () => {
    await page.login()
    // look for logout button and its text
    await page.click('a.btn-floating')
  })

  test('View cancel blog creation button', async () => {
    //we should see blog breation form
    const titleLabel = await page.getContentsOf('form label')
    expect(titleLabel).toEqual('Blog Title')
  })

  describe('blog creation valid inputs', async () => {
    beforeEach(async () => {
      await page.type('.title input', 'My title')
      await page.type('.content input', 'My content')
      await page.click('form button')
    })

    test('confirm user inputs page', async () => {
      const confirmationHeader = await page.getContentsOf('form h5')
      expect(confirmationHeader).toEqual('Please confirm your entries')
    })

    test('create blog and go to blogs index', async () => {
      await page.click('button.green')
      await page.waitForSelector('.card')

      const blogTitle = await page.getContentsOf('.card-title')
      const blogContent = await page.getContentsOf('p')

      expect(blogTitle).toEqual('My title')
      expect(blogContent).toEqual('My content')
    })
  })

  describe('blog creation invalid inputs', async () => {
    beforeEach(async () => {
      await page.click('form button')
    })

    test('show errors for empty values', async () => {
      const titleError = await page.getContentsOf('.title .red-text')
      const contentError = await page.getContentsOf('.content .red-text')

      expect(titleError).toEqual('You must provide a value')
      expect(contentError).toEqual('You must provide a value')
    })
  })
})

describe('When logged out', async () => {
  const actions = [
    {
      path: '/api/blogs',
      method: 'GET',
    },
    {
      path: '/api/blogs',
      method: 'POST',
      body: {
        title: 'A title',
        content: 'A content',
      },
    },
  ]

  test('user cannot crud blogs', async () => {
    const results = await page.fetch(actions)
    for (const element of results) {
      expect(element).toEqual({ error: 'You must log in!' })
    }
  })
})
