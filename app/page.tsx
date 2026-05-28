import React from 'react'

import GroupedLinks from 'app/components/grouped-links'
import { Badge } from 'app/components/ui/badge'
import { Separator } from 'app/components/ui/separator'
import { designSystem } from 'app/lib/design-system'
import { techStack } from 'app/constants/links'

const Page: React.FC = () => {
  return (
    <section className="flex flex-col">
      {/* Hero heading — bold, intentional, green accent on name */}
      <div className="mb-6 animate-fade-in-up">
        <h1 className="text-5xl font-black tracking-tight text-foreground">
          Hi, I&apos;m <span className="text-accent accent-underline">M1n</span>
          <span className="text-accent">.</span>
        </h1>
        <p
          className={`mt-3 ${designSystem.typography.body} text-foreground/80 leading-relaxed max-w-lg`}
        >
          I love coding, thinking about philosophy, and playing games.
          <br />
          Linux user. Rust as the most entertaining language.
        </p>
      </div>

      {/* Tech stack — mono badges with brutalist hover */}
      <div className="flex flex-wrap gap-2.5 mb-10 animate-fade-in-up delay-1">
        {techStack.map((tech, index) => (
          <Badge
            key={tech}
            variant="outline"
            className={`font-mono text-xs font-bold shadow-brutal hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-brutal-lg hover:-translate-y-1 hover:-rotate-[0.5deg] transition-all duration-100 cursor-default active:translate-y-0 active:shadow-brutal active:rotate-0 delay-${(index % 5) + 1}`}
          >
            {tech}
          </Badge>
        ))}
      </div>

      <Separator className="mb-8 animate-fade-in-up delay-2" />
      <div className="animate-fade-in-up delay-3">
        <GroupedLinks />
      </div>
    </section>
  )
}

export default Page
