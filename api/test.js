export default async function handler(req, res) {
  return res.status(200).json({ 
    message: 'Serverless function is working!',
    method: req.method,
    timestamp: new Date().toISOString()
  })
}
    