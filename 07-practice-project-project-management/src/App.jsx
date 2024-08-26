import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoprojectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    currentAction: 'notion=selected',
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState(prevState => {
      const textId = Math.random();
      const newTask = {
        text,
        projectId: prevState.selectedProjectId,
        id: textId
      }

      return {
      ...prevState,
      tasks: [newTask, ...prevState.tasks]
      }
    })
  };

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  };

  function handleSelectProject(id) {
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: id,
    }));
  };

  function handleStartsAddProject() {
    setProjectState(prevState => ({
      ...prevState,
      selectedProjectId: null,
    }));
  };

  function handleCanceAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
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
      projects: [...prevState.projects, newProject]
      }
    })
  };

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => 
          project.id !== prevState.selectedProjectId )
      }
    })
  };

  let content;

  const selectedProjectTasks = projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId);

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handelAddProject} onCancle={handleCanceAddProject}/>
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartsAddProject={handleStartsAddProject} />
  } else {
    const selectedProject = projectState.projects.find((project) => project.id === projectState.selectedProjectId);
    content = <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={selectedProjectTasks}
    />
  }

  return (
    <main className="h-screen my-8 flex gap-2">
      <ProjectsSidebar
        onStartsAddProject={handleStartsAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
