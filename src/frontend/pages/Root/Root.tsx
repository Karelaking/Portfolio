// import { useEffect } from "react";
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/NavigationBar/Navigation';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import Experience from '../Experience/Experience';
import Home from '../Home/Home';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Signin from '../SignIn/SignIn';

// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   if (isLoading) return
// }, [isLoading]);

const Root: React.FC = () => {
    return (
        <main className="w-full min-h-screen overflow-scroll relative scroll-smooth">
            <Navigation />
            <Home />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contacts />
            <Signin />
            <Footer />
        </main>
    );
};

export default Root;
