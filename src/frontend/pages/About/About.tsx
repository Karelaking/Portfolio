import { PageTitle } from '../../components/title/PageTitle';

const About = () => {
    return (
        <section
            className="w-screen flex flex-col items-center h-full lg:h-screen"
            id="about"
        >
            {/* <PageTitle title="About" /> */}
            <div className="mx-auto lg:px-24 px-8">
                {/* Page Title */}
                <div data-aos="fade-down">
                    <PageTitle title="👋 About Me" />
                </div>

                {/* Heading */}
                <h1
                    className="lg:text-6xl ml-6 text-4xl font-bold lg:pb-10 pb-4 lg:mt-20 text-gray-900"
                    data-aos="fade-up"
                >
                    👩‍💻 Mradul Kumar Katiyar
                </h1>

                {/* Short Intro */}
                <p
                    className="font-semibold lg:text-2xl lg:px-8 text-gray-700 flex items-center gap-2 lg:pb-8 pb-4"
                    data-aos="fade-right"
                >
                    👨‍🎓 Computer Science Student &nbsp;|| &nbsp;🐍 Python
                    Developer &nbsp;|| &nbsp;🔙 Backend Developer &nbsp;||
                    &nbsp;🌐 Web Dev Enthusiast
                </p>

                {/* About Text */}
                <p
                    className="font-normal lg:text-3xl lg:px-8 mb-12  font-Roboto text-gray-600"
                    data-aos="fade-left"
                >
                    🌟 Passionate Programmer | Tech Explorer | Lifelong Learner
                    Namaste! <br />
                    <br />
                    🙏 I’m a programming enthusiast with a love for discovering
                    new tech. 💻🌐 I’m always eager to learn, dive into
                    projects, and grow my skills with each challenge! 📈✨
                    <br />
                    <br />
                    💬 I believe in Jugaad—creative problem-solving—and enjoy
                    connecting with people from different backgrounds. My strong
                    communication skills and friendly approach help me
                    collaborate effectively, bringing out the best in team
                    projects. 🚀
                    <br />
                    <br />
                    Guided by discipline and focus, I stay committed to my
                    goals, continuously working on personal and professional
                    growth. 📚💪
                    <br />
                    <br />
                    Let’s connect and explore the tech world together! 🌍👥
                </p>
            </div>
        </section>
    );
};

export default About;
