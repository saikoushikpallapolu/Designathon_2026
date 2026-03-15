import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const FALLBACK = {
  severity: 2,
  category: 'Unclassified',
  criminal_flag: false,
  confidence: 0.5,
  credibility_score: 0.5,
  routing: 'HR',
  sla_hours: 168,
  recommendation: 'Manual review required'
}

export async function classifyReport(
  description: string,
  category: string
) {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are a harassment case classifier for a college ' +
            'campus. Return ONLY valid JSON, no explanation.'
        },
        {
          role: 'user',
          content:
            `Category: ${category}\nDescription: ${description}\n\n` +
            'Return this exact JSON:\n' +
            '{\n' +
            '  "severity": 1-4,\n' +
            '  "category": "string",\n' +
            '  "criminal_flag": boolean,\n' +
            '  "confidence": 0.0-1.0,\n' +
            '  "credibility_score": 0.0-1.0,\n' +
            '  "routing": "HR or Legal or Ombudsman",\n' +
            '  "sla_hours": number,\n' +
            '  "recommendation": "max 20 words"\n' +
            '}\n' +
            'Severity: 1=criminal, 2=serious, ' +
            '3=policy breach, 4=informational'
        }
      ]
    })

    const result = JSON.parse(
      response.choices[0].message.content ?? '{}'
    )

    if (!result.severity || !result.routing) return FALLBACK
    return result

  } catch {
    return FALLBACK
  }
}
