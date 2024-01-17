import type { Tweet } from 'react-tweet/api'
import { TweetHeader, TweetBody, enrichTweet } from 'react-tweet'
import Marquee from 'react-fast-marquee'
import { Section } from '@/components/Section'
import { Card } from '@/components/Card'

type TestimonialsProps = {
  tweets: Tweet[]
}

export function Testimonials({ tweets }: TestimonialsProps) {
  return (
    <Section variant="dark" className="pb-10 pt-16 md:pt-24">
      <Marquee pauseOnHover speed={80} className="items-start">
        {tweets.map((t) => {
          const tweet = enrichTweet(t)

          return (
            <div key={tweet.id_str} className="mx-5 w-[350px]">
              <Card className="space-y-3 px-4 py-3 text-sm">
                <TweetBody tweet={tweet} />
                <TweetHeader tweet={tweet} />
              </Card>
            </div>
          )
        })}
      </Marquee>
    </Section>
  )
}
