interface textProps {
    text: string;
}

const ShadowButton = ({ text }: textProps) => {
    return (
        <a
            className="shadow-button px-6 py-3 border-2 border-black dark:border-slate-200 text-black dark:text-white dark:hover:text-black rounded-sm font-semibold hover:bg-gray-100 transition-all"
            href="#contact"
        >
            {text}
        </a>
    );
};

export default ShadowButton;
