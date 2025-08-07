"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { questions, images, variableSets } from "@/lib/quiz-data"
import { useRouter } from "next/navigation"

export default function QuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const questionId = parseInt(params.id) - 1
  
  // Redirect if invalid question ID
  if (questionId < 0 || questionId >= questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <p className="text-center mb-4">Invalid question ID</p>
            <Link href="/quiz">
              <Button className="w-full">Return to Quiz Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Special layout for questions with specialLayout flag
  if (questions[questionId].specialLayout) {
    router.push(`/quiz/${questionId + 1}`)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading special layout...</p>
      </div>
    )
  }

  const [currentImage, setCurrentImage] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

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

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images[questionId].length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images[questionId].length) % images[questionId].length)
  }

  const nextQuestion = () => {
    if (questionId < questions.length - 1) {
      // If we're at question 2 or 4, redirect to experience survey
      if (questionId === 1 || questionId === 3) {
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

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      string: "text-green-600",
      number: "text-blue-600",
      boolean: "text-purple-600",
      array: "text-orange-600",
      object: "text-red-600",
      int: "text-blue-600",
      list: "text-orange-600",
      bool: "text-purple-600",
      float: "text-cyan-600",
      dict: "text-red-600",
      color: "text-pink-600",
      size: "text-indigo-600",
      spacing: "text-teal-600",
    }
    return colors[type] || "text-gray-600"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 h-full">
          {/* Left Side - Questions and Instructions */}
          <div className="space-y-6">
            {/* Instructions Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[questionId].instruction}</p>
                <p><strong>Input:</strong></p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[questionId].input}</p>
                <p><strong>Output:</strong></p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[questionId].output}</p>
                <p><strong>Example:</strong></p>
                  <Image
                    src={questions[questionId].instructionImage || "/placeholder.svg"}
                    alt={`Instruction image for question ${questionId + 1}`}
                    width={300}
                    height={200}
                    className="w-full max-w-[150px] mx-auto my-2 object-contain rounded-lg border bg-white"
                  />
                </div>
                <p><strong>Actual:</strong></p>
                <Image
                    src={questions[questionId].actualOutput || "/placeholder.svg"}
                    alt={`Instruction image for question ${questionId + 1}`}
                    width={300}
                    height={200}
                    className="w-full max-w-[150px] mx-auto my-2 object-contain rounded-lg border bg-white"
                  />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Question {questionId + 1} of {questions.length}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">{questions[questionId].question}</h2>

                <div className="space-y-3">
                  {questions[questionId].options.map((option, index) => {
                    const isSelected = selectedAnswers.includes(option) || false
                    return (
                      <Button
                        key={index}
                        variant={isSelected ? "default" : "outline"}
                        className={`leading-relaxed h-auto whitespace-pre-line p-4 ${isSelected ? "text-white" : "text-gray-700"}`}
                        onClick={() => handleAnswerSelect(option)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                              isSelected ? "bg-primary border-primary" : "border-gray-300"
                            }`}
                          >
                          </div>
                          <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                        </div>
                      </Button>
                    )
                  })}
                </div>

                {/* Question Navigation */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={questionId === 0}
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

            {/* Progress Indicator */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{Math.round(((questionId + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((questionId + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Variable Dashboard and Images */}
          <div className="space-y-6">
            {/* Variable Dashboard */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Variable Dashboard</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{variableSets[currentImage].title}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {variableSets[currentImage].variables.map((variable, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border"
                    >
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-gray-900">{variable.name}</span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${getTypeColor(variable.type)} bg-gray-100`}
                          >
                            {variable.type}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{variable.scope}</span>
                      </div>
                      <div className="font-mono text-sm text-gray-700 bg-white px-3 py-1 rounded border shadow-sm max-w-32 truncate">
                        {variable.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t text-xs text-gray-500">
                  <span>{variableSets[currentImage].variables.length} variables</span>
                  <span>
                    Set {currentImage + 1} of {variableSets.length}
                  </span>
                </div>
              </CardContent>
            </Card>
            {/* Terminal Output Widget */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Terminal Output</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Running</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm max-h-64 overflow-y-auto">
                  {variableSets[currentImage].terminalOutput.map((line, index) => (
                    <div
                      key={index}
                      className={`mb-1 ${
                        line.type === "command"
                          ? "text-green-400"
                          : line.type === "error"
                            ? "text-red-400"
                            : line.type === "success"
                              ? "text-green-300"
                              : "text-gray-300"
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                  <div className="text-green-400 mt-2">
                    <span className="animate-pulse">█</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Image Display Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Reference Image ({currentImage + 1} of {images[questionId].length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Image
                    src={images[questionId][currentImage] || "/placeholder.svg"}
                    alt={`Reference image ${currentImage + 1}`}
                    width={600}
                    height={500}
                    className="w-full h-508 object-contain rounded-lg border bg-white"
                  />
                </div>

                {/* Image Navigation */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevImage}
                    disabled={images[questionId].length <= 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex space-x-2">
                    {images[questionId].map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentImage ? "bg-primary" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextImage}
                    disabled={images[questionId].length <= 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}