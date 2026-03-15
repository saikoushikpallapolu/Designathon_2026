import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function writeAuditLog(
  caseId: string,
  actorRole: string,
  action: string
): Promise<void> {
  const last = await prisma.auditLog.findFirst({
    where: { caseId },
    orderBy: { createdAt: 'desc' }
  })

  const prevHash = last?.stateHash ?? 'GENESIS'
  const timestamp = new Date().toISOString()
  const stateHash = crypto
    .createHash('sha256')
    .update(`${caseId}${actorRole}${action}${timestamp}${prevHash}`)
    .digest('hex')

  await prisma.auditLog.create({
    data: { caseId, actorRole, action, stateHash, prevHash }
  })
}
