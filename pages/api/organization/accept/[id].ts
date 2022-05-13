import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from '../../../../middlewares/auth'
import Organization from '../../../../models/Organization'
import connectDB from '../../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH')
    return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)

  if (user) {
    const isAuthorize = await authorizeRoles(user._id, res, 'admin')
    if (isAuthorize) {
      const findOrganization = await Organization.findById(req.query.id)
      if (!findOrganization)
        return res.status(404).json({ msg: `Organization with ID ${req.query.id} not found.` })

      if (findOrganization.status === 'accepted')
        return res.status(400).json({ msg: 'Organization has been accepted before.' })

      await Organization.findOneAndUpdate({ _id: req.query.id }, { status: 'accepted' })

      return res.status(200).json({ msg: `Organization with ID ${req.query.id} has been accepted successfully.` })
    }
  }
}

export default connectDB(handler)