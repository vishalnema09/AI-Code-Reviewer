import projectModel from "../models/project.model.js";

export async function createProject(projectName) {
  const project = await projectModel.create({ name: projectName, code: "//start coding here" });
  return project;
}

export async function getAllProjects() {
  const projects = await projectModel.find({});
  return projects;
}
