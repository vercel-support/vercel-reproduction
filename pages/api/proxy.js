import Cors from 'cors'
import { proxyHandler } from '../../utils/proxy'

const cors = Cors({
  methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  await runMiddleware(req, res, cors)

  const { query: { method } } = req;

  try {
    
    const { status } = await proxyHandler(method)
    
    if(status === 4) {
      return res.status(200).json({
        status,
        error: false,
      })
    }

    return res.status(503).json({
      status: false,
      error: true,
    })

  } catch (error) {
    return res.status(503).json({
      status: false,
      error: true,
    })
  }

}

export default handler