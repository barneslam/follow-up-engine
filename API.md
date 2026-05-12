# Follow-Up Engine API Reference

Complete API documentation for the Follow-Up Engine backend.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All endpoints are currently public. Authentication will be implemented via Supabase Auth.

## Endpoints

### Health Check

Check API availability.

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-11T10:00:00Z",
  "version": "1.0.0"
}
```

### Meetings

#### List Meetings

Get all meetings for the authenticated user.

```http
GET /meetings
```

**Response:**
```json
{
  "meetings": [
    {
      "id": "meeting-123",
      "title": "Acme Corp - Discovery Call",
      "startTime": "2026-05-10T14:00:00Z",
      "status": "completed",
      "attendees": ["John Smith", "Jane Doe"]
    }
  ]
}
```

#### Create Meeting

Create a new meeting.

```http
POST /meetings
Content-Type: application/json

{
  "title": "Demo Call",
  "startTime": "2026-05-12T15:00:00Z",
  "attendees": ["Client Name"],
  "description": "Product demo and discovery"
}
```

**Response:**
```json
{
  "meeting": {
    "id": "meeting-456",
    "title": "Demo Call",
    "startTime": "2026-05-12T15:00:00Z",
    "status": "scheduled",
    "attendees": ["Client Name"],
    "description": "Product demo and discovery",
    "createdAt": "2026-05-11T10:00:00Z"
  }
}
```

#### Get Meeting

Get meeting details by ID.

```http
GET /meetings/{id}
```

**Response:**
```json
{
  "meeting": {
    "id": "meeting-123",
    "title": "Acme Corp - Discovery Call",
    "startTime": "2026-05-10T14:00:00Z",
    "status": "completed",
    "attendees": ["John Smith", "Jane Doe"],
    "description": ""
  }
}
```

#### Update Meeting

Update meeting details.

```http
PUT /meetings/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "completed",
  "attendees": ["John Smith", "Jane Doe"],
  "description": "Updated description"
}
```

**Response:**
```json
{
  "meeting": {
    "id": "meeting-123",
    "title": "Updated Title",
    "status": "completed",
    "attendees": ["John Smith", "Jane Doe"],
    "description": "Updated description",
    "updatedAt": "2026-05-11T10:05:00Z"
  }
}
```

#### Delete Meeting

Delete a meeting.

```http
DELETE /meetings/{id}
```

**Response:**
```json
{
  "deleted": true,
  "id": "meeting-123"
}
```

### Meeting Prep

#### Generate Prep Materials

Generate pre-meeting preparation content using Claude AI.

```http
POST /meetings/{id}/generate-prep
Content-Type: application/json

{
  "objective": "Discovery",
  "documents": ["document text 1", "document text 2"],
  "customComments": "Focus on budget constraints"
}
```

**Response:**
```json
{
  "meetingId": "meeting-123",
  "agenda": "1. Introductions\n2. Current situation\n3. Needs assessment\n4. Timeline\n5. Next steps",
  "agendaEmail": "Hi [Name],\n\nLooking forward to our call...",
  "questions": [
    "What are your main business goals?",
    "How are you currently managing this?",
    "What's your timeline?",
    "Who else is involved?",
    "What budget are we working with?"
  ],
  "internalBrief": "Key insights and strategy for the meeting...",
  "risks": "Budget concerns. Mitigation: emphasize ROI...",
  "generatedAt": "2026-05-11T10:00:00Z"
}
```

### Meeting Follow-Up

#### Generate Follow-Up Materials

Generate post-meeting follow-up content using Claude AI.

```http
POST /meetings/{id}/generate-followup
Content-Type: application/json

{
  "meetingTitle": "Acme Corp - Discovery Call",
  "attendees": ["John Smith", "Jane Doe"],
  "transcript": "John: Let's start with your current challenges...",
  "objective": "Discovery",
  "keyOutcomes": "Qualified lead, next call scheduled",
  "nextSteps": "Send proposal, schedule demo"
}
```

**Response:**
```json
{
  "meetingId": "meeting-123",
  "thankYouEmail": "Hi John,\n\nThank you for taking the time...",
  "detailedFollowupEmail": "Following up on our call today...",
  "whatsappSummary": "✅ Great call! Key takeaways:\n• Budget: $50K\n• Timeline: Q3\n• Demo: Friday",
  "actionItems": [
    {
      "item": "Send proposal draft",
      "owner": "You",
      "dueDate": "2026-05-12",
      "priority": "High"
    }
  ],
  "internalManagerEmail": "Call summary for your awareness...",
  "pipelineImpact": "Deal value: $50K | Probability: 60% → 75%",
  "revenuePotential": "Monthly recurring revenue: $4,200",
  "riskAssessment": "Budget concerns identified. Mitigation...",
  "recommendedNextSteps": [
    "Send proposal within 24 hours",
    "Schedule technical discovery",
    "Prepare ROI analysis"
  ],
  "missingInformation": [
    "Final budget approval",
    "Implementation timeline",
    "Number of users needed"
  ],
  "generatedAt": "2026-05-11T10:00:00Z"
}
```

### Stripe Payments

#### Create Checkout Session

Create a Stripe checkout session for payment.

```http
POST /stripe/create-checkout-session
Content-Type: application/json

{
  "priceId": "price_1234567890",
  "mode": "payment"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_a1234567890"
}
```

Client-side flow:
1. Receive `sessionId` from API
2. Redirect to: `https://checkout.stripe.com/pay/{sessionId}`

#### Webhook Handler

Stripe webhook for payment events.

```http
POST /stripe/webhook
```

Handles events:
- `checkout.session.completed` - Payment successful
- `customer.subscription.created` - Subscription started
- `customer.subscription.updated` - Subscription changed
- `invoice.paid` - Invoice payment received

## Error Handling

All errors return appropriate HTTP status codes:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Environment Variables

Required for API functionality:

```env
# Claude API
ANTHROPIC_API_KEY=sk_...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Rate Limiting

Not currently implemented. Will be added in Phase 2.

## CORS

Not currently restricted. Will be configured for production.

## TODO: Phase 2

- [ ] Supabase integration for data persistence
- [ ] Authentication middleware
- [ ] Rate limiting
- [ ] Request validation
- [ ] Error logging
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Webhook retry logic
- [ ] Request signing for security
- [ ] Pagination for list endpoints
- [ ] Filtering and sorting
