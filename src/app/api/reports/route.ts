import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { encrypt } from '@/lib/encryption'
import { generateToken, hashToken } from '@/lib/token'
import { classifyReport } from '@/lib/classifier'
import { writeAuditLog } from '@/lib/audit'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { category, description } = body

    if (!category || !description) {
      return NextResponse.json(
        { error: 'Category and description are required' },
        { status: 400 }
      )
    }

    if (description.trim().length < 50) {
      return NextResponse.json(
        { error: 'Description must be at least 50 characters' },
        { status: 400 }
      )
    }

    const token = generateToken()
    const tokenHash = hashToken(token)
    const descriptionEnc = encrypt(description)
    const classification = await classifyReport(description, category)

    const slaDeadline = new Date(
      Date.now() + classification.sla_hours * 60 * 60 * 1000
    )

    const newCase = await prisma.case.create({
      data: {
        tokenHash,
        category,
        descriptionEnc,
        severity: classification.severity,
        credibilityScore: classification.credibility_score,
        criminalFlag: classification.criminal_flag,
        confidence: classification.confidence,
        routing: classification.routing,
        slaHours: classification.sla_hours,
        recommendation: classification.recommendation,
        slaDeadline,
        status: 'open'
      }
    })

    await writeAuditLog(newCase.id, 'System', 'Report received')

    return NextResponse.json({
      token,
      caseId: newCase.id,
      severity: newCase.severity,
      recommendation: newCase.recommendation,
      slaHours: newCase.slaHours
    })

  } catch (error) {
    console.error('Report submission error:', error)
    return NextResponse.json(
      { error: 'Submission failed. Please try again.' },
      { status: 500 }
    )
  }
}
