// Unity Editor script to automatically play the specified question scene
// This file should be placed in an Editor folder in your Unity project
// For example: Assets/Editor/EditorAutoPlay.cs

#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using System.IO;
using System;

[InitializeOnLoad]
public class EditorAutoPlay
{
    // Static constructor that gets called when Unity loads
    static EditorAutoPlay()
    {
        // Check if we were launched with the -executeMethod parameter
        string[] args = Environment.GetCommandLineArgs();
        bool launchedWithExecuteMethod = false;
        
        for (int i = 0; i < args.Length; i++)
        {
            if (args[i].Contains("-executeMethod") && i + 1 < args.Length && args[i + 1].Contains("EditorAutoPlay.PlayScene"))
            {
                launchedWithExecuteMethod = true;
                break;
            }
        }
        
        // Only auto-play if launched with our execute method
        if (launchedWithExecuteMethod)
        {
            Debug.Log("EditorAutoPlay: Detected launch with -executeMethod parameter");
            // Wait for Unity to fully initialize before attempting to play
            EditorApplication.update += WaitForSceneLoad;
        }
    }
    
    private static void WaitForSceneLoad()
    {
        // Wait until Unity is fully initialized
        if (EditorApplication.isCompiling || EditorApplication.isUpdating)
            return;
            
        // Unsubscribe to avoid multiple calls
        EditorApplication.update -= WaitForSceneLoad;
        
        // Now that Unity is ready, execute the PlayScene method
        PlayScene();
    }

    // This method will be called when Unity is launched with -executeMethod EditorAutoPlay.PlayScene
    [MenuItem("Tools/Auto Play Scene")]
    public static void PlayScene()
    {
        Debug.Log("Auto Play Scene triggered via command line");
        
        // Get the question number from command line arguments
        int questionNumber = 6; // Default to question 6
        string[] args = Environment.GetCommandLineArgs();
        for (int i = 0; i < args.Length; i++)
        {
            if (args[i] == "-questionNumber" && i + 1 < args.Length)
            {
                if (int.TryParse(args[i + 1], out int parsedNumber))
                {
                    questionNumber = parsedNumber;
                    Debug.Log($"Found question number from command line: {questionNumber}");
                }
            }
        }
        
        // Use a delay to ensure Unity is fully loaded
        EditorApplication.delayCall += () =>
        {
            try
            {
                // Open the specified question scene
                string scenePath = $"Assets/Scenes/question{questionNumber}.unity";
                
                Debug.Log($"Attempting to open scene: {scenePath}");
                
                // Check if the scene exists
                if (File.Exists(Path.Combine(Application.dataPath.Replace("Assets", ""), scenePath)))
                {
                    // Open the scene
                    EditorSceneManager.OpenScene(scenePath);
                    Debug.Log($"Opened scene: {scenePath}");
                    
                    // Use another delay to ensure scene is fully loaded
                    EditorApplication.delayCall += () =>
                    {
                        // Start playing the scene
                        EditorApplication.isPlaying = true;
                        Debug.Log($"Scene playback started automatically for question {questionNumber}");
                    };
                }
                else
                {
                    Debug.LogError($"Scene not found: {scenePath}");
                    
                    // Fallback to question6 scene if the specified scene doesn't exist
                    string fallbackScenePath = "Assets/Scenes/question6.unity";
                    if (File.Exists(Path.Combine(Application.dataPath.Replace("Assets", ""), fallbackScenePath)))
                    {
                        EditorSceneManager.OpenScene(fallbackScenePath);
                        Debug.Log($"Opened fallback scene: {fallbackScenePath}");
                        
                        // Use another delay to ensure scene is fully loaded
                        EditorApplication.delayCall += () =>
                        {
                            EditorApplication.isPlaying = true;
                            Debug.Log($"Scene playback started automatically for fallback scene");
                        };
                    }
                }
            }
            catch (Exception e)
            {
                Debug.LogError($"Error playing scene: {e.Message}");
            }
        };
    }
}
#endif