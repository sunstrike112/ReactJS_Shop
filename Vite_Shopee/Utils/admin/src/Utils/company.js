export const renderCompanyStatus = (t) => ([
  { value: 'INVITING', label: t('company:status.inviting') },
  { value: 'LOGGED', label: t('company:status.logged') },
  { value: 'UNPAID', label: t('company:status.unpaid') },
  { value: 'STOPPING', label: t('company:status.stopping') }
])

export const COMPANY_TYPES = [
  { value: 'TRIAL', label: 'company:TRIAL' },
  { value: 'CONTRACT', label: 'company:USING_WORKSPACE' }
]

// not merge to COMPANY_TYPES == cause impact code
export const COMPANY_TYPES_ALL = [
  { value: 'TRIAL', label: 'company:TRIAL' },
  { value: 'USING', label: 'company:USING' },
  { value: 'SUBSCRIBE', label: 'company:SUBSCRIBE' },
  { value: 'STOPPING', label: 'company:STOPPING' },
  { value: 'CANCELLATION', label: 'company:CANCELLATION' }
]
