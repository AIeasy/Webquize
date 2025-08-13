"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function SanityCheckPage() {
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save the answer to localStorage
    localStorage.setItem('sanityCheck', selectedAnswer)
    
    // Navigate to the survey page
    router.push('/quiz/survey')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sanity Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Sanity Question 1:</h2>
                
                <p className="text-gray-700 mb-4">
                  Someone writes a Python program that defines a function that calculates the <strong>area of a rectangle</strong> that 
                  supposed to take in the length and width as parameters and return the result. The code is shown below:
                </p>
                
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm mb-4">
                  <code>{`def calculate_area(length)

    area == leng + width)

    print("Area:", area)`}</code>
                </pre>
                
                <p className="text-gray-700 mb-6">
                  However, the code does not work properly. What is the bug that prevents the function from returning the right result?
                </p>
                
                <RadioGroup 
                  value={selectedAnswer} 
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                >
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="a" id="answer-a" className="mt-1" />
                    <Label htmlFor="answer-a" className="text-gray-700">a) The variable width is used but not passed as a parameter or defined.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="b" id="answer-b" className="mt-1" />
                    <Label htmlFor="answer-b" className="text-gray-700">b) The function prints the area but does not return it, which violates the requirement.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="c" id="answer-c" className="mt-1" />
                    <Label htmlFor="answer-c" className="text-gray-700">c) The function will cause an error because print cannot be used inside a function.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="d" id="answer-d" className="mt-1" />
                    <Label htmlFor="answer-d" className="text-gray-700">d) The assignment uses == instead of = for the variable area.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="e" id="answer-e" className="mt-1" />
                    <Label htmlFor="answer-e" className="text-gray-700">e) The function name calculate_area is invalid because it contains lowercase letters.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="f" id="answer-f" className="mt-1" />
                    <Label htmlFor="answer-f" className="text-gray-700">f) The incorrectly adds length and width instead of multiplying them to find the area.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="g" id="answer-g" className="mt-1" />
                    <Label htmlFor="answer-g" className="text-gray-700">g) The function header is missing a colon (:).</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="h" id="answer-h" className="mt-1" />
                    <Label htmlFor="answer-h" className="text-gray-700">h) The function can run as is.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="i" id="answer-i" className="mt-1" />
                    <Label htmlFor="answer-i" className="text-gray-700">i) The code contains an extra closing parenthesis after width.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="j" id="answer-j" className="mt-1" />
                    <Label htmlFor="answer-j" className="text-gray-700">j) The variable leng is undefined and likely a typo for length.</Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="k" id="answer-k" className="mt-1" />
                    <Label htmlFor="answer-k" className="text-gray-700">k) The function will fail because the indentation is off.</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg"
                  disabled={!selectedAnswer}
                >
                  Continue to Survey
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}