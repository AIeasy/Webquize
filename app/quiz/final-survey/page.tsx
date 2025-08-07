"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function FinalSurveyPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    easiestDebugger: "",
    mostEffectiveDebugger: "",
    fastestDebugger: "",
    futureDebugger: "",
    technicalIssues: "",
    satisfaction: "",
    mostUsefulFeature: "",
    improvementNeeded: "",
    additionalComments: ""
  })

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
    
    if (formErrors[field]) {
      const newErrors = { ...formErrors }
      delete newErrors[field]
      setFormErrors(newErrors)
    }
  }

  const validateForm = () => {
    const requiredFields = ['easiestDebugger', 'mostEffectiveDebugger', 'fastestDebugger', 'futureDebugger', 'technicalIssues', 'satisfaction']
    const newErrors: Record<string, boolean> = {}
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true
      }
    })
    
    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      try {
        // Save to localStorage
        localStorage.setItem('finalSurvey', JSON.stringify(formData))
        
        // Gather all data
        const demographicSurvey = JSON.parse(localStorage.getItem('demographicSurvey') || '{}')
        const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}')
        const experienceSurveys = JSON.parse(localStorage.getItem('experienceSurveys') || '{}')
        
        const allData = {
          timestamp: new Date().toISOString(),
          demographicSurvey,
          quizAnswers,
          experienceSurveys,
          finalSurvey: formData
        }
        
        // Send data to API endpoint
        const response = await fetch('/api/save-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(allData)
        })
        
        if (response.ok) {
          console.log('Survey data submitted successfully!')
          localStorage.clear() // Clear all local storage data
          router.push('/quiz/thank-you')
        } else {
          console.error('Failed to submit survey data:', response.statusText)
          alert('Failed to submit survey data. Please try again.')
        }
      } catch (error) {
        console.error('Error submitting survey data:', error)
        alert('An error occurred while submitting survey data. Please try again.')
      }
    }
  }
  
  const generateMarkdown = (quizAnswers: any, experienceSurveys: any, finalSurvey: any) => {
    return `# Quiz and Survey Results

## Quiz Answers
${JSON.stringify(quizAnswers, null, 2)}

## Experience Surveys
${JSON.stringify(experienceSurveys, null, 2)}

## Final Survey
${JSON.stringify(finalSurvey, null, 2)}
`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Final Survey</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Debugger Comparison Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-red-500">Debugger Comparison</h2>
                
                {/* Question 14 */}
                <div className="space-y-3" data-error={formErrors.easiestDebugger || undefined}>
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">14.</span>
                    <h3 className="text-lg font-medium text-red-500">Which debugger was the easiest to use?</h3>
                  </div>
                  
                  <RadioGroup 
                    value={formData.easiestDebugger} 
                    onValueChange={(value) => handleInputChange('easiestDebugger', value)}
                    className="flex flex-col space-y-1 ml-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger1" id="easiest-debugger1" />
                      <Label htmlFor="easiest-debugger1">Debugger 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger2" id="easiest-debugger2" />
                      <Label htmlFor="easiest-debugger2">Debugger 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger3" id="easiest-debugger3" />
                      <Label htmlFor="easiest-debugger3">Debugger 3</Label>
                    </div>
                  </RadioGroup>
                  
                  {formErrors.easiestDebugger && (
                    <p className="text-red-500 text-sm ml-6">Please select a debugger</p>
                  )}
                </div>

                {/* Question 15 */}
                <div className="space-y-3" data-error={formErrors.mostEffectiveDebugger || undefined}>
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">15.</span>
                    <h3 className="text-lg font-medium text-red-500">Which debugger helped you locate bugs most effectively?</h3>
                  </div>
                  
                  <RadioGroup 
                    value={formData.mostEffectiveDebugger} 
                    onValueChange={(value) => handleInputChange('mostEffectiveDebugger', value)}
                    className="flex flex-col space-y-1 ml-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger1" id="effective-debugger1" />
                      <Label htmlFor="effective-debugger1">Debugger 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger2" id="effective-debugger2" />
                      <Label htmlFor="effective-debugger2">Debugger 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger3" id="effective-debugger3" />
                      <Label htmlFor="effective-debugger3">Debugger 3</Label>
                    </div>
                  </RadioGroup>
                  
                  {formErrors.mostEffectiveDebugger && (
                    <p className="text-red-500 text-sm ml-6">Please select a debugger</p>
                  )}
                </div>

                {/* Question 16 */}
                <div className="space-y-3" data-error={formErrors.fastestDebugger || undefined}>
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">16.</span>
                    <h3 className="text-lg font-medium text-red-500">Which debugger felt the fastest to use?</h3>
                  </div>
                  
                  <RadioGroup 
                    value={formData.fastestDebugger} 
                    onValueChange={(value) => handleInputChange('fastestDebugger', value)}
                    className="flex flex-col space-y-1 ml-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger1" id="fastest-debugger1" />
                      <Label htmlFor="fastest-debugger1">Debugger 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger2" id="fastest-debugger2" />
                      <Label htmlFor="fastest-debugger2">Debugger 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger3" id="fastest-debugger3" />
                      <Label htmlFor="fastest-debugger3">Debugger 3</Label>
                    </div>
                  </RadioGroup>
                  
                  {formErrors.fastestDebugger && (
                    <p className="text-red-500 text-sm ml-6">Please select a debugger</p>
                  )}
                </div>

                {/* Question 17 */}
                <div className="space-y-3" data-error={formErrors.futureDebugger || undefined}>
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">17.</span>
                    <h3 className="text-lg font-medium text-red-500">If you had to choose one debugger for future use, which would you choose?</h3>
                  </div>
                  
                  <RadioGroup 
                    value={formData.futureDebugger} 
                    onValueChange={(value) => handleInputChange('futureDebugger', value)}
                    className="flex flex-col space-y-1 ml-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger1" id="future-debugger1" />
                      <Label htmlFor="future-debugger1">Debugger 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger2" id="future-debugger2" />
                      <Label htmlFor="future-debugger2">Debugger 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debugger3" id="future-debugger3" />
                      <Label htmlFor="future-debugger3">Debugger 3</Label>
                    </div>
                  </RadioGroup>
                  
                  {formErrors.futureDebugger && (
                    <p className="text-red-500 text-sm ml-6">Please select a debugger</p>
                  )}
                </div>

                {/* Question 11 - Technical Issues */}
                <div className="space-y-3" data-error={formErrors.technicalIssues || undefined}>
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">11.</span>
                    <h3 className="text-lg font-medium text-red-500">Did you encounter technical issues during testing (e.g., device lag, delayed rendering)?</h3>
                  </div>
                  
                  <RadioGroup 
                    value={formData.technicalIssues} 
                    onValueChange={(value) => handleInputChange('technicalIssues', value)}
                    className="flex flex-col space-y-1 ml-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="tech-none" />
                      <Label htmlFor="tech-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2" id="tech-1-2" />
                      <Label htmlFor="tech-1-2">1–2 times</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3+" id="tech-3+" />
                      <Label htmlFor="tech-3+">3+ times</Label>
                    </div>
                  </RadioGroup>
                  
                  {formErrors.technicalIssues && (
                    <p className="text-red-500 text-sm ml-6">Please select an option</p>
                  )}
                </div>

                {/* Question 12 - Satisfaction */}
                <div className="space-y-3" data-error={formErrors.satisfaction || undefined}>
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">12.</span>
                    <h3 className="text-lg font-medium text-red-500">How satisfied are you with the stability of the AR debugger?</h3>
                    <p className="text-sm text-gray-500 ml-2">(1 = Very dissatisfied, 5 = Very satisfied)</p>
                  </div>
                  
                  <RadioGroup 
                    value={formData.satisfaction} 
                    onValueChange={(value) => handleInputChange('satisfaction', value)}
                    className="flex flex-row space-x-4 ml-6"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="1" id="satisfaction-1" />
                      <Label htmlFor="satisfaction-1">1</Label>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="2" id="satisfaction-2" />
                      <Label htmlFor="satisfaction-2">2</Label>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="3" id="satisfaction-3" />
                      <Label htmlFor="satisfaction-3">3</Label>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="4" id="satisfaction-4" />
                      <Label htmlFor="satisfaction-4">4</Label>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value="5" id="satisfaction-5" />
                      <Label htmlFor="satisfaction-5">5</Label>
                    </div>
                  </RadioGroup>
                  
                  {formErrors.satisfaction && (
                    <p className="text-red-500 text-sm ml-6">Please select a rating</p>
                  )}
                </div>
              </div>

              {/* Open-Ended Questions Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-red-500">Open-Ended Questions</h2>
                
                {/* Question 13 - Most Useful Feature */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">13.</span>
                    <h3 className="text-lg font-medium text-red-500">What feature of the AR debugger did you find most useful? Please explain briefly.</h3>
                  </div>
                  
                  <Textarea
                    value={formData.mostUsefulFeature}
                    onChange={(e) => handleInputChange('mostUsefulFeature', e.target.value)}
                    className="min-h-[100px] ml-6"
                    placeholder="Type your answer here..."
                  />
                </div>

                {/* Question 14 - Improvement Needed */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">14.</span>
                    <h3 className="text-lg font-medium text-red-500">What aspect of the tool needs the most improvement?</h3>
                  </div>
                  
                  <Textarea
                    value={formData.improvementNeeded}
                    onChange={(e) => handleInputChange('improvementNeeded', e.target.value)}
                    className="min-h-[100px] ml-6"
                    placeholder="Type your answer here..."
                  />
                </div>

                {/* Question 15 - Additional Comments */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-red-500 font-medium mr-2">15.</span>
                    <h3 className="text-lg font-medium text-red-500">Additional comments or suggestions:</h3>
                  </div>
                  
                  <Textarea
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                    className="min-h-[100px] ml-6"
                    placeholder="Type your additional comments here..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="w-full py-6 text-lg">
                  Submit All Results
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}