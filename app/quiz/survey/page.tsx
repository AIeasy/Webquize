"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

export default function SurveyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    major: "",
    disability: "",
    programmingExperience: "",
    courses: "",
    pythonProficiency: "",
    goggleExperience: "",
    arVrComfort: "",
    motionSickness: "",
    debuggingTools: "",
    debuggingExperience: ""
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
    const requiredFields = ['age', 'gender', 'education', 'programmingExperience']
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
      // In a real application, you would save the survey data
      // For now, just navigate to the first question
      router.push("/quiz/1")
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
            <CardTitle className="text-2xl font-bold text-center">Demographic Background Information</CardTitle>
            <p className="text-center text-gray-500">(before testing)</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Age Range */}
              <div className="space-y-3" data-error={formErrors.age || undefined}>
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">1.</span>
                  <h3 className="text-lg font-medium">What is your age range?</h3>
                  
                </div>
                
                <RadioGroup 
                  value={formData.age} 
                  onValueChange={(value) => handleInputChange('age', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="18-20" id="age-18-20" />
                    <Label htmlFor="age-18-20">18-20 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="21-23" id="age-21-23" />
                    <Label htmlFor="age-21-23">21-23 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24-26" id="age-24-26" />
                    <Label htmlFor="age-24-26">24-26 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="27+" id="age-27+" />
                    <Label htmlFor="age-27+">27+ years</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.age && (
                  <p className="text-blue-500 text-sm ml-6">Please select your age range</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-3" data-error={formErrors.gender || undefined}>
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">2.</span>
                  <h3 className="text-lg font-medium text-blue-600">Gender</h3>
                  <span className="text-blue-600 ml-2">(make sure people can specify their gender)</span>
                </div>
                
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange('gender', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <Label htmlFor="gender-male" className="text-blue-500">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <Label htmlFor="gender-female" className="text-blue-500">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="gender-prefer-not-to-say" />
                    <Label htmlFor="gender-prefer-not-to-say" className="text-blue-500">Prefer not to say</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.gender && (
                  <p className="text-blue-500 text-sm ml-6">Please select your gender</p>
                )}
              </div>

              {/* Education Level */}
              <div className="space-y-3" data-error={formErrors.education || undefined}>
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">3.</span>
                  <h3 className="text-lg font-medium text-blue-500">What is your level of education (e.g., Undergraduate - Year 1/2/3/4, Graduate, etc.)</h3>
                </div>
                
                <RadioGroup 
                  value={formData.education} 
                  onValueChange={(value) => handleInputChange('education', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year1" id="edu-year1" />
                    <Label htmlFor="edu-year1" className="text-blue-500">Year 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year2" id="edu-year2" />
                    <Label htmlFor="edu-year2" className="text-blue-500">Year 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year3" id="edu-year3" />
                    <Label htmlFor="edu-year3" className="text-blue-500">Year 3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year4" id="edu-year4" />
                    <Label htmlFor="edu-year4" className="text-blue-500">Year 4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="graduate" id="edu-graduate" />
                    <Label htmlFor="edu-graduate" className="text-blue-500">Graduate</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.education && (
                  <p className="text-blue-500 text-sm ml-6">Please select your education level</p>
                )}
              </div>

              {/* Major/Field of Study */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">4.</span>
                  <h3 className="text-lg font-medium text-blue-500">What Major/Field of Study you are taking currently?</h3>
                </div>
                
                <div className="ml-6">
                  <Input
                    value={formData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    className="border-blue-500"
                    placeholder="Your major/field of study"
                  />
                </div>
              </div>

              {/* Disability */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">5.</span>
                  <h3 className="text-lg font-medium text-blue-500">Do you have any disability or anything we need to know before you start this experiment? (if "YES" please fill in the blank below, if "NO" leave blank)</h3>
                </div>
                
                <div className="ml-6">
                  <Textarea
                    value={formData.disability}
                    onChange={(e) => handleInputChange('disability', e.target.value)}
                    className="border-blue-500"
                    placeholder="Optional - leave blank if not applicable"
                  />
                </div>
              </div>

              {/* Programming Experience */}
              <div className="space-y-3" data-error={formErrors.programmingExperience || undefined}>
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">6.</span>
                  <h3 className="text-lg font-medium">How long have you been learning programming?</h3>
                </div>
                
                <RadioGroup 
                  value={formData.programmingExperience} 
                  onValueChange={(value) => handleInputChange('programmingExperience', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="<6months" id="prog-<6months" />
                    <Label htmlFor="prog-<6months">&lt;6 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6months-1year" id="prog-6months-1year" />
                    <Label htmlFor="prog-6months-1year">6 months–1 year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-2years" id="prog-1-2years" />
                    <Label htmlFor="prog-1-2years">1–2 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-4years" id="prog-2-4years" />
                    <Label htmlFor="prog-2-4years">2–4 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4+years" id="prog-4+years" />
                    <Label htmlFor="prog-4+years">4+ years</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.programmingExperience && (
                  <p className="text-blue-500 text-sm ml-6">Please select your programming experience</p>
                )}
              </div>

              {/* Programming Courses */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">7.</span>
                  <h3 className="text-lg font-medium text-blue-600">Please list the programming courses have taken:</h3>
                </div>
                
                <div className="ml-6">
                  <Textarea
                    value={formData.courses}
                    onChange={(e) => handleInputChange('courses', e.target.value)}
                    className="border-blue-500"
                    placeholder="List your programming courses"
                  />
                </div>
              </div>

              {/* Python Proficiency */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">8.</span>
                  <h3 className="text-lg font-medium text-blue-600">What is your self-assessed Python proficiency?</h3>
                </div>
                
                <div className="ml-6">
                  <Input
                    value={formData.pythonProficiency}
                    onChange={(e) => handleInputChange('pythonProficiency', e.target.value)}
                    className="border-blue-500"
                    placeholder="Your Python proficiency"
                  />
                </div>
              </div>

              {/* Goggle Experience */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">9.</span>
                  <h3 className="text-lg font-medium text-blue-600">Previous experience with the goggle</h3>
                </div>
                
                <div className="ml-6">
                  <Input
                    value={formData.goggleExperience}
                    onChange={(e) => handleInputChange('goggleExperience', e.target.value)}
                    className="border-blue-500"
                    placeholder="Your experience with the goggle"
                  />
                </div>
              </div>

              {/* AR/VR Comfort */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">10.</span>
                  <h3 className="text-lg font-medium text-blue-600">Rate your comfort level using AR/VR tools.</h3>
                </div>
                
                <p className="ml-6 text-sm text-gray-600">(Likert scale: Not comfortable at all → Very comfortable)</p>
                
                <RadioGroup 
                  value={formData.arVrComfort} 
                  onValueChange={(value) => handleInputChange('arVrComfort', value)}
                  className="flex justify-between ml-6"
                >
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="1" id="comfort-1" />
                    <Label htmlFor="comfort-1" className="mt-1">1</Label>
                    <span className="text-xs text-gray-500">Not comfortable</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="2" id="comfort-2" />
                    <Label htmlFor="comfort-2" className="mt-1">2</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="3" id="comfort-3" />
                    <Label htmlFor="comfort-3" className="mt-1">3</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="4" id="comfort-4" />
                    <Label htmlFor="comfort-4" className="mt-1">4</Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <RadioGroupItem value="5" id="comfort-5" />
                    <Label htmlFor="comfort-5" className="mt-1">5</Label>
                    <span className="text-xs text-gray-500">Very comfortable</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Motion Sickness */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">11.</span>
                  <h3 className="text-lg font-medium text-blue-600">Do you experience motion sickness or discomfort with VR?</h3>
                </div>
                
                <div className="ml-6">
                  <Input
                    value={formData.motionSickness}
                    onChange={(e) => handleInputChange('motionSickness', e.target.value)}
                    className="border-blue-500"
                    placeholder="Your experience with motion sickness in VR"
                  />
                </div>
              </div>

              {/* Debugging Tools */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-blue-600 font-medium mr-2">13.</span>
                  <h3 className="text-lg font-medium">Have you used other debugging tools before (e.g., Python Tutor, traditional IDE debuggers)?</h3>
                </div>
                
                <RadioGroup 
                  value={formData.debuggingTools} 
                  onValueChange={(value) => handleInputChange('debuggingTools', value)}
                  className="flex space-x-6 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="debug-yes" />
                    <Label htmlFor="debug-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="debug-no" />
                    <Label htmlFor="debug-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Debugging Experience */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 font-medium mr-2">14.</span>
                  <div>
                    <h3 className="text-lg font-medium">
                      
                      <span className="text-blue-600">Are you usually debugging your code?</span>
                      <span className="text-blue-500"> if yes, what is your </span>
                      debugging experiences
                    </h3>
                    
                  </div>
                </div>
                
                <div className="ml-6">
                  <Textarea
                    value={formData.debuggingExperience}
                    onChange={(e) => handleInputChange('debuggingExperience', e.target.value)}
                    className="border-blue-500"
                    placeholder="Your debugging experience"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="w-full py-6 text-lg">
                  Submit and Start Quiz
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}