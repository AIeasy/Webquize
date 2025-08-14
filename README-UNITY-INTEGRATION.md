# Unity Integration for Quiz Visualization

This document explains how to set up the Unity integration for the "Visualize Code Execution" feature in questions 5 and 6.

## Setup Instructions

### 1. Unity Project Setup

1. Make sure Unity 2022.3.36f1 is installed at `H:\Unity\Unity Editor\2022.3.36f1\Editor\Unity.exe`
2. Create or open your Unity project at `H:\github projects\VRAR_PythonGame\test\question6`
3. Create an `Editor` folder in your Unity project's Assets directory if it doesn't exist already
4. Copy the `EditorAutoPlay.cs` and `AutoPlayOnLaunch.cs` scripts from the `public` folder of this web app to `Assets/Editor/` in your Unity project

### 2. Configuring Paths

If the Unity Hub location or project folder changes, you'll need to update the following files:

#### Unity Executable Path

In `webquize/lib/unity-launcher.ts`:

```typescript
// Path to Unity executable
const unityPath = "H:\\Unity\\Unity Editor\\2022.3.36f1\\Editor\\Unity.exe";
```

Change this path to match your Unity installation location.

#### Project Path

In `webquize/app/api/launch-unity/route.ts`:

```typescript
// Use the specific project path for question6
const projectPath = "H:\\github projects\\VRAR_PythonGame\\test\\question6";
```

Change this path to match your Unity project location.

### 3. Testing the Integration

1. Start the Next.js development server with `npm run dev`
2. Navigate to Question 5 or Question 6
3. Click the "Visualize Code Execution" button
4. Unity should launch and automatically play the scene for the corresponding question

## How It Works

1. When the "Visualize Code Execution" button is clicked, the web app calls the `launchUnity()` function with the question number
2. The function sends a request to the `/api/launch-unity` API endpoint with the Unity executable path and question number
3. The API endpoint:
   - Copies the auto-play scripts to the Unity project's Editor folder
   - Executes a command to launch Unity with special parameters:
     - `-projectPath` to specify the project to open
     - `-executeMethod EditorAutoPlay.PlayScene` to automatically play the scene after loading
     - `-questionNumber` to specify which question's scene to open
4. The `EditorAutoPlay.cs` and `AutoPlayOnLaunch.cs` scripts in the Unity project handle opening the correct scene and automatically playing it

## Troubleshooting

If Unity doesn't launch or doesn't automatically play the scene:

1. Check that Unity is installed at the specified path

   - If not, update the path in `webquize/lib/unity-launcher.ts`

2. Verify that the Unity project path is correct

   - If not, update the path in `webquize/app/api/launch-unity/route.ts`

3. Ensure the auto-play scripts are properly placed in the `Assets/Editor/` folder

   - If not, manually copy `EditorAutoPlay.cs` and `AutoPlayOnLaunch.cs` from the `public` folder to your Unity project's `Assets/Editor/` folder

4. Check the browser console and server logs for any error messages

5. Make sure the Next.js server has permission to execute commands on your system

## Common Path Changes

If you move your project to a different computer or location, here's a checklist of files to update:

1. `webquize/lib/unity-launcher.ts` - Update the Unity executable path
2. `webquize/app/api/launch-unity/route.ts` - Update the project path
3. Make sure the Editor scripts are copied to the new Unity project location

## Manual Setup (If Automatic Copy Fails)

If the automatic script copying fails:

1. Copy these files manually from the `webquize/public/` folder:

   - `EditorAutoPlay.cs`
   - `AutoPlayOnLaunch.cs`

2. Paste them into your Unity project's `Assets/Editor/` folder

3. Open Unity and ensure the scripts are properly imported
