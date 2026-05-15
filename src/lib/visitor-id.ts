const KEY = 'ml_portfolio_visitor_id';
const SEEN = 'ml_portfolio_seen';

export function getVisitorId(): string | null {
  if (typeof window === 'undefined') return null;
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? `v_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(KEY, id);
  }
  return id;
}

export function hasBeenSeen(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SEEN) === 'true';
}

export function markSeen() {
  if (typeof window !== 'undefined') window.localStorage.setItem(SEEN, 'true');
}

export function clearVisitorId() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
  window.localStorage.removeItem(SEEN);
}
