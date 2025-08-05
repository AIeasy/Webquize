"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Question {
  id: number;
  question: string;
  options: string[];
  instruction: string;
  instructionImage: string;
  input: string;
  output: string;
  actualOutput?: string;
  example?: string;
  actual?: string;
  w?: number;
  h?: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which part of the code is wrong",
    options: ["The ascending loop range(1, i) should include i. \nSo it should be range(1, i + 1) to properly print the peak number.", "The second for loop range(i-1, 0, 1) counts upward\n it never executes because the start is greater than the end with a positive step. ", "The outer loop should start from i = 1 rather than i = 0 to avoid printing an empty first row and fix the alignment.", "The print statement for spacing is incorrect; it should be \" \" * i instead of \" \" * (n - i) to align left. "],
    instruction: "Write a Python function that prints a centered pyramid of numbers, where each line forms a palindromic number pattern.\n ",
    instructionImage: "/Q1_Example.png?height=200&width=300",
    input: "A single positive integer n (1 ≤ n ≤ 10) representing the number of rows in the pyramid. ",
    output: "Print n lines.\nThe i-th line should: \nStart with enough spaces to center the line. \nThen print numbers from 1 to i.\nThen print numbers from i-1 back down to 1.  ",
    actualOutput: "/Q1_Actual.png?height=200&width=300",
    w:300,
    h:300
  },
  {
    id: 2,
    question: "Which part of the code is wrong",
    options: ["The condition if nums[i] % 4 == 0 causes an unintended break in control flow, and the loop resets i incorrectly.", "The inner continue bypasses the update of i for non-multiples of 4, causing the same number to be evaluated repeatedly. ", "The total += nums[i] line should occur before the continue, because continue skips all subsequent logic inside the loop. ", "The check for nums[i] % 4 == 0 should be outside the if nums[i] % 2 == 0 block to properly filter all multiples of 4.  "],
    instruction: "The function should calculate the sum of all even numbers in a list, but skip any number that is a multiple of 4.\n The function will:\n 1.Takes a list of numbers. \n2.Calculates the sum of all even numbers, except those that are also multiples 4 ",
    instructionImage: "/Q2_Example.png?height=300&width=300",
    input: "List of Int.",
    output: "Int = the sum of all even numbers in a list, but skip any number that is a multiple of 4.  ",
    actualOutput: "/Q2_Actual.png?height=200&width=300",
  },
  {
    id: 3,
    question: "You are given a list of robot movement commands, where each command is a string with format \"MOVE X\" or \"TURN LEFT\" / \"TURN RIGHT\". Which option correctly fixes the validation function?",
    options: ["For MOVE commands, add a check that the number is ≥ 1.", "Change the TURN condition to parts[1] in [\"LEFT\", \"RIGHT\"] and modify the MOVE range check to include 0.", "Replace parts[1].isdigit() with isinstance(parts[1], int) in MOVE validation and add length checks for TURN commands.", "Move the TURN condition outside the loop and use regex parsing for all commands."],
    instruction: "You are given a list of robot command strings. You need to validate each command and return a list of booleans where:\n• True means the command is valid.\n• False means the command is invalid.\n\nTest Input: [\"MOVE 5\",\"TURN LEFT\",\"MOVE 0\",\"JUMP 3\", \"TURN RIGHT\", \"MOVE 15\"]",
    instructionImage: "",
    input: "A list of strings. Each string is a command and will be in one of the following formats:\n• \"MOVE X\" — where X should be a positive integer ≤ 10\n• \"TURN LEFT\" — always valid\n• \"TURN RIGHT\" — always valid\n• All other formats are invalid.",
    output: "A list of True/False values indicating whether each command is valid.",
    actualOutput: "",
    example: "Expect: [True, True, False, False, True, False]",
    actual: "Actual: [True, True, True, False, True, False]",
  },
]

const images = [
  ["/Q1_CODE_1.png?height=400&width=600",
  "/Q1_CODE_2.png?height=400&width=600",
  "/Q1_CODE_3.png?height=400&width=600",
  "/Q1_CODE_4.png?height=400&width=600",
  "/Q1_CODE_5.png?height=400&width=600",
  "/Q1_CODE_6.png?height=400&width=600",
  "/Q1_CODE_7.png?height=400&width=600",
  "/Q1_CODE_8.png?height=400&width=600",
  "/Q1_CODE_9.png?height=400&width=600",
  "/Q1_CODE_10.png?height=400&width=600",
],
  ["/Q2_CODE_1.png?height=400&width=600",
    "/Q2_CODE_2.png?height=400&width=600",
    "/Q2_CODE_3.png?height=400&width=600"],
  ["/python_tutor/question3/1.png?height=400&width=600",
    "/python_tutor/question3/2.png?height=400&width=600",
    "/python_tutor/question3/3.png?height=400&width=600",
    "/python_tutor/question3/4.png?height=400&width=600",
    "/python_tutor/question3/5.png?height=400&width=600",
    "/python_tutor/question3/6.png?height=400&width=600",
    "/python_tutor/question3/7.png?height=400&width=600",
    "/python_tutor/question3/8.png?height=400&width=600",
    "/python_tutor/question3/9.png?height=400&width=600",
    "/python_tutor/question3/10.png?height=400&width=600",
    "/python_tutor/question3/11.png?height=400&width=600",
    "/python_tutor/question3/12.png?height=400&width=600",
    "/python_tutor/question3/13.png?height=400&width=600",
    "/python_tutor/question3/14.png?height=400&width=600",
    "/python_tutor/question3/15.png?height=400&width=600",
    "/python_tutor/question3/16.png?height=400&width=600",
    "/python_tutor/question3/17.png?height=400&width=600",
    "/python_tutor/question3/18.png?height=400&width=600",
    "/python_tutor/question3/19.png?height=400&width=600",
    "/python_tutor/question3/20.png?height=400&width=600",
    "/python_tutor/question3/21.png?height=400&width=600",
    "/python_tutor/question3/22.png?height=400&width=600",
    "/python_tutor/question3/23.png?height=400&width=600",
    "/python_tutor/question3/24.png?height=400&width=600",
    "/python_tutor/question3/25.png?height=400&width=600",
    "/python_tutor/question3/26.png?height=400&width=600",
    "/python_tutor/question3/27.png?height=400&width=600",
    "/python_tutor/question3/28.png?height=400&width=600",
    "/python_tutor/question3/29.png?height=400&width=600",
    "/python_tutor/question3/30.png?height=400&width=600",
    "/python_tutor/question3/31.png?height=400&width=600",
    "/python_tutor/question3/32.png?height=400&width=600",
    "/python_tutor/question3/33.png?height=400&width=600",
    "/python_tutor/question3/34.png?height=400&width=600",
    "/python_tutor/question3/35.png?height=400&width=600",
    "/python_tutor/question3/36.png?height=400&width=600",
    "/python_tutor/question3/37.png?height=400&width=600",
    "/python_tutor/question3/38.png?height=400&width=600",
    "/python_tutor/question3/39.png?height=400&width=600",
    "/python_tutor/question3/40.png?height=400&width=600",
    "/python_tutor/question3/41.png?height=400&width=600",
    "/python_tutor/question3/42.png?height=400&width=600",
    "/python_tutor/question3/43.png?height=400&width=600",
    "/python_tutor/question3/44.png?height=400&width=600",
    "/python_tutor/question3/45.png?height=400&width=600"]
]

const variableSets = [
  {
    title: "JavaScript Variables - Set 1",
    variables: [
      { name: "i", type: "int", value: "0", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: " " },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 2",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      //{ type: "output", text: " " },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
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
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 4",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 5",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 6",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 7",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 8",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 9",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "JavaScript Variables - Set 10",
    variables: [
      { name: "i", type: "int", value: "1", scope: "local" },
      { name: "n", type: "int", value: "5", scope: "local" },
      { name: "j", type: "int", value: "1", scope: "local" },
      { name: "Consel_output", type: "String", value: "  ", scope: "global" },
    ],
    terminalOutput: [
      { type: "command", text: "$ run.py" },
      { type: "output", text: '\xa0\xa0' },
      //{ type: "output", text: '\xa0\xa0'+"1" },
      //{ type: "output", text: '\xa0'+"12" },
      //{ type: "output", text: "123" },
    ],
  },
  {
    title: "Robot Commands - Set 1",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 2",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[]", scope: "local" },
      { name: "cmd", type: "string", value: "MOVE 5", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 3",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[]", scope: "local" },
      { name: "cmd", type: "string", value: "MOVE 5", scope: "local" },
      { name: "parts", type: "list", value: "['MOVE', '5']", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 4",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True]", scope: "local" },
      { name: "cmd", type: "string", value: "TURN LEFT", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 5",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True]", scope: "local" },
      { name: "cmd", type: "string", value: "MOVE 0", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 6",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False]", scope: "local" },
      { name: "cmd", type: "string", value: "JUMP 3", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 7",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False]", scope: "local" },
      { name: "cmd", type: "string", value: "TURN RIGHT", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 8",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True]", scope: "local" },
      { name: "cmd", type: "string", value: "MOVE 15", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
    ],
  },
  {
    title: "Robot Commands - Set 9",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Output: [True, True, False, False, True, False]" },
    ],
  },
  {
    title: "Robot Commands - Set 10",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
    ],
  },
  {
    title: "Robot Commands - Set 11",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
      { type: "error", text: "Bug: MOVE 0 is incorrectly validated as True" },
    ],
  },
  {
    title: "Robot Commands - Set 12",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
      { type: "error", text: "Bug: MOVE 0 is incorrectly validated as True" },
      { type: "error", text: "Bug: MOVE 15 is incorrectly validated as False" },
    ],
  },
  {
    title: "Robot Commands - Set 13",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
      { type: "error", text: "Bug: MOVE 0 is incorrectly validated as True" },
      { type: "error", text: "Bug: MOVE 15 is incorrectly validated as False" },
      { type: "output", text: "Option A: For MOVE commands, add a check that the number is ≥ 1." },
    ],
  },
  {
    title: "Robot Commands - Set 14",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
      { type: "error", text: "Bug: MOVE 0 is incorrectly validated as True" },
      { type: "error", text: "Bug: MOVE 15 is incorrectly validated as False" },
      { type: "output", text: "Option A: For MOVE commands, add a check that the number is ≥ 1." },
      { type: "output", text: "Option B: Change the TURN condition to parts[1] in [\"LEFT\", \"RIGHT\"] and modify the MOVE range check to include 0." },
    ],
  },
  {
    title: "Robot Commands - Set 15",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
      { type: "error", text: "Bug: MOVE 0 is incorrectly validated as True" },
      { type: "error", text: "Bug: MOVE 15 is incorrectly validated as False" },
      { type: "output", text: "Option A: For MOVE commands, add a check that the number is ≥ 1." },
      { type: "output", text: "Option B: Change the TURN condition to parts[1] in [\"LEFT\", \"RIGHT\"] and modify the MOVE range check to include 0." },
      { type: "output", text: "Option C: Replace parts[1].isdigit() with isinstance(parts[1], int) in MOVE validation and add length checks for TURN commands." },
    ],
  },
  {
    title: "Robot Commands - Set 16",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
      { type: "error", text: "Bug: MOVE 0 is incorrectly validated as True" },
      { type: "error", text: "Bug: MOVE 15 is incorrectly validated as False" },
      { type: "output", text: "Option A: For MOVE commands, add a check that the number is ≥ 1." },
      { type: "output", text: "Option B: Change the TURN condition to parts[1] in [\"LEFT\", \"RIGHT\"] and modify the MOVE range check to include 0." },
      { type: "output", text: "Option C: Replace parts[1].isdigit() with isinstance(parts[1], int) in MOVE validation and add length checks for TURN commands." },
      { type: "output", text: "Option D: Move the TURN condition outside the loop and use regex parsing for all commands." },
    ],
  },
  {
    title: "Robot Commands - Set 17",
    variables: [
      { name: "commands", type: "list", value: "['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']", scope: "local" },
      { name: "result", type: "list", value: "[True, True, False, False, True, False]", scope: "local" },
    ],
    terminalOutput: [
      { type: "command", text: "$ python validate_commands.py" },
      { type: "output", text: "Input: ['MOVE 5', 'TURN LEFT', 'MOVE 0', 'JUMP 3', 'TURN RIGHT', 'MOVE 15']" },
      { type: "output", text: "Expected: [True, True, False, False, True, False]" },
      { type: "output", text: "Actual: [True, True, True, False, True, False]" },
      { type: "error", text: "Bug: MOVE 0 is incorrectly validated as True" },
      { type: "error", text: "Bug: MOVE 15 is incorrectly validated as False" },
      { type: "output", text: "Option A: For MOVE commands, add a check that the number is ≥ 1." },
      { type: "output", text: "Option B: Change the TURN condition to parts[1] in [\"LEFT\", \"RIGHT\"] and modify the MOVE range check to include 0." },
      { type: "output", text: "Option C: Replace parts[1].isdigit() with isinstance(parts[1], int) in MOVE validation and add length checks for TURN commands." },
      { type: "output", text: "Option D: Move the TURN condition outside the loop and use regex parsing for all commands." },
      { type: "output", text: "Correct answer: A" },
    ],
  },
]

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({})
  
  // Function to determine if we should show the variable dashboard and terminal output
  const shouldShowDashboard = (questionId: number) => {
    return questionId !== 3 // Hide for question 3
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => {
      const currentAnswers = prev[currentQuestion] || []
      const isSelected = currentAnswers.includes(answer)

      if (isSelected) {
        // Remove the answer if already selected
        return {
          ...prev,
          [currentQuestion]: currentAnswers.filter((a) => a !== answer),
        }
      } else {
        // Add the answer if not selected
        return {
          ...prev,
          [currentQuestion]: [...currentAnswers, answer],
        }
      }
    })
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images[currentQuestion].length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images[currentQuestion].length) % images[currentQuestion].length)
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
        <div className={`grid ${currentQuestion === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-6 h-full`}>
          {/* Left Side - Instructions */}
          <div className="space-y-6">
            {/* Instructions Widget */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[currentQuestion].instruction}</p>
                  <p><strong>Input:</strong></p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[currentQuestion].input}</p>
                  <p><strong>Output:</strong></p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{questions[currentQuestion].output}</p>
                  
                  {questions[currentQuestion].instructionImage && (
                    <>
                      <p><strong>Example:</strong></p>
                      <Image
                        src={questions[currentQuestion].instructionImage}
                        alt={`Instruction image for question ${currentQuestion + 1}`}
                        width={300}
                        height={200}
                        className="w-full max-w-[150px] mx-auto my-2 object-contain rounded-lg border bg-white"
                      />
                    </>
                  )}
                  
                  {questions[currentQuestion].example && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line"><strong>Example: </strong>{questions[currentQuestion].example}</p>
                  )}
                  
                  {questions[currentQuestion].actualOutput ? (
                    <>
                      <p><strong>Actual:</strong></p>
                      <Image
                        src={questions[currentQuestion].actualOutput}
                        alt={`Actual output for question ${currentQuestion + 1}`}
                        width={300}
                        height={200}
                        className="w-full max-w-[150px] mx-auto my-2 object-contain rounded-lg border bg-white"
                      />
                    </>
                  ) : questions[currentQuestion].actual && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line"><strong>Actual: </strong>{questions[currentQuestion].actual}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Indicator - Only visible on small screens */}
            <Card className="lg:hidden">
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
          
          {/* Right Side - Question and Answer Options */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">{questions[currentQuestion].question}</h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion]?.includes(option) || false
                    return (
                      <Button
                        key={index}
                        variant={isSelected ? "default" : "outline"}
                        className={`leading-relaxed h-auto whitespace-pre-line p-4 w-full ${isSelected ? "text-white" : "text-gray-700"}`}
                        onClick={() => handleAnswerSelect(option)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div
                            className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                              isSelected ? "bg-primary border-primary" : "border-gray-300"
                            }`}
                          >
                          </div>
                          <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                          <span className="text-left">{option}</span>
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
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Question
                  </Button>

                  <div className="text-sm text-gray-500">
                    {
                      Object.keys(selectedAnswers).filter((key) => selectedAnswers[Number.parseInt(key)]?.length > 0)
                        .length
                    }{" "}
                    of {questions.length} answered
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

            {/* Progress Indicator - Only visible on large screens */}
            <Card className="hidden lg:block">
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

          {/* Right Side - Variable Dashboard and Images */}
          <div className={`space-y-6 ${currentQuestion === 2 ? 'lg:col-span-2' : ''}`}>
            {/* Variable Dashboard - Only show for questions other than Question 3 */}
            {shouldShowDashboard(currentQuestion + 1) && (
              <>
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
              </>
            )}
            {/* Image Display Card */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Reference Image ({currentImage + 1} of {images[currentQuestion].length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`relative ${currentQuestion === 2 ? 'h-[700px]' : 'h-[500px]'}`}>
                  <Image
                    src={images[currentQuestion][currentImage] || "/placeholder.svg"}
                    alt={`Reference image ${currentImage + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-full object-contain rounded-lg border bg-white"
                  />
                </div>

                {/* Image Navigation */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevImage}
                    disabled={images[currentQuestion].length <= 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex-1 mx-4 overflow-hidden">
                    <div className="flex justify-center gap-1 flex-wrap">
                      {images[currentQuestion].slice(0, 15).map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${index === currentImage ? "bg-primary" : "bg-gray-300"}`}
                        />
                      ))}
                      {images[currentQuestion].length > 15 && (
                        <span className="text-xs text-gray-500 mx-1">...</span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextImage}
                    disabled={images[currentQuestion].length <= 1}
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
