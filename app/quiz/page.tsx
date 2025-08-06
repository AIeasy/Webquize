"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { questions } from "@/lib/quiz-data"

export default function QuizHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Python Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-8">
                Test your Python knowledge with this interactive quiz. The test contains {questions.length} questions.
              </p>
              
              <p className="text-gray-600 mb-8">
                You will need to complete all questions in sequence. Before starting the quiz, you will be asked to complete a brief background survey.
              </p>
              
              <Link href="/quiz/survey">
                <Button className="w-full text-lg py-6" size="lg">
                  Start Test
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}