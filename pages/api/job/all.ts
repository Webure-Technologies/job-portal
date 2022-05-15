import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from './../../../libs/db'
import Job from './../../../models/Job'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const searchQuery = req.query.q
  
  const jobAggregate: any[] = [
    {
      $lookup: {
        from: 'organizations',
        let: { org_id: '$organization' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$org_id'] } } },
          {
            $lookup: {
              from: 'users',
              let: { user_id: '$user' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                { $project: { name: 1, avatar: 1, province: 1, city: 1, district: 1, postalCode: 1 } }
              ],
              as: 'user'
            }
          },
          { $unwind: '$user' }
        ],
        as: 'organization'
      }
    },
    { $unwind: '$organization' }
  ]

  if (searchQuery) {
    const searchAggregate = {
      $search: {
        index: 'job',
        text: {
          path: ['position', 'skills', 'keywords'],
          query: searchQuery
        }
      }
    }

    jobAggregate.unshift(searchAggregate)
  }

  const jobs = await Job.aggregate(jobAggregate)
  return res.status(200).json({ jobs })
}

export default connectDB(handler)