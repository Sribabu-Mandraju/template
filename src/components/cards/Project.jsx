import React from "react";

const ProjectsCard = () => {
  const projects = [
    {
      name: "Travelling souls",
      description:
        "A website for tourists to enhance their tour experience and provide security during their tour",
      techStack: "React, Tailwind CSS , Express js , Leaflet library",
      demoLink: "https://travels-taupe-three.vercel.app/",
      sourceLink: "https://github.com/Sribabu-Mandraju/travels",
    },
    {
      name: "Techzite 2k24",
      description:
        "A college techfest website this is the website where our vision of tech turns to website",
      techStack: "React, Node.js, MongoDB,Redux toolkit",
      demoLink: "https://teckzite.vercel.app/",
      sourceLink: "#",
    },
    {
      name: "My Personal portfolio",
      description:
        "A website to showcase my skill set",
      techStack: "React, tailwind css, three.js",
      demoLink: "https://sribabu-portfolio.netlify.app/",
      sourceLink: "#",
    },
    // Add more projects as needed
  ];

  return (
    <div className="max-w-lg w-full min-w-[600px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <p className="mt-2 text-gray-500">Full-Stack Developer</p>

        {/* Projects Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="w-full bg-gray-200 text-purple-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Project Name</th>
                <th className="py-3 px-6 text-left">Live Demo</th>
                <th className="py-3 px-6 text-left">Source Code</th>
                <th className="py-3 px-6 text-left">Tech Stack</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {projects.map((project, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{project.name}</td>
                  <td className="py-3 px-6">
                    <a
                      href={project.demoLink}
                      className="text-purple-500 hover:underline"
                    >
                      Demo
                    </a>
                  </td>
                  <td className="py-3 px-6">
                    <a
                      href={project.sourceLink}
                      className="text-purple-500 hover:underline"
                    >
                      Source
                    </a>
                  </td>
                  <td className="py-3 px-6">{project.techStack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="text-white bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-full transition duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
