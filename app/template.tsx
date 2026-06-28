import { FC, ReactNode } from 'react'

import { designSystem } from 'app/lib/design-system'

interface TemplateProps {
  children: ReactNode
}

const Template: FC<TemplateProps> = ({ children }) => {
  return <div className={designSystem.animations.entrance.fadeIn}>{children}</div>
}

export default Template
