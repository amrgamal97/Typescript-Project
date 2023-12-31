import { SharedComponent } from "./shared-component";
import { autoBinding } from "../decorators/auto-binding";
import { validationChecker, Validation } from "../util/validation";
import { projectStateInstance } from "../state/state-management";
export class ProjectInput extends SharedComponent<
  HTMLElement,
  HTMLFormElement
> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}
  private gatherUserInputs(): [string, string, number] | void {
    const enteredTitle: string = this.titleInputElement.value;
    const enteredDescription: string = this.descriptionInputElement.value;
    const enteredPeople: number = +this.peopleInputElement.value;

    const titleValidation: Validation = {
      value: enteredTitle,
      required: true,
      maxLength: 30,
    };
    const descriptionValidation: Validation = {
      value: enteredDescription,
      required: true,
      maxLength: 30,
    };
    const peopleValidation: Validation = {
      value: +enteredPeople,
      required: true,
      min: 1,
    };

    if (
      !validationChecker(titleValidation) ||
      !validationChecker(descriptionValidation) ||
      !validationChecker(peopleValidation)
    ) {
      alert("Invalid Values, please try again");
      return;
    } else {
      this.resetInputs();
      return [enteredTitle, enteredDescription, enteredPeople];
    }
  }

  private resetInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autoBinding
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInputs();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectStateInstance.addNewProject(title, description, people);
    }
  }
}
