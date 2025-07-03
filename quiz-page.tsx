"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const questions = [
  {
    id: 1,
    question: "Which part of the code is wrong",
    options: ["The ascending loop range(1, i) should include i. \nSo it should be range(1, i + 1) to properly print the peak number.", "The second for loop range(i-1, 0, 1) counts upward\n it never executes because the start is greater than the end with a positive step. ", "The outer loop should start from i = 1 rather than i = 0 to avoid printing an empty first row and fix the alignment.", "The print statement for spacing is incorrect; it should be \" \" * i instead of \" \" * (n - i) to align left. "],
    instruction: "Write a Python function that prints a centered pyramid of numbers, where each line forms a palindromic number pattern.\n ",
    instructionImage: "/Q1_Example.png?height=200&width=300",
    input: "A single positive integer n (1 ≤ n ≤ 10) representing the number of rows in the pyramid. ",
    output: "Print n lines.\nThe i-th line should: \nStart with enough spaces to center the line. \nThen print numbers from 1 to i.\nThen print numbers from i-1 back down to 1.  ",
    actualOutput: "/Q1_Actual.png?height=200&width=300",
  },

]

const images = [
  "/Q1_CODE_1.png?height=400&width=600",
  "/Q1_CODE_2.png?height=400&width=600",
  "/Q1_CODE_3.png?height=400&width=600",
]

const variableSets = [
  {
    title: "JavaScript Variables - Set 1",
    variables: [
      { name: "i", type: "int", value: "0", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
  },
  {
    title: "JavaScript Variables - Set 2",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
  },
  {
    title: "JavaScript Variables - Set 3",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
  },
]

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }))
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
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
          {/* Left Side - Instructions and Images */}
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

            {/* Image Display Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Reference Image ({currentImage + 1} of {images.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Image
                    src={images[currentImage] || "/placeholder.svg"}
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
                    disabled={images.length <= 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex space-x-2">
                    {images.map((_, index) => (
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
                    disabled={images.length <= 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Questions */}
          <div className="space-y-6">
            {/* Instructions Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">

                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[currentQuestion].instruction}</p>
                <p><strong>Input:</strong>.</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[currentQuestion].input}</p>
                <p><strong>Output:</strong>.</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[currentQuestion].output}</p>
                <p><strong>Example:</strong>.</p>
                  <Image
                    src={questions[currentQuestion].instructionImage || "/placeholder.svg"}
                    alt={`Instruction image for question ${currentQuestion + 1}`}
                    width={60}
                    height={60}
                    className="w-full max-w-[150px] mx-auto my-2 object-contain rounded-lg border bg-white"
                  />
                </div>
                <p><strong>Actual Output:</strong>.</p>
                <Image
                    src={questions[currentQuestion].actualOutput || "/placeholder.svg"}
                    alt={`Instruction image for question ${currentQuestion + 1}`}
                    width={120}
                    height={120}
                    className="w-full max-w-[350px] mx-auto my-2 object-contain rounded-lg border bg-white"
                  />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">{questions[currentQuestion].question}</h2>

                {/* Answer Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswers[currentQuestion] === option ? "default" : "outline"}
                      className="text-gray-700 leading-relaxed whitespace-pre-line"
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Question Navigation */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Question
                  </Button>

                  <div className="text-sm text-gray-500">
                    {Object.keys(selectedAnswers).length} of {questions.length} answered
                  </div>

                  <Button
                    variant="outline"
                    onClick={nextQuestion}
                    disabled={currentQuestion === questions.length - 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Submit Button */}
                {currentQuestion === questions.length - 1 && (
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    disabled={Object.keys(selectedAnswers).length < questions.length}
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
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
