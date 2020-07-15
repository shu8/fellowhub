const { LIST_OF_PROJECTS } = require("../../constants");

/**Returns the properly named project that roughly matches the user's input, or null if no project matches.*/
const identifyProject = (message, userInput) => {
	if (isAmbiguousSci(userInput)) {
		message.channel.send("That may refer to Scikit-Learn or SciML.");
		return;
	}

	const requestedProjectSnippet = isSci
		? userInput.toLowerCase().substring(0, 4)
		: userInput.toLowerCase().substring(0, 3);

	for (project of LIST_OF_PROJECTS) {
		if (project.toLowerCase().includes(requestedProjectSnippet)) {
			return project;
		}
	}

	return null;
};

const isAmbiguousSci = (requestedProject) =>
	isSci(requestedProject) && requestedProject.length <= 3;

const isSci = (requestedProject) =>
	requestedProject.toLowerCase().startsWith("sci");

module.exports = identifyProject;
