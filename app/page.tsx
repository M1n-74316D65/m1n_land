import Image from 'next/image'
import React from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { ProjectIndex } from 'app/components/home/project-index'
import { Hero } from 'app/components/home/hero'
import { RadioSection } from 'app/components/home/radio-section'
import { externalLinks, socialLinks, techStack } from 'app/constants/links'

const contactLinks = [...socialLinks, ...externalLinks]

const Page: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <ProjectIndex />

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="section-heading" data-reveal>
          <h2 id="about-title">About me</h2>
        </div>
        <div className="about-grid">
          <Image
            src="https://profiles.cache.lol/m1n/picture?v=1767470215"
            alt="My black cat avatar"
            width={480}
            height={480}
            sizes="(max-width: 640px) 128px, 240px"
            className="about-avatar"
            data-reveal
          />
          <div className="about-copy" data-reveal>
            <p className="about-lead">I’m David, also known as M1n. I write code.</p>
            <p className="about-detail">
              I enjoy games and philosophy. My selected projects are small command-line tools made
              with Rust. I also use Go, TypeScript, Neovim, and MacOS.
            </p>
            <ul className="about-tools" aria-label="Tools I use">
              {techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="elsewhere" className="elsewhere-section" aria-labelledby="elsewhere-title">
        <div className="section-heading" data-reveal>
          <h2 id="elsewhere-title">Elsewhere</h2>
        </div>
        <ul className="contact-list">
          {contactLinks.map((link) => {
            const isExternal = link.href.startsWith('http')
            const Icon = link.icon
            const accessibleName = `${link.label}${link.label === 'Email' ? ' public@m1n.land' : ''}${isExternal ? ' (opens in new tab)' : ''}`

            return (
              <li key={link.href} data-reveal>
                <a
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="contact-link"
                  aria-label={accessibleName}
                >
                  <Icon className="contact-icon" aria-hidden="true" />
                  <span>{link.label === 'Email' ? 'public@m1n.land' : link.label}</span>
                  <ArrowUpRight className="contact-arrow" aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      <RadioSection />

      <footer className="home-footer">
        <div className="footer-top" data-reveal>
          <h2>Say hello.</h2>
          <a href="mailto:public@m1n.land" className="footer-email">
            public@m1n.land
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom" data-reveal>
          <span>© {new Date().getFullYear()} M1n</span>
          <a href="#hero-title">
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
        <div className="footer-wordmark" aria-hidden="true" data-reveal>
          M1n
        </div>
      </footer>
    </div>
  )
}

export default Page
