import { Button } from 'app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'app/components/ui/card'
import { Input } from 'app/components/ui/input'
import { Label } from 'app/components/ui/label'
import { Textarea } from 'app/components/ui/textarea'
import Script from 'next/script'
import Link from 'next/link'
import PageHeader from 'app/components/page-header'
import { entranceClasses } from 'app/lib/animation'
import { designSystem } from 'app/lib/design-system'
import { cn } from 'app/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guestbook',
  description:
    'Leave a message in my guestbook - share your thoughts, feedback, or just say hello!',
}

export default function Page() {
  return (
    <section className={designSystem.spacing.page}>
      <PageHeader title="My Guestbook" className={entranceClasses(0)} />

      <Script
        src="https://guestbooks.meadow.cafe/resources/js/embed_script/590/script.js"
        strategy="afterInteractive"
      />

      <Card id="guestbooks___guestbook-form-container" className={entranceClasses(1, 'reveal')}>
        <CardHeader>
          <CardTitle className="text-base">Leave a message</CardTitle>
        </CardHeader>
        <CardContent>
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
                placeholder="Plain text only..."
                className="w-full min-h-[100px] resize-y"
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
            <div id="guestbooks___error-message"></div>
          </form>
        </CardContent>
      </Card>

      <div id="guestbooks___guestbook-made-with" className="text-right">
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

      <div className={cn('border-t border-border pt-6', entranceClasses(2, 'reveal'))}>
        <h2
          id="guestbooks___guestbook-messages-header"
          className={`${designSystem.spacing.component.sm} ${designSystem.typography.sectionTitle}`}
        >
          Messages
        </h2>
        <div id="guestbooks___guestbook-messages-container" className="mt-4" />
      </div>
    </section>
  )
}
