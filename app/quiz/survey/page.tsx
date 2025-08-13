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
    genderOther: "",
    education: "",
    major: "",
    disability: "",
    disabilityDetails: "",
    programmingExperience: "",
    courses: [] as string[],
    pythonProficiency: "",
    goggleExperience: "",
    arVrComfort: "",
    motionSickness: "",
    debuggingTools: "",
    debuggingExperience: ""
  })

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})

  const handleInputChange = (field: string, value: string | string[]) => {
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

  const handleCheckboxChange = (courseId: string, checked: boolean) => {
    if (checked) {
      handleInputChange('courses', [...formData.courses, courseId])
    } else {
      handleInputChange('courses', formData.courses.filter(id => id !== courseId))
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
    
    // Special validation for gender "other" option
    if (formData.gender === "other" && !formData.genderOther) {
      newErrors.genderOther = true
    }

    // Special validation for disability "yes" option
    if (formData.disability === "yes" && !formData.disabilityDetails) {
      newErrors.disabilityDetails = true
    }
    
    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Save survey data to localStorage
      localStorage.setItem('demographicSurvey', JSON.stringify(formData))
      
      // Navigate to the first question
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
              {/* Age Range - Fill in the blank */}
              <div className="space-y-3" data-error={formErrors.age || undefined}>
                <div className="flex items-center">
                  <span className="font-medium mr-2">1.</span>
                  <h3 className="text-lg font-medium">What is your age?</h3>
                  <span className="ml-2">(fill in the blank)</span>
                </div>
                
                <div className="ml-6">
                  <Input
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="border-gray-300 max-w-xs"
                    placeholder="Enter your age"
                    type="number"
                    min="18"
                  />
                </div>
                
                {formErrors.age && (
                  <p className="text-gray-600 text-sm ml-6">Please enter your age</p>
                )}
              </div>

              {/* Gender - Added "Other" option */}
              <div className="space-y-3" data-error={formErrors.gender || undefined}>
                <div className="flex items-center">
                  <span className="font-medium mr-2">2.</span>
                  <h3 className="text-lg font-medium">Gender</h3>
                </div>
                
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange('gender', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="gender-prefer-not-to-say" />
                    <Label htmlFor="gender-prefer-not-to-say">Prefer not to say</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="gender-other" />
                    <Label htmlFor="gender-other">Other</Label>
                  </div>
                </RadioGroup>
                
                {formData.gender === "other" && (
                  <div className="ml-6 mt-2">
                    <Input
                      value={formData.genderOther}
                      onChange={(e) => handleInputChange('genderOther', e.target.value)}
                      className="border-gray-300 max-w-xs"
                      placeholder="Please specify"
                    />
                    {formErrors.genderOther && (
                      <p className="text-gray-600 text-sm mt-1">Please specify your gender</p>
                    )}
                  </div>
                )}
                
                {formErrors.gender && (
                  <p className="text-gray-600 text-sm ml-6">Please select your gender</p>
                )}
              </div>

              {/* Education Level */}
              <div className="space-y-3" data-error={formErrors.education || undefined}>
                <div className="flex items-center">
                  <span className="font-medium mr-2">3.</span>
                  <h3 className="text-lg font-medium">What is your level of education?</h3>
                </div>
                
                <RadioGroup 
                  value={formData.education} 
                  onValueChange={(value) => handleInputChange('education', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year1" id="edu-year1" />
                    <Label htmlFor="edu-year1">Undergraduate - Year 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year2" id="edu-year2" />
                    <Label htmlFor="edu-year2">Undergraduate - Year 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year3" id="edu-year3" />
                    <Label htmlFor="edu-year3">Undergraduate - Year 3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="year4" id="edu-year4" />
                    <Label htmlFor="edu-year4">Undergraduate - Year 4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="graduate" id="edu-graduate" />
                    <Label htmlFor="edu-graduate">Graduate</Label>
                  </div>
                </RadioGroup>
                
                {formErrors.education && (
                  <p className="text-gray-600 text-sm ml-6">Please select your education level</p>
                )}
              </div>

              {/* Major/Field of Study */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">4.</span>
                  <h3 className="text-lg font-medium">What Major/Field of Study you are taking currently?</h3>
                </div>
                
                <div className="ml-6">
                  <Input
                    value={formData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    className="border-gray-300"
                    placeholder="Your major/field of study"
                  />
                </div>
              </div>

              {/* Disability - Added Yes/No options */}
              <div className="space-y-3" data-error={formErrors.disability || undefined}>
                <div className="flex items-center">
                  <span className="font-medium mr-2">5.</span>
                  <h3 className="text-lg font-medium">Do you have any disability or anything we need to know before you start this experiment?</h3>
                </div>
                
                <RadioGroup 
                  value={formData.disability} 
                  onValueChange={(value) => handleInputChange('disability', value)}
                  className="flex space-x-6 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="disability-yes" />
                    <Label htmlFor="disability-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="disability-no" />
                    <Label htmlFor="disability-no">No</Label>
                  </div>
                </RadioGroup>
                
                {formData.disability === "yes" && (
                  <div className="ml-6 mt-2">
                    <Textarea
                      value={formData.disabilityDetails}
                      onChange={(e) => handleInputChange('disabilityDetails', e.target.value)}
                      className="border-gray-300"
                      placeholder="Please provide details"
                    />
                    {formErrors.disabilityDetails && (
                      <p className="text-gray-600 text-sm mt-1">Please provide details about your disability</p>
                    )}
                  </div>
                )}
              </div>

              {/* Programming Experience */}
              <div className="space-y-3" data-error={formErrors.programmingExperience || undefined}>
                <div className="flex items-center">
                  <span className="font-medium mr-2">6.</span>
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
                  <p className="text-gray-600 text-sm ml-6">Please select your programming experience</p>
                )}
              </div>

              {/* Programming Courses - Changed to multi-select checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">7.</span>
                  <h3 className="text-lg font-medium">Which programming courses have you taken? (select all that apply)</h3>
                </div>
                
                <div className="ml-6 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="course-eecs1012" 
                      checked={formData.courses.includes("eecs1012")}
                      onCheckedChange={(checked) => handleCheckboxChange("eecs1012", checked === true)}
                    />
                    <Label htmlFor="course-eecs1012">EECS 1012 - Introduction to Computing: Web-Based Systems</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="course-eecs1015" 
                      checked={formData.courses.includes("eecs1015")}
                      onCheckedChange={(checked) => handleCheckboxChange("eecs1015", checked === true)}
                    />
                    <Label htmlFor="course-eecs1015">EECS 1015 - Introduction to Computer Science and Programming</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="course-eecs1022" 
                      checked={formData.courses.includes("eecs1022")}
                      onCheckedChange={(checked) => handleCheckboxChange("eecs1022", checked === true)}
                    />
                    <Label htmlFor="course-eecs1022">EECS 1022 - Programming for Mobile Computing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="course-eecs2030" 
                      checked={formData.courses.includes("eecs2030")}
                      onCheckedChange={(checked) => handleCheckboxChange("eecs2030", checked === true)}
                    />
                    <Label htmlFor="course-eecs2030">EECS 2030 - Advanced Object Oriented Programming</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="course-eecs2011" 
                      checked={formData.courses.includes("eecs2011")}
                      onCheckedChange={(checked) => handleCheckboxChange("eecs2011", checked === true)}
                    />
                    <Label htmlFor="course-eecs2011">EECS 2011 - Fundamentals of Data Structures</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="course-other" 
                      checked={formData.courses.includes("other")}
                      onCheckedChange={(checked) => handleCheckboxChange("other", checked === true)}
                    />
                    <Label htmlFor="course-other">Other programming courses</Label>
                  </div>
                </div>
              </div>

              {/* Python Proficiency - Changed to select options */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">8.</span>
                  <h3 className="text-lg font-medium">What is your self-assessed Python proficiency?</h3>
                </div>
                
                <RadioGroup 
                  value={formData.pythonProficiency} 
                  onValueChange={(value) => handleInputChange('pythonProficiency', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="python-beginner" />
                    <Label htmlFor="python-beginner">Beginner - I know basic syntax and can write simple scripts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="python-intermediate" />
                    <Label htmlFor="python-intermediate">Intermediate - I can write functions, use libraries, and build small applications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="python-advanced" />
                    <Label htmlFor="python-advanced">Advanced - I can build complex applications and understand advanced concepts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="python-expert" />
                    <Label htmlFor="python-expert">Expert - I have deep knowledge of Python internals and can optimize complex code</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="python-none" />
                    <Label htmlFor="python-none">No experience with Python</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Goggle Experience - Changed to select options */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">9.</span>
                  <h3 className="text-lg font-medium">Previous experience with AR/VR goggles</h3>
                </div>
                
                <RadioGroup 
                  value={formData.goggleExperience} 
                  onValueChange={(value) => handleInputChange('goggleExperience', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="goggle-none" />
                    <Label htmlFor="goggle-none">No experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="limited" id="goggle-limited" />
                    <Label htmlFor="goggle-limited">Limited experience (tried once or twice)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="goggle-moderate" />
                    <Label htmlFor="goggle-moderate">Moderate experience (occasional use)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="extensive" id="goggle-extensive" />
                    <Label htmlFor="goggle-extensive">Extensive experience (regular use)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* AR/VR Comfort */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">10.</span>
                  <h3 className="text-lg font-medium">Rate your comfort level using AR/VR tools.</h3>
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

              {/* Motion Sickness - Changed to select options */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">11.</span>
                  <h3 className="text-lg font-medium">Do you experience motion sickness or discomfort with VR?</h3>
                </div>
                
                <RadioGroup 
                  value={formData.motionSickness} 
                  onValueChange={(value) => handleInputChange('motionSickness', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="motion-none" />
                    <Label htmlFor="motion-none">No, I don't experience any motion sickness</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="motion-mild" />
                    <Label htmlFor="motion-mild">Mild discomfort occasionally</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="motion-moderate" />
                    <Label htmlFor="motion-moderate">Moderate discomfort frequently</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="motion-severe" />
                    <Label htmlFor="motion-severe">Severe discomfort most of the time</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Debugging Tools */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">13.</span>
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

              {/* Debugging Experience - Changed to select options */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-medium mr-2">14.</span>
                  <h3 className="text-lg font-medium">Are you usually debugging your code?</h3>
                </div>
                
                <RadioGroup 
                  value={formData.debuggingExperience} 
                  onValueChange={(value) => handleInputChange('debuggingExperience', value)}
                  className="flex flex-col space-y-1 ml-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rarely" id="debug-exp-rarely" />
                    <Label htmlFor="debug-exp-rarely">I rarely debug my code</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="debug-exp-sometimes" />
                    <Label htmlFor="debug-exp-sometimes">I sometimes debug my code, but find it difficult</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="often" id="debug-exp-often" />
                    <Label htmlFor="debug-exp-often">I often debug my code and am comfortable with basic debugging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-often" id="debug-exp-very-often" />
                    <Label htmlFor="debug-exp-very-often">I very often debug my code and am proficient with debugging tools</Label>
                  </div>
                </RadioGroup>
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