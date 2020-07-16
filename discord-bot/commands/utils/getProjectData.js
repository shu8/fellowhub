const fs = require("fs");
const path = require("path");

// TODO: Replace JSON with API.
const getProjectData = (requestedProject) => {
	const projectsPath = path.join(process.env.PWD, "tempData", "projects.json");
	const jsonData = JSON.parse(fs.readFileSync(projectsPath));

	for (let storedProject of Object.keys(jsonData)) {
		if (storedProject === requestedProject) {
			jsonData[storedProject].project = storedProject;
			return jsonData[storedProject];
		}
	}
};

module.exports = getProjectData;
