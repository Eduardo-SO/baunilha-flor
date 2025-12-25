/**
 * Verifica se um userId está na lista de administradores permitidos
 *
 * Suporta múltiplos formatos:
 * - ADMIN_USER_IDS="user_123,user_456,user_789" (formato novo, múltiplos admins)
 * - ADMIN_USER_ID="user_123" (formato antigo, único admin)
 * - ADMIN_USER_ID="user_123,user_456" (formato antigo com múltiplos IDs)
 *
 * Prioridade: ADMIN_USER_IDS > ADMIN_USER_ID
 */
export function isAdmin(userId: string | null | undefined): boolean {
  if (!userId) {
    return false
  }

  // Prioriza ADMIN_USER_IDS se existir, senão usa ADMIN_USER_ID
  const adminIdsEnv = process.env.ADMIN_USER_IDS || process.env.ADMIN_USER_ID

  if (!adminIdsEnv) {
    return false
  }

  // Divide por vírgula e remove espaços em branco
  const adminIds = adminIdsEnv
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id.length > 0)

  // Verifica se o userId está na lista
  return adminIds.includes(userId)
}
