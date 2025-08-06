# Quiz and Survey Results

## Quiz Answers

### Question 1
- Selected Answer: The second for loop range(i-1, 0, 1) counts upward
 it never executes because the start is greater than the end with a positive step. 

### Question 2
- Selected Answer: The total += nums[i] line should occur before the continue, because continue skips all subsequent logic inside the loop. 

### Question 3
- Selected Answer: Replace parts[1].isdigit() with isinstance(parts[1], int) in MOVE validation and add length checks for TURN commands.

### Question 4
- Selected Answer: grid.copy() creates a shallow copy where row lists are shared. To fix, create new row copies with new_grid = [row[:] for row in grid].

### Question 5
- Selected Answer: The inner loop checks against the modified grid during removal, causing inconsistent state when elements are popped.

### Question 6
- Selected Answer: The condition if n == 1 and not in_run should check nums[i-1] instead of in_run.

### Question question6
- Selected Answer: The final if in_run: count += 1 should be placed inside the loop.

### Question question1
- Selected Answer: The second for loop range(i-1, 0, 1) counts upward
 it never executes because the start is greater than the end with a positive step. ,The outer loop should start from i = 1 rather than i = 0 to avoid printing an empty first row and fix the alignment.,The print statement for spacing is incorrect; it should be " " * i instead of " " * (n - i) to align left. 

### Question question2
- Selected Answer: The inner continue bypasses the update of i for non-multiples of 4, causing the same number to be evaluated repeatedly. ,The total += nums[i] line should occur before the continue, because continue skips all subsequent logic inside the loop. ,The check for nums[i] % 4 == 0 should be outside the if nums[i] % 2 == 0 block to properly filter all multiples of 4.  

### Question question3
- Selected Answer: Replace parts[1].isdigit() with isinstance(parts[1], int) in MOVE validation and add length checks for TURN commands.,Change the TURN condition to parts[1] in ["LEFT", "RIGHT"] and modify the MOVE range check to include 0.

### Question question4
- Selected Answer: The zero-check condition if 0 in row should be replaced with if any(element == 0 for element in row).

### Question question5
- Selected Answer: The condition k != i skips necessary comparisons between identical rows.,The inner loop checks against the modified grid during removal, causing inconsistent state when elements are popped.

### Question debugger2Survey
- Selected Answer: [object Object]

### Question debugger3Survey
- Selected Answer: [object Object]

## Experience Surveys

### Debugger 1 Survey
- interface: 4
- bugLocation: 4
- control: 4
- futureUse: 4
- faster: 4
- additionalComments: 

### Debugger 2 Survey
- interface: 4
- bugLocation: 4
- control: 4
- futureUse: 4
- faster: 4
- additionalComments: 

### Debugger 3 Survey
- interface: 5
- bugLocation: 5
- control: 5
- futureUse: 5
- faster: 5
- additionalComments: 

## Final Survey

### Debugger Comparison
- Easiest to use: debugger3
- Most effective: debugger1
- Fastest: debugger1
- Preferred for future use: debugger1

### Technical Feedback
- Technical issues encountered: none
- Satisfaction with AR debugger stability: 1

### Open-Ended Feedback
#### Most useful feature
1

#### Aspect needing most improvement
1

#### Additional comments
1
