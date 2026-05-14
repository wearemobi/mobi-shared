# <img src="https://wearemobi.com/icon-light.svg" width="24" height="24" valign="middle"> M.O.B.I.™ · Design Kit — Agent Implementation Guide

> **For AI agents building applications with `@wearemobi/shared`.**  
> Read this before writing any component code. It contains the rules, patterns, and component reference you need to produce correct, consistent, MOBI-native interfaces.

---

## 1. Quick Start

```bash
# Install
npm install @wearemobi/shared
```

```tsx
// main.tsx / root entry point — ALWAYS include the provider
import { MobiToastProvider } from '@wearemobi/shared';
import '@wearemobi/shared/style.css'; // required — contains all design tokens

createRoot(document.getElementById('root')!).render(
  <MobiToastProvider>
    <App />
  </MobiToastProvider>
);
```

> [!IMPORTANT]
> `@wearemobi/shared/style.css` MUST be imported. Without it, CSS variables (`--mobi-primary`, `--mobi-surface`, etc.) are undefined and no component will render correctly.

---

## 2. Design Tokens (CSS Variables)

All components use these Tailwind custom color tokens. Never hardcode hex values — always use the token names.

| Token | Purpose |
|---|---|
| `mobi-bg` | Page/app background |
| `mobi-surface` | Card, panel, dropdown backgrounds |
| `mobi-surface-hover` | Hover state for interactive surfaces |
| `mobi-border` | Subtle borders and dividers |
| `mobi-primary` | Brand accent (buttons, active states, highlights) |
| `mobi-text` | Primary text |
| `mobi-text-muted` | Secondary / helper text |

**Dark mode** is handled automatically by `useMobiTheme`. Apply the `.dark` class to `<html>` or use the hook — never manage it manually.

---

## 3. Core Rules for Agents

1. **Use MOBI components first.** Before writing a custom `<button>`, check if `MobiButton` covers the case. Same for inputs, cards, modals, tables.
2. **Never use raw HTML form elements** (`<input>`, `<select>`, `<textarea>`) — use `MobiInput`, `MobiDropdown`, `MobiCheckbox`.
3. **All forms use `useMobiForm`** for state, validation, and submission lifecycle.
4. **Never hardcode colors** — always use Tailwind token classes (`bg-mobi-surface`, `text-mobi-text`, etc.).
5. **Errors go through `FormError`** (inline) or `useMobiToast` (global) — never `alert()` or console.error.
6. **Loading states use `MobiSkeleton`** — never blank panels.
7. **`MobiToastProvider` must wrap the root** if you use `useMobiToast` anywhere.

---

## 4. Component Reference

### Layout Shell

| Component | Props Summary | When to Use |
|---|---|---|
| `MobiNavbar` | `title`, `actions`, `logo` | Top app bar |
| `MobiSidebar` | `items`, `activeId`, `collapsed` | Side navigation |
| `MobiFooter` | `children` | App footer |
| `MobiCard` | `title?`, `footer?`, extends `div` | Any content container |
| `MobiHero` | `title`, `subtitle`, `actions` | Landing / header sections |

**Typical app shell pattern:**
```tsx
<div className="flex h-screen bg-mobi-bg">
  <MobiSidebar items={navItems} activeId={activeRoute} />
  <div className="flex flex-col flex-1 overflow-hidden">
    <MobiNavbar title="Fleet Command" />
    <main className="flex-1 overflow-y-auto p-6">
      {/* page content */}
    </main>
  </div>
</div>
```

---

### Forms

All form components integrate with `useMobiForm`. Use them together.

| Component | Variants / Notes |
|---|---|
| `MobiInput` | `type`: text, email, password, number, money, textarea |
| `MobiDropdown` | `options: {value, label}[]` — single select |
| `MobiCheckbox` | `variant`: checkbox, radio, toggle |
| `MobiFormLabel` | `variant`: label, section, title — use for all form headings |
| `FormError` | Shared error display — used internally by inputs, export for custom fields |

**Complete form pattern:**
```tsx
const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
  useMobiForm({
    initialValues: { email: '', plan: '', agreeTerms: false },
    validationRules: {
      email: [mobiValidators.required(), mobiValidators.email()],
      plan: [mobiValidators.required()],
    },
    onSubmit: async (data) => {
      await api.register(data);
      toast.success('Account created!');
    },
  });

<form onSubmit={handleSubmit} noValidate>
  <MobiFormLabel variant="section">Account Setup</MobiFormLabel>

  <MobiInput
    label="Email Address"
    type="email"
    name="email"
    value={values.email}
    onChange={handleChange}
    onBlur={handleBlur}
    error={touched.email ? errors.email : undefined}
    required
  />

  <MobiDropdown
    label="Plan"
    name="plan"
    value={values.plan}
    onChange={handleChange}
    onBlur={handleBlur}
    error={touched.plan ? errors.plan : undefined}
    options={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'PRO' }]}
    placeholder="Select a plan"
  />

  <MobiCheckbox
    variant="toggle"
    label="I agree to the Terms of Service"
    name="agreeTerms"
    checked={values.agreeTerms}
    onChange={handleChange}
  />

  <MobiButton type="submit" loading={isSubmitting}>Create Account</MobiButton>
</form>
```

**Chained dropdowns (Country → State → City):**
```tsx
// Use separate state, filter options based on parent value
const [country, setCountry] = useState('');
const [state, setState] = useState('');

<MobiDropdown value={country} onChange={(e) => { setCountry(e.target.value); setState(''); }} options={countries} />
<MobiDropdown value={state} onChange={(e) => setState(e.target.value)} options={states.filter(s => s.countryId === country)} disabled={!country} />
```

---

### Feedback & Notifications

| Component / Hook | When to Use |
|---|---|
| `useMobiToast` + `MobiToastProvider` | Global async feedback (save, delete, error) |
| `MobiAlert` | Inline, persistent contextual messages |
| `MobiProgress` | File upload, processing, loading steps |
| `MobiSkeleton` / `MobiSkeletonGroup` | Initial data loading state |
| `MobiErrorBoundary` | Wraps major page sections to catch crashes |

**Toast usage:**
```tsx
const { toast } = useMobiToast(); // hook — requires MobiToastProvider at root

toast.success('Fleet saved!', 'Success');
toast.error('Connection failed.', 'Error');
toast.warning('Low energy.', 'Warning');
toast.info('Sync in progress...');
// Persistent (no auto-dismiss):
toast.custom({ message: 'Processing...', type: 'info', duration: 0 });
```

**Skeleton loading pattern:**
```tsx
{isLoading ? (
  <MobiCard>
    <MobiSkeletonGroup avatar title lines={3} />
  </MobiCard>
) : (
  <FleetCard data={data} />
)}
```

---

### Modal / Dialog

```tsx
const [open, setOpen] = useState(false);

<MobiButton onClick={() => setOpen(true)}>Delete Fleet</MobiButton>

<MobiModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm Deletion"
  description="This action is irreversible."
  size="sm"
  footer={
    <div className="flex justify-end gap-3">
      <MobiButton variant="ghost" onClick={() => setOpen(false)}>Cancel</MobiButton>
      <MobiButton variant="danger" onClick={handleDelete}>Delete</MobiButton>
    </div>
  }
>
  <p className="text-sm text-mobi-text-muted">
    Are you sure you want to delete <strong>Fleet Alpha</strong>?
  </p>
</MobiModal>
```

**Sizes:** `sm` (428px) | `md` (512px, default) | `lg` (672px) | `xl` (896px) | `full`

---

### Data Display

#### MobiTable
```tsx
<MobiTable<Fleet>
  columns={[
    { key: 'name', title: 'Fleet Name' },
    {
      key: 'status',
      title: 'Status',
      render: (row) => <MobiBadge variant={row.status === 'active' ? 'success' : 'error'} dot>{row.status}</MobiBadge>,
    },
    { key: 'nodes', title: 'Nodes', align: 'right' },
  ]}
  data={fleets}
  keyExtractor={(row) => row.id}
  loading={isLoading}
  onRowClick={(row) => navigate(`/fleets/${row.id}`)}
  striped
  emptyMessage="No fleets found."
/>
```

#### MobiPagination
```tsx
// Always pair with MobiTable
const [page, setPage] = useState(1);
const PAGE_SIZE = 20;

<MobiTable data={items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)} ... />
<MobiPagination
  currentPage={page}
  totalPages={Math.ceil(items.length / PAGE_SIZE)}
  onChange={setPage}
  showEdges
/>
```

#### MobiBadge
```tsx
<MobiBadge variant="success" dot>Online</MobiBadge>
<MobiBadge variant="error">Offline</MobiBadge>
<MobiBadge variant="warning">Degraded</MobiBadge>
<MobiBadge variant="info">Pending</MobiBadge>
<MobiBadge>v1.3.6</MobiBadge>  {/* default */}
```

---

### Navigation

#### MobiTabs
```tsx
const [tab, setTab] = useState('overview');

<MobiTabs
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Metrics', badge: 3 },
    { id: 'settings', label: 'Settings' },
  ]}
  activeId={tab}
  onChange={setTab}
  variant="underline"   // 'default' | 'pills' | 'underline'
/>

{/* Panels — manage yourself */}
<div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
  {tab === 'overview' && <OverviewPanel />}
  {tab === 'metrics' && <MetricsPanel />}
  {tab === 'settings' && <SettingsPanel />}
</div>
```

---

### Utility Components

| Component | Purpose |
|---|---|
| `MobiTooltip` | Hover/focus tooltip on any trigger element |
| `MobiProgress` | Numeric progress bar (requires ARIA props — already built in) |
| `MobiSwitcher` | Segmented control for small option sets (theme, language, size) |
| `MobiDropbox` | Drag-and-drop file upload zone |
| `MobiAnalytics` | GA4 script injector — place once at root |
| `MobiErrorBoundary` | Crash boundary — wrap page-level sections |

**Tooltip:**
```tsx
<MobiTooltip content="Delete record" position="top">
  <MobiButton variant="danger">🗑</MobiButton>
</MobiTooltip>
```

---

### User Identity

| Component | Purpose |
|---|---|
| `MobiSentinelMenu` | Full user dropdown (avatar + menu + theme/lang switchers) |
| `MobiUserBadge` | Avatar chip with plan indicator |
| `MobiPlanBadge` | `FREE` / `PRO` / `ENTERPRISE` badge |

```tsx
<MobiSentinelMenu
  user={{ initials: 'CA', email: 'dev@mobi.com', plan: 'PRO', org: 'Fleet HQ' }}
  items={[
    { id: 'settings', label: 'Settings', onClick: () => navigate('/settings') },
    { id: 'logout', label: 'Logout', danger: true, onClick: handleLogout },
  ]}
/>
```

---

### Hooks Reference

| Hook | Returns | Purpose |
|---|---|---|
| `useMobiForm` | `{ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }` | Full form lifecycle management |
| `useMobiToast` | `{ toast, dismiss, clearAll }` | Toast notifications |
| `useMobiTheme` | `{ theme, setTheme }` | Dark/light/system theme |
| `useMobiClipboard` | `{ copy, isCopied }` | Clipboard write with feedback |
| `useMobiAnalytics` | `{ trackEvent, trackPageView, identify, trackException }` | GA4 event tracking |
| `useMobiAuth` | `{ isAuthenticated, user, loading, login, logout }` | Auth state stub (JS Bridge v1.19) |
| `useMobiVault` | `{ upload, isUploading, results, lastError }` | File upload to Vault microservice |
| `useMobiChat` | `{ messages, sendMessage, isProcessing, clearHistory }` | AI chat state |

---

## 5. Validators Reference (`mobiValidators`)

```tsx
import { mobiValidators } from '@wearemobi/shared';

// Available validators:
mobiValidators.required(message?)          // field must have value
mobiValidators.email(message?)             // valid email format
mobiValidators.minLength(n, message?)      // string min length
mobiValidators.maxLength(n, message?)      // string max length
mobiValidators.min(n, message?)            // numeric min value
mobiValidators.max(n, message?)            // numeric max value
mobiValidators.number(message?)            // must be valid number
mobiValidators.currency(message?)          // valid money format
mobiValidators.pattern(regex, message?)    // custom regex

// Usage in useMobiForm:
validationRules: {
  email: [mobiValidators.required(), mobiValidators.email()],
  budget: [mobiValidators.required(), mobiValidators.min(1), mobiValidators.currency()],
  name: [mobiValidators.required(), mobiValidators.minLength(2), mobiValidators.maxLength(50)],
}
```

---

## 6. Common Page Patterns

### Dashboard Layout
```tsx
<div className="flex h-screen bg-mobi-bg overflow-hidden">
  <MobiSidebar items={navItems} activeId="dashboard" />
  <div className="flex flex-col flex-1 min-w-0">
    <MobiNavbar title="Dashboard" actions={<MobiSentinelMenu user={user} />} />
    <main className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MobiCard title="Active Fleets"><h3 className="text-4xl font-black text-mobi-primary">42</h3></MobiCard>
      </div>
      {/* Data table */}
      <MobiCard title="Fleet Registry">
        <MobiTable columns={cols} data={data} keyExtractor={(r) => r.id} loading={loading} striped />
        <div className="mt-4 flex justify-end">
          <MobiPagination currentPage={page} totalPages={pages} onChange={setPage} />
        </div>
      </MobiCard>
    </main>
  </div>
</div>
```

### Settings Page (Tabs + Form)
```tsx
const [tab, setTab] = useState('profile');

<MobiTabs tabs={[
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'billing', label: 'Billing' },
]} activeId={tab} onChange={setTab} variant="underline" />

<div className="mt-6">
  {tab === 'profile' && <ProfileForm />}
  {tab === 'security' && <SecurityForm />}
  {tab === 'billing' && <BillingPanel />}
</div>
```

### Confirmation Modal Pattern
```tsx
// Reusable confirm hook pattern
const [confirmOpen, setConfirmOpen] = useState(false);
const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);

const confirm = (action: () => Promise<void>) => {
  setPendingAction(() => action);
  setConfirmOpen(true);
};

<MobiModal
  isOpen={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title="Confirm"
  size="sm"
  footer={
    <div className="flex justify-end gap-2">
      <MobiButton variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</MobiButton>
      <MobiButton variant="danger" onClick={async () => { await pendingAction?.(); setConfirmOpen(false); }}>
        Confirm
      </MobiButton>
    </div>
  }
>
  <p className="text-sm text-mobi-text-muted">This action cannot be undone.</p>
</MobiModal>
```

---

## 7. Do's and Don'ts

### ✅ Do

- Import everything from `'@wearemobi/shared'` — all components and hooks are barrel-exported.
- Use `MobiCard` to wrap any content section.
- Use `MobiSkeleton` / `MobiSkeletonGroup` while data loads.
- Use semantic `MobiBadge` variants (`success`, `error`, `warning`) to communicate status.
- Add `aria-label` to icon-only buttons.
- Wrap root with `<MobiToastProvider>` before using `useMobiToast`.
- Use `MobiCheckbox variant="toggle"` for on/off settings instead of custom switches.
- Use `MobiTabs` instead of custom tab implementations.

### ❌ Don't

- Don't use `<input>`, `<select>`, `<button>`, `<textarea>` raw — use MOBI equivalents.
- Don't hardcode `#color` values — use `text-mobi-*`, `bg-mobi-*` classes.
- Don't manage toast state manually — use `useMobiToast`.
- Don't nest `<MobiToastProvider>` — one instance at root only.
- Don't call `useMobiToast()` outside `<MobiToastProvider>` — it throws.
- Don't skip `keyExtractor` on `MobiTable` — React key uniqueness is required.
- Don't use `MobiSwitcher` for more than 4-5 options — use `MobiTabs` or `MobiDropdown`.
- Don't put business logic in `render` functions — use hooks.

---

## 8. Analytics Integration

```tsx
// App.tsx
<MobiAnalytics measurementId="G-XXXXXXXXXX" disabled={import.meta.env.DEV} />

// Anywhere:
const { trackEvent, trackPageView, identify } = useMobiAnalytics({ measurementId: 'G-XXXXXXXXXX' });

// On form submit:
trackEvent('form_submit', { event_category: 'Lead', event_label: 'Fleet Registration' });

// On SPA route change:
useEffect(() => { trackPageView(location.pathname) }, [location.pathname]);

// On user login:
identify(user.id, { plan: user.plan });
```

---

## 9. File & Version Reference

```
@wearemobi/shared v1.3.6
│
├── Components
│   ├── Layout:       MobiNavbar, MobiSidebar, MobiFooter, MobiCard, MobiHero
│   ├── Forms:        MobiInput, MobiDropdown, MobiCheckbox, MobiFormLabel, FormError
│   ├── Feedback:     MobiAlert, MobiToastProvider, MobiProgress, MobiSkeleton, MobiSkeletonGroup
│   ├── Overlay:      MobiModal
│   ├── Data:         MobiTable, MobiBadge, MobiPagination
│   ├── Navigation:   MobiTabs, MobiSwitcher
│   ├── Identity:     MobiSentinelMenu, MobiUserBadge, MobiPlanBadge
│   ├── Chat:         MobiChatWidget, MobiChatFeed, MobiChatInput
│   ├── Files:        MobiDropbox
│   ├── Utility:      MobiTooltip, MobiProgress, MobiErrorBoundary, MobiMarkdown
│   └── Analytics:    MobiAnalytics
│
├── Hooks
│   ├── useMobiForm         — form state + validation
│   ├── useMobiToast        — toast notifications
│   ├── useMobiTheme        — dark/light/system theme
│   ├── useMobiAnalytics    — GA4 event tracking
│   ├── useMobiClipboard    — clipboard write
│   ├── useMobiChat         — AI chat state
│   ├── useMobiAuth         — auth stub (JS Bridge v1.19)
│   ├── useMobiVault        — vault file ingestion
│   └── useMobiEnergy       — energy lifecycle simulation
│
└── Utilities
    └── mobiValidators      — form field validators
```

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<!-- M.O.B.I. Core: SDD-Compliant-V1.7 | Sentinel-Status: ACTIVE -->
