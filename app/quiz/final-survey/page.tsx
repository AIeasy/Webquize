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
    const requiredFields = ['easiestDebugger', 'mostEffectiveDebugger', 'fastestDebugger', 'futureDebugger']
    const newErrors: Record<string, boolean> = {}
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true
      }
    })
    
    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // In a real app, save data to server
      // For now, just save to localStorage for demo
      localStorage.setItem('finalSurvey', JSON.stringify(formData))
      
      // Generate markdown content
      const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}')
      const experienceSurveys = JSON.parse(localStorage.getItem('experienceSurveys') || '{}')
      
      const markdownContent = generateMarkdown(quizAnswers, experienceSurveys, formData)
      
      // Create a downloadable file
      const blob = new Blob([markdownContent], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'quiz_results.md'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      router.push('/quiz/thank-you')
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

                {/* Question 16 & 17 would go here */}
                {/* ... */}
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