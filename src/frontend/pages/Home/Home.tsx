import ShadowButton from "../../components/button/Shadow-Button";

const Home = () => {
    return (
        <div className="max-w-scree bg-white dark:bg-slate-900 h-screen lg:relative flex items-center justify-center overflow-hidden">
            <div className="absolute w-full lg:h-full"></div>
            <div
                className="container mx-auto absolute top-1/6 z-10 text-center"
                data-aos="fade-up"
            >
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full">
                        <div className="mx-auto mb-[60px] max-w-[850px]">
                            <span
                                className="text-primary text-black dark:text-white mb-2 lg:mb-4 block text-lg lg:text-2xl font-semibold tracking-wide uppercase"
                                data-aos="fade-left"
                            >
                                मेरा Portfolio
                            </span>
                            <h2
                                className="h-20 text-black dark:text-white font-extrabold font-Bebas-neue text-6xl px-4 lg:px-0 lg:text-6xl transform transition-transform duration-700 ease-out overflow-hidden border-r-2 whitespace-nowrap tracking-widest animate-typing"
                                // data-aos="fade-right"
                                // data-aos-duration="1000"
                                // data-aos-easing="ease-in-out"
                            >
                                Mradul Kumar Katiyar
                            </h2>

                            <p
                                className="dark:text-gray-300 text-slate-700 px-12 lg:px-0 lg:text-2xl font-Roboto"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                ✨ Explore a world of creativity, innovation,
                                and expertise! 🚀 Each project reflects passion
                                and cutting-edge ideas 🌐🎨. From bold solutions
                                💡 to unique designs 🎥, we aim to inspire and
                                ignite imaginations 🔥.Let’s shape a brighter,
                                innovative tomorrow together.🌟 Dive in and
                                discover the magic! ✨
                            </p>
                        </div>
                        <div
                            className="flex justify-center gap-5"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <ShadowButton text="About Us" />
                            <ShadowButton text="Contact Us" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
