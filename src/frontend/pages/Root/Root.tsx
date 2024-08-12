import About from "../About/About"
import Contacts from "../Contacts/Contacts"
import Home from "../Home/Home"
import Projects from "../Projects/Projects"
import Skills from "../Skills/Skills"

const Root = () => {
  return <main className="w-full overflow-scroll snap-mandatory h-screen scroll-smooth snap-y">
    <Home/>
    <About/>
    <Skills/>
    <Projects/>
    <Contacts/>
  </main> 
}

export default Root
