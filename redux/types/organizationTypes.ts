import { IUser } from './../../utils/Interface'

export const GET_UNAPPROVED_ORGANIZATIONS = 'GET_UNAPPROVED_ORGANIZATIONS'
export const ACCEPT_ORGANIZATION = 'ACCEPT_ORGANIZATION'

export interface IUnapprovedOrganizationsType {
  _id: string
  user: IUser
  phoneNumber: string
  createdDate: string
  totalEmployee: number
  industryType: string
  address: string
  description: string
  status: string
  createdAt: string
}

export interface IUnapprovedOrganizationsAction {
  type: typeof GET_UNAPPROVED_ORGANIZATIONS
  payload: IUnapprovedOrganizationsType[]
}

export interface IAcceptOrganizationAction {
  type: typeof ACCEPT_ORGANIZATION
  payload: string
}