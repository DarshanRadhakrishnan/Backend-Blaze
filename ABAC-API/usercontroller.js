const authChecker=require("../middlewares/authChecker")
const {canviewProject,canUpdateProject}=require("../policies/policies")
export const viewProject = (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = getProjectById(projectId, res);
    console.log("Project is : ", project);
    authorize(canviewProject, project)(req, res, () => {
      handleResponse(res, 200, "Project retrieved successfully", project);
    });
  };
export const updateProject = (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = getProjectById(projectId, res);
    console.log("Project is : ", project);
    authorize(canUpdateProject, project)(req, res, () => {
      handleResponse(res, 200, "Project updated successfully", project);
    });
  };

