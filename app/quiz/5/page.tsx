"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import Link from "next/link"
import { questions } from "@/lib/quiz-data"
import { useRouter } from "next/navigation"

export default function Question5Page() {
  const router = useRouter()
  const questionId = 4 // Index for question 5
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  // Placeholder states for visualization feature (in development)
  const [isVisualizing, setIsVisualizing] = useState(false)

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => {
      const isSelected = prev.includes(answer)
      
      let newAnswers;
      if (isSelected) {
        // Remove the answer if already selected
        newAnswers = prev.filter((a) => a !== answer)
      } else {
        // Add the answer if not selected
        newAnswers = [...prev, answer]
      }
      
      // Save to localStorage
      const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}')
      quizAnswers[questionId + 1] = newAnswers.length > 0 ? newAnswers[0] : ''
      localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers))
      
      return newAnswers
    })
  }

  const nextQuestion = () => {
    if (questionId < questions.length - 1) {
      // If we're at question 4, redirect to experience survey
      if (questionId === 3) {
        router.push(`/quiz/experience-survey?next=${questionId + 2}`)
      } else {
        router.push(`/quiz/${questionId + 2}`)
      }
    }
  }

  const prevQuestion = () => {
    if (questionId > 0) {
      router.push(`/quiz/${questionId}`)
    }
  }

  // Placeholder function for visualization feature (in development)
  const startVisualization = () => {
    // Feature in development
    alert("Visualization feature is currently under development")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Instructions and Options */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Left Side - Instructions */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Question {questionId + 1}: {questions[questionId].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[questionId].instruction}</p>
                
                <div className="mt-4">
                  <p><strong>Input:</strong></p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[questionId].input}</p>
                </div>
                
                <div className="mt-4">
                  <p><strong>Output:</strong></p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[questionId].output}</p>
                </div>
                
                <div className="mt-6">
                  <p><strong>Code Example:</strong></p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm mt-2">
                    <code>{questions[questionId].codeExample}</code>
                  </pre>
                </div>
                
                <div className="mt-4">
                  <p><strong>Example:</strong></p>
                  <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm mt-2">
                    <code>{questions[questionId].case1}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Options */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Select the Correct Answer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {questions[questionId].options.map((option, index) => {
                  const isSelected = selectedAnswers.includes(option) || false
                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className={`leading-relaxed h-auto whitespace-pre-line p-4 w-full justify-start ${isSelected ? "text-white" : "text-gray-700"}`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 mt-1 border-2 rounded flex items-center justify-center ${
                            isSelected ? "bg-primary border-primary" : "border-gray-300"
                          }`}
                        >
                        </div>
                        <div>
                          <span className="font-medium">{String.fromCharCode(65 + index)}.</span>{" "}
                          <span>{option}</span>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t mt-6">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Question
                </Button>

                <Link href="/quiz">
                  <Button variant="outline" className="bg-transparent">
                    Back to Quiz Home
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={nextQuestion}
                  disabled={questionId === questions.length - 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Submit Button */}
              {questionId === questions.length - 1 && (
                <Button
                  className="w-full mt-4"
                  size="lg"
                  disabled={selectedAnswers.length === 0}
                >
                  Submit Quiz
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Visualization Section */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                Code Visualization
              </CardTitle>
              {!isVisualizing && (
                <Button 
                  onClick={startVisualization}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Visualize Code Execution
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">The visualization feature is currently under development.</p>
              <p className="text-gray-400 text-sm">When completed, it will help you understand how the code processes the grid and where the bug might be.</p>
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-2">Coming soon:</p>
                <ul className="text-sm text-gray-500 list-disc list-inside">
                  <li>Step-by-step code execution</li>
                  <li>Visual representation of the grid at each step</li>
                  <li>Detailed explanations of each operation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}