import { colorConstants } from '../../constants/ColorsConstants';
import { fotterConstants } from '../../constants/StringConstants';

const Footer = () => {
    return (
        <div
            className={`${colorConstants.primaryBackgroundColor} w-full lg:h-48 flex items-end justify-center py-7`}
        >
            <div
                className={`${colorConstants.hoverPrimaryTextColor} text-xl capitalize font-comfortaa`}
            >
                {fotterConstants.copyrightText}
            </div>
        </div>
    );
};

export default Footer;
