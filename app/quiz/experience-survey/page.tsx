"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter, useSearchParams } from "next/navigation"

export default function ExperienceSurveyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextQuestion = searchParams.get('next') || '3'
  const debuggerNumber = parseInt(nextQuestion) <= 2 ? 1 : parseInt(nextQuestion) <= 4 ? 2 : 3
  
  const [formData, setFormData] = useState({
    interface: "",
    bugLocation: "",
    control: "",
    futureUse: "",
    faster: "",
    additionalComments: ""
  })

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
    
    // Clear error for this field if it exists
    if (formErrors[field]) {
      const newErrors = { ...formErrors }
      delete newErrors[field]
      setFormErrors(newErrors)
    }
  }

  const validateForm = () => {
    const requiredFields = ['interface', 'bugLocation', 'control', 'futureUse', 'faster']
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
      // Save the survey data to localStorage
      const experienceSurveys = JSON.parse(localStorage.getItem('experienceSurveys') || '{}')
      
      // Determine which debugger this is based on the next question
      let debuggerId = '1'
      if (nextQuestion === '3') {
        debuggerId = '1'
      } else if (nextQuestion === '5') {
        debuggerId = '2'
      } else {
        debuggerId = '3'
      }
      
      // Save this survey
      experienceSurveys[debuggerId] = formData
      localStorage.setItem('experienceSurveys', JSON.stringify(experienceSurveys))
      
      // Navigate based on which debugger we just evaluated
      if (debuggerId === '3') {
        router.push("/quiz/final-survey")
      } else {
        router.push(`/quiz/${nextQuestion}`)
      }
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector('[data-error="true"]')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-500">User Experience</CardTitle>
            <p className="text-center text-red-500">(Scale from 1 to 5, 1 = poor, 5 = good)</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="text-xl font-bold mb-6">
                Please rate your experience with Debugger #{debuggerNumber}:
              </div>
              
              {/* Question 1 */}
              <div className="space-y-3" data-error={formErrors.interface || undefined}>
                <div className="flex items-center">
                  <span className="text-red-500 font-medium mr-2">1.</span>
                  <h3 className="text-lg font-medium text-red-500">The interface of this debugger is easy to understand and use.</h3>
                </div>
                
                <RadioGroup 
                  value={formData.interface} 
                  onValueChange={(value) => handleInputChange('interface', value)}
                  className="flex justify-between ml-6"
                >
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="1" id="interface-1" />
                    <Label htmlFor="interface-1" className="mt-1">1</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="2" id="interface-2" />
                    <Label htmlFor="interface-2" className="mt-1">2</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="3" id="interface-3" />
                    <Label htmlFor="interface-3" className="mt-1">3</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="4" id="interface-4" />
                    <Label htmlFor="interface-4" className="mt-1">4</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="5" id="interface-5" />
                    <Label htmlFor="interface-5" className="mt-1">5</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.interface && (
                  <p className="text-red-500 text-sm ml-6">Please select a rating</p>
                )}
              </div>

              {/* Question 2 */}
              <div className="space-y-3" data-error={formErrors.bugLocation || undefined}>
                <div className="flex items-center">
                  <span className="text-red-500 font-medium mr-2">2.</span>
                  <h3 className="text-lg font-medium text-red-500">I was able to locate the bug(s) efficiently using this debugger.</h3>
                </div>
                
                <RadioGroup 
                  value={formData.bugLocation} 
                  onValueChange={(value) => handleInputChange('bugLocation', value)}
                  className="flex justify-between ml-6"
                >
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="1" id="bugLocation-1" />
                    <Label htmlFor="bugLocation-1" className="mt-1">1</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="2" id="bugLocation-2" />
                    <Label htmlFor="bugLocation-2" className="mt-1">2</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="3" id="bugLocation-3" />
                    <Label htmlFor="bugLocation-3" className="mt-1">3</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="4" id="bugLocation-4" />
                    <Label htmlFor="bugLocation-4" className="mt-1">4</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="5" id="bugLocation-5" />
                    <Label htmlFor="bugLocation-5" className="mt-1">5</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.bugLocation && (
                  <p className="text-red-500 text-sm ml-6">Please select a rating</p>
                )}
              </div>

              {/* Question 3 */}
              <div className="space-y-3" data-error={formErrors.control || undefined}>
                <div className="flex items-center">
                  <span className="text-red-500 font-medium mr-2">3.</span>
                  <h3 className="text-lg font-medium text-red-500">I felt in control while using this debugger.</h3>
                </div>
                
                <RadioGroup 
                  value={formData.control} 
                  onValueChange={(value) => handleInputChange('control', value)}
                  className="flex justify-between ml-6"
                >
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="1" id="control-1" />
                    <Label htmlFor="control-1" className="mt-1">1</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="2" id="control-2" />
                    <Label htmlFor="control-2" className="mt-1">2</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="3" id="control-3" />
                    <Label htmlFor="control-3" className="mt-1">3</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="4" id="control-4" />
                    <Label htmlFor="control-4" className="mt-1">4</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="5" id="control-5" />
                    <Label htmlFor="control-5" className="mt-1">5</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.control && (
                  <p className="text-red-500 text-sm ml-6">Please select a rating</p>
                )}
              </div>

              {/* Question 4 */}
              <div className="space-y-3" data-error={formErrors.futureUse || undefined}>
                <div className="flex items-center">
                  <span className="text-red-500 font-medium mr-2">4.</span>
                  <h3 className="text-lg font-medium text-red-500">I would consider using this debugger in future projects.</h3>
                </div>
                
                <RadioGroup 
                  value={formData.futureUse} 
                  onValueChange={(value) => handleInputChange('futureUse', value)}
                  className="flex justify-between ml-6"
                >
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="1" id="futureUse-1" />
                    <Label htmlFor="futureUse-1" className="mt-1">1</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="2" id="futureUse-2" />
                    <Label htmlFor="futureUse-2" className="mt-1">2</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="3" id="futureUse-3" />
                    <Label htmlFor="futureUse-3" className="mt-1">3</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="4" id="futureUse-4" />
                    <Label htmlFor="futureUse-4" className="mt-1">4</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="5" id="futureUse-5" />
                    <Label htmlFor="futureUse-5" className="mt-1">5</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.futureUse && (
                  <p className="text-red-500 text-sm ml-6">Please select a rating</p>
                )}
              </div>

              {/* Question 5 */}
              <div className="space-y-3" data-error={formErrors.faster || undefined}>
                <div className="flex items-center">
                  <span className="text-red-500 font-medium mr-2">5.</span>
                  <h3 className="text-lg font-medium text-red-500">This debugger helped me complete the debugging task faster.</h3>
                </div>
                
                <RadioGroup 
                  value={formData.faster} 
                  onValueChange={(value) => handleInputChange('faster', value)}
                  className="flex justify-between ml-6"
                >
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="1" id="faster-1" />
                    <Label htmlFor="faster-1" className="mt-1">1</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="2" id="faster-2" />
                    <Label htmlFor="faster-2" className="mt-1">2</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="3" id="faster-3" />
                    <Label htmlFor="faster-3" className="mt-1">3</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="4" id="faster-4" />
                    <Label htmlFor="faster-4" className="mt-1">4</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="5" id="faster-5" />
                    <Label htmlFor="faster-5" className="mt-1">5</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.faster && (
                  <p className="text-red-500 text-sm ml-6">Please select a rating</p>
                )}
              </div>

              {/* Additional Comments */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">Additional comments about this debugger (optional):</h3>
                </div>
                
                <div>
                  <Textarea
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                    className="border-gray-300"
                    placeholder="Share your thoughts about this debugger..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="w-full py-6 text-lg">
                  Submit and Continue to Next Question
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}