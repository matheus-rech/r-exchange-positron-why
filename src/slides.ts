// slides.ts -- All slide content and speaker notes live here.
// Edit this file to change what appears on screen.
// Inline HTML is allowed in string values (e.g., <em>, <br />, <span class="accent-blue">).

import type { Section, Footer, Slide } from './types';

export const SECTIONS: Section[] = [
	{ id: 1, label: 'Title' },
	{ id: 2, label: 'RStudio' },
	{ id: 3, label: 'Notebooks' },
	{ id: 4, label: "What's Next" },
];

export const FOOTER: Footer = {
	leftName: 'Nick Strayer',
	leftLogo: 'Posit_Logos/Posit-Logos-2024_horiz-white-quarto-web.svg',
	right: 'R Exchange · 2026',
};

export const SLIDES: Slide[] = [
	// ===== TITLE =====
	{
		section: 1,
		variant: 'title',
		logo: true,
		eyebrow: '',
		heading: 'Positron',
		subtitle: 'Data Science Without Constraints',
		notes: `- Welcome to R Exchange 2026
- Thread for the day: notice where tools make work harder by forcing a switch, vs. where a well-designed tool makes work easier`,
	},

	// ===== WHO I AM =====
	{
		section: 1,
		variant: 'who',
		eyebrow: "Hi, I'm Nick.",
		items: [
			'Principal Engineer at Posit',
		],
		notes: `- Principal Engineer at Posit, working on the Positron Notebook Editor
- Focus: how people actually do data science -- workflows, friction, paper cuts`,
	},

	// ===== HOOK =====
	{
		section: 1,
		variant: 'phrase',
		phrase: 'I was an <em class="accent-blue">RStudio</em> user.',
		context: 'I wrote my dissertation in R. My day job was R. My side projects were R. <span class="accent-blue">RStudio</span> is where I lived.',
		notes: `- Before Posit, I was an RStudio user
- PhD in Biostatistics, written entirely in R -- internships, jobs, side projects
- RStudio was where I lived`,
	},

	// ===== TRANSITION =====
	{
		section: 1,
		variant: 'phrase',
		phrase: 'The feeling mattered more than the window.',
		context: 'A good tool keeps the pieces of the work close enough that you can stay with the problem.',
		notes: `- Not about RStudio per se -- about taking what worked and applying it to modern data science
- The feeling: the tool understood the shape of the work
- Pieces stayed close enough to stay with the problem
- Positron: the feature list isn't the interesting part -- the why is`,
	},

	// ===== THESIS =====
	{
		section: 1,
		variant: 'thesis',
		lines: [
				{
				text: "Positron exists to remove the switches we've learned to tolerate.",
				final: true,
				detail: 'Not the real constraints of the work -- the unnecessary constraints imposed by tools.',
			},
		],
		notes: `- The why: removing switches -- languages, editors, formats, context
- Not the real constraints (data, methods, questions) but unnecessary friction
- Positron exists to remove the switches we've learned to tolerate`,
	},

	// ===== WHAT MADE RSTUDIO HOME =====
	{
		section: 2,
		variant: 'list',
		cols: 4,
		icon: 'code',
		heading: 'What made <em class="accent-blue">RStudio</em> <em>home</em>.',
		items: [
			{ title: 'Console', body: 'Where you experimented.' },
			{ title: 'Plots', body: 'Where you saw results.' },
			{ title: 'Variables', body: 'Where you checked state.' },
			{ title: 'Source', body: 'Where you wrote.' },
		],
		closing: 'Everything in one window. Nothing in the way.',
		notes: `- What made RStudio home
- Console: experiment. Plots: see results. Variables: check state. Source: write
- Everything in one window, nothing in the way`,
	},

	// ===== THE BREAK: Graph algorithms =====
	{
		section: 2,
		variant: 'show',
		heading: 'Then my work <em>changed shape</em>.',
		image: './images/python-clustering.png',
		caption: 'Clustering health records for my dissertation. The best tool was a <span class="accent-blue">Python</span> library.',
		notes: `- Dissertation: network-based clustering of health records and genetic data
- Best tool was a Python library (graph-tool) -- so now I needed Python`,
	},

	// ===== THE BREAK: Interactive viz =====
	{
		section: 2,
		variant: 'show',
		heading: 'Then it changed shape <em>again</em>.',
		image: './images/interactive-visualizations.png',
		caption: 'Interactive data visualization. The answer was <em>JavaScript</em>.',
		notes: `- Interactive custom data visualization -- the answer was JavaScript`,
	},

	// ===== THE BREAK: Conclusion =====
	{
		section: 2,
		variant: 'build',
		lines: [
			{ from: 'Data analysis.', to: 'R.', accent: 'blue' },
			{ from: 'Graph algorithms.', to: 'Python.'},
			{ from: 'Interactive viz.', to: 'JavaScript.',accent: 'blue' },
		],
		conclusion: 'Three languages. Three workflows.',
		notes: `- R didn't go anywhere, but other languages/tools/workflows stacked up
- Constantly switching between RStudio, VS Code, and Jupyter`,
	},

	// ===== POSITRON'S PREMISE =====
	{
		section: 2,
		variant: 'phrase',
		phrase: 'What if your tools followed <em>you</em>,<br />instead of you switching tools?',
		notes: `- Positron's question: what if your tools followed you?
- Exploratory workflow (plots, variables, console) doesn't disappear when you switch languages
- RStudio muscle memory carries over
- One place, familiar tools, focus on the actual problems`,
	},

	// ===== COMPARISON: R vs Python =====
	{
		section: 2,
		variant: 'comparison',
		heading: 'Same tools. <em>Different language</em>.',
		tabs: [
			{
				label: 'R',
				image: 'images/r-workspace.png',
			},
			{
				label: 'Python',
				image: 'images/python-workspace.png',
			},
		],
		caption: '<span class="accent-blue">RStudio</span> muscle memory survives the language switch.',
		notes: `- Positron with R: plots pane, variables pane, console -- everything where you expect
- Switch to Python: same workspace, same panes, different language
- RStudio muscle memory survives the language switch`,
	},

	// ===== TURN: notebooks =====
	{
		section: 3,
		variant: 'phrase',
		phrase: 'And then there are <em>notebooks</em>.',
		context: 'Code, prose, and output -- one document, no switching. That\'s the promise. It\'s a good promise.',
		notes: `- Notebooks: purest expression of the all-in-one idea
- Code, prose, output in one document -- no switching, no context loss
- Good promise, but in practice you still leave constantly`,
	},

	// ===== THE NOTEBOOK COMPROMISE =====
	{
		section: 3,
		variant: 'list',
		cols: 1,
		heading: 'The notebook <em>compromise</em>.',
		items: [
			{ title: 'Inspect your data?', body: 'Leave the notebook, open pgAdmin or DBeaver, come back.' },
			{ title: 'Check a variable?', body: 'Print it in a throwaway cell. Now your notebook is cluttered with scaffolding that isn\'t the work.' },
			{ title: 'Need syntax help?', body: 'Open the browser, find the docs page, translate the answer back.' },
		],
		closing: 'The all-in-one promise -- broken by leaving, or polluted by workarounds.',
		notes: `- Inspect data? Leave to pgAdmin or DBeaver
- Check a variable? Add print cells that clutter the notebook
- Need syntax help? Leave to the browser
- All-in-one promise broken by leaving, or polluted by workarounds`,
	},

	// ===== DATA EXPLORER =====
	{
		section: 3,
		variant: 'show',
		heading: '<em>Data Explorer</em>.',
		image: './images/notebook-data-explorer.png',
		caption: 'Inspect a dataframe without leaving. Sort, filter, explore -- right there.',
		notes: `- Inspect a dataframe without leaving the notebook
- Sort, filter, explore -- right there
- No more switching to pgAdmin or DBeaver`,
	},

	// ===== VARIABLES PANE =====
	{
		section: 3,
		variant: 'show',
		heading: '<em>Variables Pane</em>.',
		image: './images/notebook-variables-pane.png',
		caption: 'Session state at a glance. No print statements, no throwaway cells.',
		notes: `- Session state at a glance
- No more printing a variable just to check it
- Always up to date while you keep working`,
	},

	// ===== POSITRON ASSISTANT =====
	{
		section: 3,
		variant: 'show',
		heading: '<em>Assistant</em>, in context.',
		image: './images/notebook-assistant-pane.png',
		caption: 'Your full session as context. No copy-pasting into a separate chat window.',
		notes: `- No copy-pasting code into a separate chat window
- Assistant sees your session -- variables, data, notebook
- Answers in context because it has context
- The copy/paste/translate loop is gone`,
	},

	// ===== SHOW: never leave the notebook =====
	{
		section: 3,
		variant: 'show',
		heading: 'Everything, <em>right here</em>.',
		video: './images/notebook-walkthrough.mp4',
		caption: 'The notebook as it should be: everything in one place, nothing in the way.',
		notes: `- All pieces working together: run a cell, data explorer, check variable, ask assistant
- Everything right here -- the notebook as it should be`,
	},

	// ===== YOUR FORMAT, YOUR CHOICE =====
	{
		section: 3,
		variant: 'split',
		heading: 'Your format, <em>your choice</em>.',
		columns: [
			{
				tag: '.ipynb',
				title: 'Jupyter notebooks.',
				body: 'A best-in-class notebook editor with Data Explorer, variables, and Assistant built in.',
				blue: true,
				image: './images/jupyter-notebook.png',
			},
			{
				tag: '.qmd',
				title: 'Quarto documents.',
				body: 'Inline execution inside your Quarto document. The most upvoted feature request in Positron history, now shipped.',
				image: './images/quarto-notebook.png',
			},
		],
		caption: 'Work in cross-language teams <em>without switching tools</em>.',
		notes: `- Best-in-class experience for whichever format you use
- Jupyter: full Positron experience -- Data Explorer, variables, Assistant
- Quarto: inline execution -- the most upvoted issue in Positron's history, now shipped
- Both formats share the same tools`,
	},


	// ===== WHAT'S COMING =====
	{
		section: 4,
		variant: 'list',
		cols: 1,
		icon: 'update',
		heading: "What's <em>coming</em>.",
		items: [
			{ title: 'SQL, first-class', body: 'Query a database without leaving the dataframe-shaped workflow. Fewer data-source switches.' },
			{ title: 'Visualization tools, in place', body: 'Build and tune plots inside the notebook, the Quarto doc, the Data Explorer. Fewer workflow switches.', gif: 'placeholder-viz-tools.gif' },
			{ title: 'AI where it needs to be', body: "Assistant capabilities show up in the place you're already working. Fewer context switches.", gif: './images/notebook-ghost-cells.png' },
		],
		closing: 'A pattern: every one of these is about removing a <em>switch</em>.',
		notes: `- SQL, first-class: query without leaving the dataframe workflow
- Visualization tools, in place: build and tune plots right where you're working
- AI where it needs to be: assistant capabilities in context, not a separate window
- Pattern: every one is about removing a switch`,
	},

	// ===== CALLBACK =====
	{
		section: 4,
		variant: 'title',
		eyebrow: 'The Why',
		heading: 'Without<br />Constraints',
		subtitle: 'The work changes shape. Your tools should stay with you.',
		notes: `- Data science without constraints
- The work has real constraints (data, methods, questions) -- tools shouldn't add more
- Work changes shape; tools should stay with you`,
	},

	// ===== THANKS / Q&A =====
	{
		section: 4,
		variant: 'thanks',
		word: 'Thank <em>you</em>.',
		qaLine: 'Questions, please.',
		links: [
			{ label: 'positron', value: 'positron.posit.co' },
			{ label: 'github', value: 'github.com/posit-dev/positron' },
			{ label: 'email', value: 'nick.strayer@posit.co' },
			{ label: 'website', value: 'nickstrayer.me' },
		],
		notes: `- Thank you.
- I'd love to take questions. The links are up here if you want to try Positron or get in touch.`,
	},
];
