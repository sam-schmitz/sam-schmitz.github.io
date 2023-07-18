import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const PROJECTS = [
    { name: "StockBot", languages: ["python", "SQL"], libraries: ["bs4", "selenium", "pyodbc"], link: "https://github.com/sam-schmitz/sam-schmitz.github.io", finished: false },
    { name: "tic-tac-toe", languages: ["javaScript", "HTML", "CSS"], libraries: ["Node.js", "React.js"], link: "https://github.com/sam-schmitz/Tic-Tac-Toe", finished: true },
    { name: "produce", languages: ["javaScript", "HTML", "CSS"], libraries: ["Node.js", "React.js"], link: "https://github.com/sam-schmitz/produce", finished: true }
];

function ProjectRow({ project }) {
    const name = project.finished ? project.name :
        <span style={{ color: 'red' }}>
            {project.name}
        </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{project.languages}</td>
            <td>{project.libraries}</td>
        </tr>
        );
}

function ProjectTable({ projects, filterText, finishedOnly }) {
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
                key={project.name} />
        );
    });

    return (
        <table>
            <thead>
                <tr>
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

function FilterableProjectTable({ projects }) {
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
                finishedOnly={finishedOnly} />
        </div>
        );
}

function Header() {
    return;
}

function Body() {
    return <FilterableProjectTable projects={PROJECTS} />;
}

function App() {
  return (
    <Body />
  );
}

export default App;
