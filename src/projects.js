﻿import React, { useState } from 'react';

function ExpandedProject({ activeProject }) {
    //make the Github Link an active link
    if (activeProject == 'None') {
        return (
            <div>
                <p>Select a project to learn more</p>
            </div>
        );
    } else {
        let site = '';
        if (activeProject.siteLink !== 'None') {
            site = <p><b>Site Link: </b><a href={activeProject.siteLink}>{activeProject.siteLink}</a></p>
        }
        return (
            <div>
                <h5>{activeProject.name}</h5>
                <p><b>Languages: </b>{activeProject.languages.join(', ')}</p>
                <p><b>Libraries: </b>{activeProject.libraries.join(', ')}</p>
                <p><b>Decription: </b>{activeProject.description}</p>
                <p><b>Github Link: </b><a href={activeProject.link}>{activeProject.link}</a></p>
                {site}
            </div>
        );
    }
}

function ProjectRow({ project, active, onActiveProjectChange }) {
    const name = project.finished ? project.name :
        <span style={{ color: 'red' }}>
            {project.name}
        </span>;

    let c = "";
    if (active) {
        c += "table-active";
    }

    return (
        <tr class={c} onClick={(e) => onActiveProjectChange(project)}>
            <td>{name}</td>
            <td>{project.languages.join(', ')}</td>
            <td>{project.libraries.join(', ')}</td>
        </tr>
    );
}

function ProjectTable({ projects, filterText, finishedOnly, activeProject, setActiveProject, filterTag }) {
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
        if (!project.tags.includes(filterTag) && filterTag != "") {
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
        <form class="my-1">
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

function newTag(tagValue, filterTag, onFilterTagChange) {
    if (filterTag == tagValue) {
        onFilterTagChange("")
    } else {
        onFilterTagChange(tagValue)
    }
}

function SearchTags({ filterTag, onFilterTagChange }) {
    const tags = ["school", "front-end", "javaScript", "python"];
    const display = []
    tags.forEach((tag) => {
        let c = "btn me-1 ";
        if (filterTag === tag) {
            c += "text-light bg-dark "
        } else {
            c += "text-dark bg-light "
        }
        display.push(
            <button
                type="button"
                class={c}
                value={tag}
                onClick={(e) => newTag(e.target.value, filterTag, onFilterTagChange)}
            >
                {tag}
            </button>
        );
    })
    return (
        <div class="my-1">
            {display}
        </div>
    );
}

function FilterableProjectTable({ projects, activeProject, setActiveProject }) {
    const [filterText, setFilterText] = useState('');
    const [finishedOnly, setFinishedOnly] = useState(false);
    const [filterTag, setFilterTag] = useState('');

    return (
        <div>
            <SearchBar
                filterText={filterText}
                finishedOnly={finishedOnly}
                onFilterTextChange={setFilterText}
                onFinishedOnlyChange={setFinishedOnly} />
            <SearchTags
                filterTag={filterTag}
                onFilterTagChange={setFilterTag}
            />
            <ProjectTable
                projects={projects}
                filterText={filterText}
                finishedOnly={finishedOnly}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                filterTag={filterTag}
            />
        </div>
    );
}

function ProjectsTab() {
    const [activeProject, setActiveProject] = useState('None');
    const PROJECTS = require('./projects.json').projects;

    return (
        <div class="projects">
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

export default ProjectsTab;

