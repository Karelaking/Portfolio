import { Link } from 'react-router-dom';
import { colorConstants } from '../../constants/ColorsConstants';

type MediaIconsType = {
    link: string;
    svgIcon: React.ReactNode;
    key: string;
};

const MediaIcons = ({ link, svgIcon, key }: MediaIconsType) => {
    return (
        <div
            className={`flex rounded-full ${colorConstants.primaryBorderColor} hover:scale-125 duration-500 p-[0.05rem] bg-gradient-to-b dark:bg-gradient-to-br from-blue-300 to-pink-300 lg:size-[4.5rem] size-12 items-center justify-around rounded-full`}
        >
            <div
                className={`${colorConstants.secondaryBackgroundColor} w-full h-full rounded-full flex items-center justify-center`}
            >
                <Link key={key} to={link}>
                    {svgIcon}
                </Link>
            </div>
        </div>
    );
};

export default MediaIcons;
