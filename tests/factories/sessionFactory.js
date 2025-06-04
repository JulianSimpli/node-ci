const Buffer = require('safe-buffer').Buffer
const Keygrip = require('keygrip')

const { cookieKey } = require('../../config/keys.js')

module.exports = (user) => {
  const sessionObj = {
    passport: {
      user: user._id.toString(),
    },
  }

  // sign cookie session
  const session = Buffer.from(JSON.stringify(sessionObj)).toString('base64')
  const keygrip = new Keygrip([cookieKey])
  const sig = keygrip.sign('session=' + session)

  return { session, sig }
}
