export function buildAuthHeaders(tenantId: string, token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Tenant-Id': tenantId,
    'Authorization': `Bearer ${token}`
  };
}
