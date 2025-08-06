export const questions = [
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
    question: "Robot Movement Commands Validation",
    options: [
      "For MOVE commands, add a check that the number is ≥ 1.",
      "Change the TURN condition to parts[1] in [\"LEFT\", \"RIGHT\"] and modify the MOVE range check to include 0.",
      "Replace parts[1].isdigit() with isinstance(parts[1], int) in MOVE validation and add length checks for TURN commands.",
      "Move the TURN condition outside the loop and use regex parsing for all commands."
    ],
    instruction: "You are given a list of robot movement commands. You need to validate each command and return a list of booleans where:\n- True means the command is valid.\n- False means the command is invalid.\nThis question is case sensitive.",
    input: "A list of strings. Each string is a command and will be in one of the following formats:\n- \"MOVE X\" — where X should be a positive integer ≤ 10\n- \"TURN LEFT\" — always valid\n- \"TURN RIGHT\" — always valid\n- All other formats are invalid.",
    output: "A list of True/False values indicating whether each command is valid.",
    codeExample: `def validate_commands(commands):
    result = []
    for cmd in commands:
        parts = cmd.split()
        if parts[0] == "MOVE":
            if len(parts) == 2:
                if parts[1].isdigit():
                    if int(parts[1]) <= 10:
                        result.append(True)
                    else:
                        result.append(False)
                else:
                    result.append(False)
            elif parts[0] == "TURN":
                if parts[1] == "LEFT" or "RIGHT":
                    result.append(True)
                else:
                    result.append(False)
            else:
                result.append(False)
    return result`,
    example: "Input: [\"MOVE 5\",\"TURN LEFT\",\"MOVE 0\",\"JUMP 3\", \"TURN RIGHT\", \"MOVE 15\"]\nExpect: [True, True, False, False, True, False]\nActual: [True, True, True, False, True, False]",
    specialLayout: true
  },
  {
    id: 4,
    question: "2D Grid Row Zeroing",
    options: [
      "The loop should iterate over grid instead of new_grid to avoid modifying the original.",
      "grid.copy() creates a shallow copy where row lists are shared. To fix, create new row copies with new_grid = [row[:] for row in grid].",
      "The zero-check condition if 0 in row should be replaced with if any(element == 0 for element in row).",
      "The assignment row[i] = 0 should be changed to new_grid[i][j] = 0 with nested indexing."
    ],
    instruction: "A student is writing a function that takes a 2D grid (list of lists) and returns a new grid where any row containing a 0 has all elements in that row set to 0, but the original grid must remain unchanged. (Reference 1: shallow copy)",
    input: "Takes a 2D list (grid), like a list of lists of integers.\nCreates a new 2D grid.\nFor any row that contains a 0, set all elements of that row to 0 in the new grid only.\nThe original grid must remain unchanged.",
    output: "A new 2D grid with the specified modifications, while preserving the original grid.",
    codeExample: `def mask_grid(grid):
    new_grid = grid.copy()  # new_grid = [row[:] for row in grid]
    
    for row in new_grid:
        if 0 in row:
            for i in range(len(row)):
                row[i] = 0
                
    return new_grid`,
    example: "Input: [[1,2,3],[4,0,6],[7,8,9]]\nExpect: A copied 2D list like: [[1,2,3],[0,0,0],[7,8,9]] and original matrix stays the same\nActual: original got changed too, it should stay still",
    specialLayout: true
  },
  {
    id: 5,
    question: "2D List Common Element Removal",
    options: [
      "The loop processes rows in reverse order, causing elements at the beginning to be missed.",
      "The condition k != i skips necessary comparisons between identical rows.",
      "The inner loop checks against the modified grid during removal, causing inconsistent state when elements are popped.",
      "The while loop's index decrement (j -= 1) should be placed before the pop operation."
    ],
    instruction: "You are given a 2D list of integers. The student writes a function to remove any number from a row that appears in more than one row. (Reference 2: Adding/removing items while looping through collections)",
    input: "Takes a 2D list of integers (list of rows).\nRemoves any number from a row if that number appears in more than one row, even they are not in the consecutive.",
    output: "A modified 2D list where shared numbers across rows are removed.",
    codeExample: `def remove_common_elements(grid):
    for i in range(len(grid)):
        j = len(grid[i]) - 1
        while j >= 0:
            val = grid[i][j]
            found = False
            for k in range(len(grid)):
                if k != i:
                    if val in grid[k]:
                        found = True
                        break
            if found:
                grid[i].pop(j)
            j -= 1
    return grid`,
    example: "Case 1 consecutive:\nInput: [[1, 2, 3], [3, 4, 5], [5, 6, 7]]\nExpect: [[1, 2], [4], [6, 7]]\nActual: [[1, 2], [3, 4], [5, 6, 7]]",
    case1: "Input: [[1, 2, 3], [3, 4, 5], [5, 6, 7]]\nExpect: [[1, 2], [4], [6, 7]]\nActual: [[1, 2], [3, 4], [5, 6, 7]]",
    specialLayout: true,
    visualize: true
  },
  {
    id: 6,
    question: "Binary List Consecutive 1s Counter",
    options: [
      "The loop starts at index 1 instead of 0, skipping the first element.",
      "The state variable in_run should be initialized to True instead of False.",
      "The condition if n == 1 and not in_run should check nums[i-1] instead of in_run.",
      "The final if in_run: count += 1 should be placed inside the loop.",
      "Forgot edge case handler."
    ],
    instruction: "A student tries to write a function that counts how many runs of consecutive 1s appear in a binary list. (Conditional 1: Branch Selection & Coverage Errors)",
    input: "Takes a binary list (a list of 0s and 1s) and returns the number of \"runs\" of consecutive 1s.",
    output: "An integer: the number of runs of 1s.",
    codeExample: `def count_runs(nums):
    count = 0
    in_run = False
    
    for i in range(1, len(nums)):
        n = nums[i]
        if n == 1 and not in_run:
            in_run = True
        elif n == 0 and in_run:
            count += 1
            in_run = False
            
    if in_run:
        count += 1
    print(count)
    return count`,
    example: "Case 1:\nInput: nums = [1, 1, 0, 1, 0, 1, 1, 1]\nExpect: 3\nActual: 3\n\nCase 2:\nInput: nums = [1, 0]\nExpect: 1\nActual: 0",
    case1: "Input: nums = [1, 1, 0, 1, 0, 1, 1, 1]\nExpect: 3\nActual: 3",
    case2: "Input: nums = [1, 0]\nExpect: 1\nActual: 0",
    specialLayout: true,
    visualize: true
  },
]

export const images = [
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
  Array.from({ length: 45 }, (_, i) => `/python_tutor/question3/${i + 1}.png`),
  Array.from({ length: 20 }, (_, i) => `/python_tutor/question4/${i + 1}.png`)
]

export const variableSets = [
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
    ],
  },
]