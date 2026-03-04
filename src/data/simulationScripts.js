export const FALLBACK_SCRIPTS = {
  search: {
    steps: [
      {
        id: 1,
        tool: 'Gmail',
        action: 'Searching inbox',
        detail: 'gmail.search("is:unread newer_than:1d")',
        result: 'Found 3 unread emails from today',
        status: 'pending',
      },
      {
        id: 2,
        tool: 'Gmail',
        action: 'Reading messages',
        detail: 'gmail.read(messageIds: [...])',
        result: 'Read 3 messages — 1 from team lead, 1 meeting invite, 1 newsletter',
        status: 'pending',
      },
      {
        id: 3,
        tool: 'Gmail',
        action: 'Drafting summary',
        detail: 'gmail.createDraft(to: "user", subject: "Daily Summary")',
        result: 'Draft created with email summary',
        status: 'pending',
      },
    ],
    response:
      "I checked your inbox and found 3 unread emails today:\n\n1. **Team Lead** — Sprint review moved to Thursday 2pm\n2. **Meeting Invite** — Design sync tomorrow at 10am\n3. **Newsletter** — Weekly tech digest\n\nI've drafted a summary email for your reference.",
    artifacts: [
      { type: 'draft', title: 'Daily Email Summary', icon: '📧' },
    ],
  },
  draft: {
    steps: [
      {
        id: 1,
        tool: 'Gmail',
        action: 'Analyzing request',
        detail: 'Parsing email composition details',
        result: 'Identified recipients, subject, and body content',
        status: 'pending',
      },
      {
        id: 2,
        tool: 'Gmail',
        action: 'Creating draft',
        detail: 'gmail.createDraft(to: "recipient", subject: "...", body: "...")',
        result: 'Draft created successfully',
        status: 'pending',
      },
    ],
    response:
      "I've drafted the email for you. You can review it in your Drafts folder before sending.",
    artifacts: [
      { type: 'draft', title: 'Email Draft', icon: '📧' },
    ],
  },
  send: {
    steps: [
      {
        id: 1,
        tool: 'Gmail',
        action: 'Composing email',
        detail: 'gmail.compose(to: "recipient", subject: "...", body: "...")',
        result: 'Email composed',
        status: 'pending',
      },
      {
        id: 2,
        tool: 'Gmail',
        action: 'Sending email',
        detail: 'gmail.send(messageId: "...")',
        result: 'Email sent successfully',
        status: 'pending',
      },
    ],
    response:
      "Done! The email has been sent successfully.",
    artifacts: [
      { type: 'sent', title: 'Sent Email', icon: '📧' },
    ],
  },
  default: {
    steps: [
      {
        id: 1,
        tool: 'Gmail',
        action: 'Connecting to Gmail',
        detail: 'gmail.authenticate()',
        result: 'Connected to Gmail API',
        status: 'pending',
      },
      {
        id: 2,
        tool: 'Gmail',
        action: 'Processing request',
        detail: 'Analyzing user request for Gmail actions',
        result: 'Request processed',
        status: 'pending',
      },
    ],
    response:
      "I've processed your request. I can help you search emails, read messages, draft replies, and manage your inbox. What would you like to do?",
    artifacts: [],
  },
};

export function selectScript(userMessage) {
  const lower = userMessage.toLowerCase();
  if (lower.includes('send') || lower.includes('reply') || lower.includes('respond')) {
    return FALLBACK_SCRIPTS.send;
  }
  if (lower.includes('draft') || lower.includes('write') || lower.includes('compose')) {
    return FALLBACK_SCRIPTS.draft;
  }
  if (lower.includes('inbox') || lower.includes('unread') || lower.includes('search') || lower.includes('find') || lower.includes('check') || lower.includes('email') || lower.includes('mail')) {
    return FALLBACK_SCRIPTS.search;
  }
  return FALLBACK_SCRIPTS.default;
}
