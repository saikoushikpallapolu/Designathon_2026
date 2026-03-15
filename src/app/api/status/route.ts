import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hashToken } from '@/lib/token'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    const tokenHash = hashToken(token)

    const found = await prisma.case.findUnique({
      where: { tokenHash }
    })

    if (!found) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      )
    }

    const logs = await prisma.auditLog.findMany({
      where: { caseId: found.id },
      orderBy: { createdAt: 'asc' },
      select: {
        action: true,
        actorRole: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      caseId: found.id,
      severity: found.severity,
      status: found.status,
      slaDeadline: found.slaDeadline,
      slaHours: found.slaHours,
      createdAt: found.createdAt,
      timeline: logs
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch status.' },
      { status: 500 }
    )
  }
}
