import React from 'react'

import { cn } from 'app/lib/utils'

interface ZoneLabelProps {
  label: string
  unitId?: string
  className?: string
  as?: 'div' | 'header'
}

const ZoneLabel: React.FC<ZoneLabelProps> = ({ label, className, as: Tag = 'div' }) => {
  return (
    <Tag className={cn('zone-label', className)}>
      <span>{label}</span>
    </Tag>
  )
}

export default ZoneLabel
