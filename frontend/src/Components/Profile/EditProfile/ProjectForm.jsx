/* eslint-disable react/prop-types */
// import { useState } from "react";

const ProjectForm = ({ projects, setProjects }) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    // Create a new array with updated values
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [name]: value } : project
    );

    // Update state with the new projects array
    setProjects(updatedProjects);
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      {projects.map((project, index) => (
        <form key={index} className="flex flex-col gap-4 p-4">
          <h3 className="font-bold text-lg">Project {index + 1}</h3>

          <input
            type="text"
            name="PName"
            placeholder="Project Name"
            maxLength="25"
            required
            value={project.PName}
            onChange={(e) => handleChange(e, index)}
            className="p-3 border rounded-md focus:ring-2 border-white focus:ring-gray-400"
          />

          <input
            type="text"
            name="PSkills"
            placeholder="Skills (comma-separated)"
            required
            value={project.PSkills}
            onChange={(e) => handleChange(e, index)}
            className="p-3 border rounded-md focus:ring-2 border-white focus:ring-gray-400"
          />

          <textarea
            name="PDescription"
            placeholder="Project Description (max 150 chars)"
            maxLength="150"
            value={project.PDescription}
            onChange={(e) => handleChange(e, index)}
            className="p-3 border rounded-md focus:ring-2 border-white focus:ring-gray-400"
          ></textarea>

          <input
            type="url"
            name="P_URL"
            placeholder="Live Project URL"
            value={project.P_URL}
            onChange={(e) => handleChange(e, index)}
            className="p-3 border rounded-md focus:ring-2 border-white focus:ring-gray-400"
          />

          <input
            type="url"
            name="P_GitURL"
            placeholder="GitHub URL"
            value={project.P_GitURL}
            onChange={(e) => handleChange(e, index)}
            className="p-3 border rounded-md focus:ring-2 border-white focus:ring-gray-400"
          />

          <input
            type="url"
            name="P_PhotoURL"
            placeholder="Project Image URL"
            value={project.P_PhotoURL}
            onChange={(e) => handleChange(e, index)}
            className="p-3 border rounded-md focus:ring-2 border-white focus:ring-gray-400"
          />
        </form>
      ))}
    </div>
  );
};

export default ProjectForm;
