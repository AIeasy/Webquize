import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Format the data as markdown
    const markdown = generateMarkdown(data)
    
    // Save the markdown to a file
    const filePath = path.join(process.cwd(), 'results.md')
    fs.writeFileSync(filePath, markdown)
    
    return NextResponse.json({ success: true, message: 'Results saved successfully' })
  } catch (error) {
    console.error('Error saving results:', error)
    return NextResponse.json({ success: false, message: 'Failed to save results' }, { status: 500 })
  }
}

function generateMarkdown(data: any) {
  const { quizAnswers, experienceSurveys, finalSurvey } = data
  
  let markdown = `# Quiz and Survey Results\n\n`
  
  // Quiz Answers
  markdown += `## Quiz Answers\n\n`
  Object.entries(quizAnswers || {}).forEach(([questionId, answer]) => {
    markdown += `### Question ${questionId}\n`
    markdown += `- Selected Answer: ${answer}\n\n`
  })
  
  // Experience Surveys
  markdown += `## Experience Surveys\n\n`
  Object.entries(experienceSurveys || {}).forEach(([surveyId, survey]: [string, any]) => {
    markdown += `### Debugger ${surveyId} Survey\n`
    Object.entries(survey).forEach(([question, answer]) => {
      markdown += `- ${question}: ${answer}\n`
    })
    markdown += '\n'
  })
  
  // Final Survey
  if (finalSurvey) {
    markdown += `## Final Survey\n\n`
    markdown += `### Debugger Comparison\n`
    markdown += `- Easiest to use: ${finalSurvey.easiestDebugger}\n`
    markdown += `- Most effective: ${finalSurvey.mostEffectiveDebugger}\n`
    markdown += `- Fastest: ${finalSurvey.fastestDebugger}\n`
    markdown += `- Preferred for future use: ${finalSurvey.futureDebugger}\n\n`
    
    markdown += `### Technical Feedback\n`
    markdown += `- Technical issues encountered: ${finalSurvey.technicalIssues}\n`
    markdown += `- Satisfaction with AR debugger stability: ${finalSurvey.satisfaction}\n\n`
    
    markdown += `### Open-Ended Feedback\n`
    markdown += `#### Most useful feature\n${finalSurvey.mostUsefulFeature || 'No response'}\n\n`
    markdown += `#### Aspect needing most improvement\n${finalSurvey.improvementNeeded || 'No response'}\n\n`
    markdown += `#### Additional comments\n${finalSurvey.additionalComments || 'No response'}\n`
  }
  
  return markdown
}