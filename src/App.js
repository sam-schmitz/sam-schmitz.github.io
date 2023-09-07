import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ProjectsTab from './projects.js';
import AboutMeTab from './aboutMe.js';

function TabButtons({activeTab, onActiveTabChange}) {
    const tabs = ['Projects', 'About Me']
    const display = []
    tabs.forEach((tab) => {
        let c = "btn me-1 "
        if (activeTab === tab) { c += "text-light bg-dark " }
        else { c += "text-dark bg-light " }
        display.push(
            <button
                type="button"
                class={c}
                value={tab}
                onClick={(e) => onActiveTabChange(e.target.value)}
            >
                {tab}
            </button>
        );
    });
    return (
        <div class="">
            {display}
        </div>
    );
}

function Header() {
    return (
        <div class="text-light">
            <h1>Portfolio: Sam Schmitz</h1>
            <hr></hr>
        </div>
    );
}

function Body() {
    const [activeTab, setActiveTab] = useState('Projects');
    const display = []
    if (activeTab === 'Projects') { display.push(<ProjectsTab />) }
    else {display.push(<AboutMeTab />)}
    return (
        <div class="text-light">
            <div class="row">
                <TabButtons
                    activeTab={activeTab}
                    onActiveTabChange={setActiveTab}
                />
            </div>
            <hr></hr>
            {display}
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
