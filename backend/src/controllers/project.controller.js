import { createProject,getAllProjects} from "../services/project.service.js";

export async function createProjectController(req, res) {
  const { projectName } = req.body;

  const newProject = await createProject(projectName);
  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: newProject,
  });
}

export async function getAllProjectsController(req, res) {
  const projects = await getAllProjects();
  return res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    data: projects,
  });
}
 