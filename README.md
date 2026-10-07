# notational.si

Landing site for licensing proprietary company data to frontier AI labs.

- `/` — home
- `/business` — payout estimator, lead capture (emailed via Resend), and Cal.com booking that unlocks after the form is submitted
- `/buyers` — buyer request form
- `/refer` — referral form

## Setup

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Sender on a domain verified in Resend |
| `LEAD_NOTIFY_EMAIL` | Where new leads are sent (comma-separate for several) |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com link, e.g. `your-username/data-valuation-call` |

In development, if the Resend variables are missing, leads are logged to the terminal instead of emailed.

The payout formula lives in `lib/estimate.ts`; the contact email in `lib/site.ts`.
