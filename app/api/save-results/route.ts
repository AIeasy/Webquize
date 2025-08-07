import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Format the data as markdown
    const markdown = generateMarkdown(data)
    
    // Define the result directory path
    const resultDir = path.join(process.cwd(), 'app', 'result')
    
    // Create the result directory if it doesn't exist
    try {
      await fs.mkdir(resultDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, continue
    }
    
    // Generate base filename
    const baseFilename = 'result'
    
    // Check if files with this name already exist and find the next available number
    let fileNumber = 0
    let filename = `${baseFilename}.md`
    let filePath = path.join(resultDir, filename)
    
    try {
      // Get all files in the directory
      const files = await fs.readdir(resultDir)
      
      // Filter files that match our naming pattern (result.md, result_1.md, etc.)
      const resultFiles = files.filter(file => 
        file.startsWith(baseFilename) && file.endsWith('.md')
      )
      
      if (resultFiles.length > 0) {
        // Extract numbers from filenames
        const numbers = resultFiles.map(file => {
          const match = file.match(/^result(?:_(\d+))?\.md$/)
          return match ? (match[1] ? parseInt(match[1]) : 0) : -1
        }).filter(num => num !== -1)
        
        // Find the highest number and add 1
        if (numbers.length > 0) {
          fileNumber = Math.max(...numbers) + 1
          filename = `${baseFilename}_${fileNumber}.md`
        } else {
          // If result.md exists but no numbered files, start with _1
          if (resultFiles.includes('result.md')) {
            fileNumber = 1
            filename = `${baseFilename}_${fileNumber}.md`
          }
        }
      }
    } catch (error) {
      // Directory might not exist yet, use default filename
      console.error('Error checking existing files:', error)
    }
    
    // Save the markdown to a file
    filePath = path.join(resultDir, filename)
    await fs.writeFile(filePath, markdown)
    
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