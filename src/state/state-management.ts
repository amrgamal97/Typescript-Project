import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (item: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListeners(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Application State Managament
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static projectStateInstance: ProjectState;
  private constructor() {
    super();
  }

  addNewProject(title: string, description: string, numberOfPeople: number) {
    const newProject = new Project(
      title,
      description,
      Math.random().toString(),
      numberOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListener();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((ele: Project) => ele.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListener();
    }
  }

  private updateListener() {
    for (const listnerFn of this.listeners) {
      listnerFn(this.projects.slice());
    }
  }
  static getInstance() {
    if (this.projectStateInstance) {
      return this.projectStateInstance;
    }
    this.projectStateInstance = new ProjectState();
    return this.projectStateInstance;
  }
}
// Instance of ProjectState To Reuse Across The Application
export const projectStateInstance = ProjectState.getInstance();
