# Follow-Up Engine Launch Readiness Checklist

## Status
Current stage: Controlled MVP readiness

## Completed
- GitHub branch / PR workflow established
- Local build validation working
- Netlify preview checks working
- Privacy Policy added
- Terms and Conditions hardened
- Demo data warning added
- Live-client consent warning added
- Stale localStorage verification helpers removed
- Team Setup form connected to Supabase
- Supabase table created: team_setup_requests
- Row Level Security configured
- Team Setup insert tested end-to-end
- Retention/deletion readiness language added

## MVP Launch Requirements
- [ ] Homepage loads correctly
- [ ] Pricing page loads correctly
- [ ] Demo page loads correctly
- [ ] Privacy Policy page loads correctly
- [ ] Terms page loads correctly
- [ ] Footer links work
- [ ] Team Setup form submits to Supabase
- [ ] Trial request form works
- [ ] SMS verification works
- [ ] Netlify production deploy passes
- [ ] Supabase environment variables are set in Netlify
- [ ] No sensitive keys committed to GitHub
- [ ] Mobile layout checked
- [ ] Browser console checked for red errors

## Not Yet Production-Grade
These items must be completed before storing real client transcript data at scale:

- [ ] Automated 90-day deletion job
- [ ] Customer-controlled deletion workflow
- [ ] Encryption architecture reviewed
- [ ] Audit/event logging added
- [ ] Auth/session model hardened
- [ ] Data export process defined
- [ ] Backup/recovery process defined
- [ ] Legal review completed for Privacy Policy and Terms

## Operating Rule
No feature is considered ready unless it passes:
1. Local build
2. Local browser test
3. PR review
4. Preview deploy
5. Production verification