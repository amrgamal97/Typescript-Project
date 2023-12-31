import { SharedComponent } from "./shared-component";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { autoBinding } from "../decorators/auto-binding";

export class ProjectItem
  extends SharedComponent<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  private get persons() {
    return this.project.people > 1 ? "Persons" : "Person";
  }

  constructor(hostElementId: string, project: Project) {
    super("single-project", hostElementId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @autoBinding
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @autoBinding
  dragEndHandler(event: DragEvent): void {}

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      this.project.people.toString() + ` ${this.persons}` + " Assigned!";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
