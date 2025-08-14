import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);
const fsPromises = fs.promises;

/**
 * Find the most recent Unity project by checking for .sln files or Library folders
 * @param baseDir The base directory to search in
 * @returns The path to the most recent Unity project
 */
async function findMostRecentUnityProject(baseDir: string): Promise<string> {
  try {
    // List of directories to search for Unity projects
    const searchDirs = [
      "H:\\github projects\\VRAR_PythonGame",
      "H:\\Unity Projects"
    ];
    
    let projects: { path: string; mtime: Date }[] = [];
    
    // Search each directory for Unity projects
    for (const searchDir of searchDirs) {
      try {
        const entries = await fsPromises.readdir(searchDir, { withFileTypes: true });
        
        for (const entry of entries) {
          if (entry.isDirectory()) {
            const projectDir = path.join(searchDir, entry.name);
            
            try {
              // Check if this is a Unity project by looking for typical Unity project files/folders
              const projectFiles = await fsPromises.readdir(projectDir);
              
              // Check for Library folder (Unity project folder) or .sln file (Unity solution)
              const isUnityProject = projectFiles.some(file => 
                file === 'Library' || file === 'Assets' || file.endsWith('.sln')
              );
              
              if (isUnityProject) {
                const stats = await fsPromises.stat(projectDir);
                projects.push({
                  path: projectDir,
                  mtime: stats.mtime
                });
              }
            } catch (err) {
              // Skip directories we can't read
              console.error(`Error reading directory ${projectDir}:`, err);
            }
          }
        }
      } catch (err) {
        console.error(`Error reading search directory ${searchDir}:`, err);
      }
    }
    
    // Sort projects by modification time (newest first)
    projects.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    
    if (projects.length > 0) {
      console.log(`Found ${projects.length} Unity projects. Most recent: ${projects[0].path}`);
      return projects[0].path;
    }
    
    // Fallback to default project path
    return "H:\\github projects\\VRAR_PythonGame\\UnityProject";
  } catch (error) {
    console.error("Error finding most recent Unity project:", error);
    // Fallback to default project path
    return "H:\\github projects\\VRAR_PythonGame\\UnityProject";
  }
}

export async function POST(request: Request) {
  try {
    const { unityPath, questionNumber = 6 } = await request.json();
    
    if (!unityPath) {
      return NextResponse.json({ error: 'Unity path is required' }, { status: 400 });
    }
    
    // Use the specific project path for question6
    const projectPath = "H:\\github projects\\VRAR_PythonGame\\test\\question6";
    
    // Copy the auto-play scripts to the Unity project's Editor folder
    const editorFolderPath = path.join(projectPath, "Assets", "Editor");
    
    try {
      // Create the Editor folder if it doesn't exist
      if (!fs.existsSync(editorFolderPath)) {
        await fsPromises.mkdir(editorFolderPath, { recursive: true });
        console.log(`Created Editor folder at ${editorFolderPath}`);
      }
      
      // Copy EditorAutoPlay.cs to the Editor folder
      const editorAutoPlaySource = path.join(process.cwd(), "public", "EditorAutoPlay.cs");
      const editorAutoPlayDest = path.join(editorFolderPath, "EditorAutoPlay.cs");
      await fsPromises.copyFile(editorAutoPlaySource, editorAutoPlayDest);
      console.log(`Copied EditorAutoPlay.cs to ${editorAutoPlayDest}`);
      
      // Copy AutoPlayOnLaunch.cs to the Editor folder
      const autoPlayOnLaunchSource = path.join(process.cwd(), "public", "AutoPlayOnLaunch.cs");
      const autoPlayOnLaunchDest = path.join(editorFolderPath, "AutoPlayOnLaunch.cs");
      await fsPromises.copyFile(autoPlayOnLaunchSource, autoPlayOnLaunchDest);
      console.log(`Copied AutoPlayOnLaunch.cs to ${autoPlayOnLaunchDest}`);
    } catch (err) {
      console.error("Error copying auto-play scripts:", err);
      // Continue even if copy fails, as the script might already be there
    }
    
    // Pass the question number as an argument to the EditorAutoPlay script
    const command = `start "" "${unityPath}" -projectPath "${projectPath}" -executeMethod EditorAutoPlay.PlayScene -questionNumber ${questionNumber}`;
    
    console.log(`Executing command: ${command} for question ${questionNumber}`);
    
    // Execute the command
    await execAsync(command);
    
    return NextResponse.json({ success: true, projectPath, questionNumber });
  } catch (error) {
    console.error('Error launching Unity:', error);
    return NextResponse.json({ error: 'Failed to launch Unity' }, { status: 500 });
  }
}
