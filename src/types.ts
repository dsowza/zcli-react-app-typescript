export interface Metadata<T> {
  appId: number
  name: string
  version: string
  installationId: number
  settings: T
}

export type AppSellLocation =
  | 'background'
  | 'call_log_editor'
  | 'company_card'
  | 'deal_card'
  | 'lead_card'
  | 'modal'
  | 'note_editor'
  | 'person_card'
  | 'top_bar'
  | 'visit_editor'

export type AppSupportLocation =
  | 'background'
  | 'modal'
  | 'nav_bar'
  | 'new_ticket_sidebar'
  | 'organization_sidebar'
  | 'ticket_editor'
  | 'ticket_sidebar'
  | 'top_bar'
  | 'user_sidebar'

export type AppChatLocation = 'background' | 'chat_sidebar'

export type AppLocation = AppSellLocation | AppSupportLocation | AppChatLocation

export interface Context {
  // eq. "sell"
  product: string
  // location where the app is supposed to show up
  location: AppLocation
  // uniq instance id
  instanceGuid: string
  // account info
  account: AccountContext
  // user info
  currentUser: UserContext
}

export interface AccountContext {
  domain: string
  currency: string
  timezone: string
  numberFormat: string
  timeFormat: string
  dateFormat: string
  decimalSeparator: string
}

export interface UserContext {
  id: number
  name: string
  email: string
  status: string
  invited: boolean | null
  confirmed: boolean
  phone: string | null
  role: string
  roles: Role[]
  group: Group | null
  reportsTo: number | null
  timezone: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  locale: string
}

export interface Group {
  id: number
  name: string
}

export interface Role {
  id: number
  name: string
}

export enum FeedbackStatus {
  success = 'success',
  error = 'error',
  loading = 'loading'
}

export interface Feedback {
  status: FeedbackStatus
  error?: any | void
}

export interface Response<T> {
  data: T | null
  error: object | null
  feedback: Feedback | null
  refetch?: () => void
}

export interface Client {
  on: <T>(event: string, callback: (data?: T) => void) => void
  invoke: <T>(name: string, ...options: any[]) => Promise<T>
  get: <T>(name: string | string[]) => Promise<T>
  set: <T>(name: string, value: string) => Promise<T>
  request: <Input, Output>(data: Input) => Promise<Output>
  metadata: <T>() => Promise<Metadata<T>>
  context: () => Promise<Context>
  trigger: (event: string, data?: any) => void
  instance: (Guid: string) => Client
}

export enum ClientInvokeOptions {
  accountTimezone = 'account',
  formatDate = 'formatDate',
  formatDateAndTime = 'formatDateAndTime',
  formatCurrency = 'formatCurrency'
}

export const version = '0.0.5'

export interface ChangedProperty<T> {
  propertyName: string
  oldValue: T
  newValue: T
}
