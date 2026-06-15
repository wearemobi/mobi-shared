export function partitionMenuItems<T extends { danger?: boolean }>(items: T[]) {
  const regularItems = items.filter(i => !i.danger);
  const dangerItems = items.filter(i => i.danger);
  return { regularItems, dangerItems };
}
