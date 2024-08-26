import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoprojectSelected";

function App() {
  const [projectState, setProjectState] = useState({
    currentAction: 'notion=selected',
    selectedProjectId: undefined,
    project: []
  });

  function handleStartsAddProject() {
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: null,

    }));
  };

  function handelAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      }

      return {
      ...prevState,
      selectedProjectId: undefined,
      project: [...prevState.project, newProject]
      }
    })
  };

  let content;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handelAddProject}/>
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartsAddProject={handleStartsAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-2">
      <ProjectsSidebar onStartsAddProject={handleStartsAddProject} projects={projectState.project} />
      {content}
    </main>
  );
}

export default App;
