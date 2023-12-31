export enum ProjectStatus {
  Active,
  Finished,
}

// Project General Types
export class Project {
  constructor(
    public title: string,
    public description: string,
    public id: string,
    public people: number,
    public status: ProjectStatus
  ) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.people = people;
  }
}
