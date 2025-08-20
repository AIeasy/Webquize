/**
 * Utility function to launch Unity and automatically play the specified question scene
 * This will open the question6 project and play the appropriate scene
 */
export const launchUnity = async (questionNumber: number = 6): Promise<boolean> => {
  try {
    // Path to Unity executable
    const unityPath = "C:\\Program Files\\Unity\\Hub\\Editor\\6000.1.12f1\\Editor\\Unity.exe";
    
    // Send the Unity path and question number to the API
    const response = await window.fetch('/api/launch-unity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        unityPath,
        questionNumber 
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error("API error:", result.error);
      return false;
    }
    
    console.log(`Launched Unity with project: ${result.projectPath} for question ${questionNumber}`);
    return true;
  } catch (error) {
    console.error("Failed to launch Unity:", error);
    return false;
  }
};
