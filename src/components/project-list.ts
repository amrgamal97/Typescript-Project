import { SharedComponent } from "./shared-component";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { autoBinding } from "../decorators/auto-binding";
import { projectStateInstance } from "../state/state-management";
import { ProjectItem } from "../components/project-item";

export class ProjectList
  extends SharedComponent<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProject: Project[] = [];
  listElements: HTMLUListElement = this.element.querySelector("ul")!;
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProject = [];
    this.configure();
    this.renderContent();
  }

  @autoBinding
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.listElements.classList.add("droppable");
    }
  }
  @autoBinding
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectStateInstance.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @autoBinding
  dropLeaveHandler(event: DragEvent): void {
    this.listElements.classList.remove("droppable");
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dropLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectStateInstance.addListeners((project: Project[]) => {
      const filteredProjects = project.filter((ele) => {
        if (this.type === "active") {
          return ele.status === ProjectStatus.Active;
        } else {
          return ele.status === ProjectStatus.Finished;
        }
      });
      this.assignedProject = filteredProjects;
      this.renderProjects();
    });
  }

  renderProjects() {
    const listElements = document.getElementById(
      `${this.type}-project-list`
    ) as HTMLUListElement;
    listElements.innerHTML = "";
    for (const projectItem of this.assignedProject) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}
