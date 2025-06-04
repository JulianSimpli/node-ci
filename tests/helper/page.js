const sessionFactory = require('../factories/sessionFactory.js')
const userFactory = require('../factories/userFactory.js')
const puppeteer = require('puppeteer')

class Page {
  static async build() {
    // browser creation
    // separate independent process
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
      // executablePath:
      //   '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    })
    // new page creation
    const page = await browser.newPage()
    // our page
    const customPage = new Page(page)

    return new Proxy(customPage, {
      get: function (target, property) {
        return target[property] || browser[property] || page[property]
      },
    })
  }

  constructor(page) {
    this.page = page
  }

  async login() {
    // create cookie session
    const user = await userFactory()

    const { session, sig } = sessionFactory(user)

    // manipulate cookies on browser instance
    await this.page.setCookie({ name: 'session', value: session })
    await this.page.setCookie({ name: 'session.sig', value: sig })

    // refresh page
    await this.page.goto('http://localhost:3000/blogs/')

    // const html = await this.page.content();
    // console.log(html); // Debug visual

    // for career condition
    await this.page.waitForSelector('a[href="/auth/logout"]')
  }

  getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML)
  }

  fetch(actions) {
    return Promise.all(
      actions.map(({ path, method, body }) => {
        // exec a fn inside browser like <script></script>
        return this.page.evaluate(
          (_path, _method, _body) => {
            return fetch(_path, {
              method: _method,
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(_body),
            }).then((res) => res.json())
          },
          path,
          method,
          body
        )
      })
    )
  }
}

module.exports = Page
