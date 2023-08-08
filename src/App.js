import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

export const PROJECTS = [
    {
        name: "StockBot",
        languages: ["python", "SQL"],
        libraries: ["bs4", "selenium", "pyodbc"],
        finished: false,
        link: "https://github.com/sam-schmitz/sam-schmitz.github.io",
        description: "Uses bs4 and selenium to web-scrape stock trades made by members of congress. These stocks are then placed into a SQL server for analysis"
    },
    {
        name: "tic-tac-toe",
        languages: ["javaScript", "HTML", "CSS"],
        libraries: ["Node.js", "React.js"],
        finished: true,
        link: "https://github.com/sam-schmitz/Tic-Tac-Toe",
        description: "A basic use of React that functions as a Tic-Tac-Toe game. Keeps a history of moves made and can move backwards along the history. "
    },
    {
        name: "produce",
        languages: ["javaScript", "HTML", "CSS"],
        libraries: ["Node.js", "React.js"],
        finished: true,
        link: "https://github.com/sam-schmitz/produce",
        description: "Uses React to create a table of Produce avaliable. Produce can be filtered using a search bar"
    },
    {
        name: "Portfolio Website",
        languages: ["javaScript", "HTML", "CSS"],
        libraries: ["Node.js", "React.js"],
        finished: false,
        link: "https://github.com/sam-schmitz/sam-schmitz.github.io",
        description: "Uses a React app to display my portfolio. Has a searchable table with expandable rows."
    }
];

function ExpandedProject({ activeProject }) {
    //make the Github Link an active link
    if (activeProject == 'None') {
        return (
            <div>
                <p>Select a project to learn more</p>
            </div>
        );
    } else {
        return (
            <div>
                <h5>{activeProject.name}</h5>
                <p><b>Languages: </b>{activeProject.languages.join(', ')}</p>
                <p><b>Libraries: </b>{activeProject.libraries.join(', ')}</p>
                <p><b>Decription: </b>{activeProject.description}</p>
                <p><b>Github Link: </b><a href={activeProject.link}>{activeProject.link}</a></p>
            </div>
        );
    }
}

function ProjectRow({ project, active, onActiveProjectChange }) {
    const name = project.finished ? project.name :
        <span style={{ color: 'red' }}>
            {project.name}
        </span>;

    const c = "";
    if (active) {
        const c = "table-active";
    }

    return (
        <tr class={c}>
            <td>
                <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => onActiveProjectChange(project)}
                />
            </td>
            <td>{name}</td>
            <td>{project.languages.join(', ')}</td>
            <td>{project.libraries.join(', ')}</td>
        </tr>
        );
}

function ProjectTable({ projects, filterText, finishedOnly, activeProject, setActiveProject }) {
    const rows = [];

    projects.forEach((project) => {
        if (
            project.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
        ) {
            return;
        }
        if (finishedOnly && !project.finished) {
            return;
        }
        rows.push(
            <ProjectRow
                project={project}
                key={project.name}
                active={project == activeProject}
                onActiveProjectChange={setActiveProject}
            />
        );
    });

    return (
        <table class="text-center table table-dark table-hover table-striped">
            <thead>
                <tr>
                    <th />
                    <th>Name</th>
                    <th>Languages</th>
                    <th>Libraries</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({ filterText, finishedOnly, onFilterTextChange, onFinishedOnlyChange }) {
    return (
        <form>
            <input
                type="text"
                value={filterText} placeholders="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)} />
            {'  '}
            <label>
                <input
                    type="checkbox"
                    checked={finishedOnly}
                    onChange={(e) => onFinishedOnlyChange(e.target.checked)} />
                {' '}
                Only show finished projects
            </label>
        </form>
    );
}

function FilterableProjectTable({ projects, activeProject, setActiveProject }) {
    const [filterText, setFilterText] = useState('');
    const [finishedOnly, setFinishedOnly] = useState(false);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                finishedOnly={finishedOnly}
                onFilterTextChange={setFilterText}
                onFinishedOnlyChange={setFinishedOnly} />
            <ProjectTable
                projects={projects}
                filterText={filterText}
                finishedOnly={finishedOnly}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
            />
        </div>
        );
}

function Header() {
    return (
        <div class="text-light">
            <h1>Portfolio</h1>
            <hr></hr>
        </div>
    );
}

function Body() {
    const [activeProject, setActiveProject] = useState('None');

    return (
        <div>
            <div class="row text-light">
                <h3>Projects</h3>
            </div>
            <div class='row text-light'>
                <div class="col-md-6">
                    <FilterableProjectTable
                        projects={PROJECTS}
                        activeProject={activeProject}
                        setActiveProject={setActiveProject} />
                </div>
                <div class="col-md-6">
                    <ExpandedProject
                        activeProject={activeProject} />
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div class="container-fluid bg-dark p-3 min-vh-100">
            <Header />
            <Body />
        </div>
    );
}

export default App;
