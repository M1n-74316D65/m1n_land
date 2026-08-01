import React from 'react'

import { cn } from 'app/lib/utils'

interface ZoneLabelProps {
  label: string
  unitId?: string
  className?: string
  as?: 'div' | 'header'
}

const ZoneLabel: React.FC<ZoneLabelProps> = ({ label, unitId, className, as: Tag = 'div' }) => {
  return (
    <Tag className={cn('zone-label', className)} aria-hidden="true">
      <span>[ {label} ]</span>
      {unitId ? <span className="zone-label-id">{unitId}</span> : null}
    </Tag>
  )
}

export default ZoneLabel
