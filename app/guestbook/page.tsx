import { Button } from 'app/components/ui/button'
import { Input } from 'app/components/ui/input'
import { Label } from 'app/components/ui/label'
import { Textarea } from 'app/components/ui/textarea'
import ZoneLabel from 'app/components/zone-label'
import Script from 'next/script'
import Link from 'next/link'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guestbook',
  description: "Leave a message in M1n's guestbook.",
}

export default function Page() {
  return (
    <section className="flex flex-1 flex-col">
      <div className={cn('zone', entranceClasses(0))}>
        <ZoneLabel label="GUESTBOOK" unitId="LOG / IN" />
        <div className="zone-body">
          <h1 className="display-type !text-[clamp(2.25rem,9vw,3.75rem)]">Log</h1>
          <p className="mt-3 font-mono text-[0.8rem] leading-relaxed text-muted-foreground">
            Leave a message. Plain text only.
          </p>
        </div>
      </div>

      <Script
        src="https://guestbooks.meadow.cafe/resources/js/embed_script/590/script.js"
        strategy="afterInteractive"
      />

      <div
        id="guestbooks___guestbook-form-container"
        className={cn('zone', entranceClasses(1, 'reveal'))}
      >
        <ZoneLabel label="TRANSMIT" unitId="FORM" />
        <div className="zone-body">
          <form
            id="guestbooks___guestbook-form"
            action="https://guestbooks.meadow.cafe/guestbook/590/submit"
            method="post"
            className="space-y-4"
          >
            <div className="guestbooks___input-container space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" required className="w-full" />
            </div>
            <div className="guestbooks___input-container space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input type="url" id="website" name="website" className="w-full" />
            </div>
            <div id="guestbooks___challenge-answer-container"></div>
            <div className="guestbooks___input-container space-y-2">
              <Label htmlFor="text">Message</Label>
              <Textarea
                id="text"
                name="text"
                required
                placeholder="PLAIN TEXT ONLY."
                className="w-full min-h-[100px] resize-y"
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Submit {'>>>'}
            </Button>
            <div id="guestbooks___error-message"></div>
          </form>
        </div>
      </div>

      <div
        id="guestbooks___guestbook-made-with"
        className="border-b border-border px-4 py-2 sm:px-5"
      >
        <small className={designSystem.typography.caption}>
          Made with{' '}
          <Link
            target="_blank"
            href="https://guestbooks.meadow.cafe"
            className={designSystem.colors.text.link}
          >
            Guestbooks
          </Link>
        </small>
      </div>

      <div className={cn('zone flex-1', entranceClasses(2, 'reveal'))}>
        <ZoneLabel label="MESSAGES" unitId="FEED" />
        <h2 id="guestbooks___guestbook-messages-header" className="sr-only">
          Messages
        </h2>
        <div id="guestbooks___guestbook-messages-container" />
      </div>
    </section>
  )
}
