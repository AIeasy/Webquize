// Unity Editor script to automatically play the scene when Unity launches
// Place this script in Assets/Editor folder in your Unity project

#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;
using UnityEditor.SceneManagement;
using System.IO;

[InitializeOnLoad]
public class AutoPlayOnLaunch
{
    static AutoPlayOnLaunch()
    {
        // Subscribe to the first update after Unity is fully loaded
        EditorApplication.update += OnFirstUpdate;
    }

    private static void OnFirstUpdate()
    {
        // Unsubscribe immediately to ensure this only runs once
        EditorApplication.update -= OnFirstUpdate;
        
        // Check if we were launched with the command line argument
        string[] args = System.Environment.GetCommandLineArgs();
        bool shouldAutoPlay = false;
        int questionNumber = 6;
        
        for (int i = 0; i < args.Length; i++)
        {
            // Check for our auto-play flag
            if (args[i].Contains("-executeMethod") && 
                i + 1 < args.Length && 
                args[i + 1].Contains("EditorAutoPlay.PlayScene"))
            {
                shouldAutoPlay = true;
            }
            
            // Get question number if specified
            if (args[i] == "-questionNumber" && i + 1 < args.Length)
            {
                if (int.TryParse(args[i + 1], out int parsedNumber))
                {
                    questionNumber = parsedNumber;
                    Debug.Log($"AutoPlayOnLaunch: Found question number: {questionNumber}");
                }
            }
        }
        
        if (shouldAutoPlay)
        {
            Debug.Log("AutoPlayOnLaunch: Auto-play triggered");
            
            // Use a delay to ensure Unity is fully loaded
            EditorApplication.delayCall += () =>
            {
                try
                {
                    // Try to open the scene for the specific question
                    
                    string scenePath = $"Assets/Scenes/Question 5 Final.unity";
                    
                    if (File.Exists(Path.Combine(Application.dataPath.Replace("Assets", ""), scenePath)))
                    {
                        // Open the scene
                        EditorSceneManager.OpenScene(scenePath);
                        Debug.Log($"AutoPlayOnLaunch: Opened scene: {scenePath}");
                        
                        // Add a delay before playing
                        EditorApplication.delayCall += () =>
                        {
                            // Force focus on the Unity window
                            EditorWindow.FocusWindowIfItsOpen<SceneView>();
                            
                            // Start playing
                            EditorApplication.isPlaying = true;
                            Debug.Log("AutoPlayOnLaunch: Started playing scene automatically");
                        };
                    }
                    else
                    {
                        Debug.LogWarning($"AutoPlayOnLaunch: Scene not found: {scenePath}");
                        
                        // Try to find any scene in the Scenes folder as fallback
                        string scenesDir = Path.Combine(Application.dataPath, "Scenes");
                        if (Directory.Exists(scenesDir))
                        {
                            string[] sceneFiles = Directory.GetFiles(scenesDir, "*.unity");
                            if (sceneFiles.Length > 0)
                            {
                                string fallbackScene = sceneFiles[0].Replace(Application.dataPath, "Assets");
                                EditorSceneManager.OpenScene(fallbackScene);
                                Debug.Log($"AutoPlayOnLaunch: Opened fallback scene: {fallbackScene}");
                                
                                // Add a delay before playing
                                EditorApplication.delayCall += () =>
                                {
                                    // Force focus on the Unity window
                                    EditorWindow.FocusWindowIfItsOpen<SceneView>();
                                    
                                    // Start playing
                                    EditorApplication.isPlaying = true;
                                    Debug.Log("AutoPlayOnLaunch: Started playing fallback scene automatically");
                                };
                            }
                        }
                    }
                }
                catch (System.Exception e)
                {
                    Debug.LogError($"AutoPlayOnLaunch: Error during auto-play: {e.Message}");
                }
            };
        }
    }
}
#endif
