import { colorConstants } from '../../constants/ColorsConstants';

type PageHeadingType = {
    firstTitle: string;
    lastTitle: string;
};

const PageHeading = (props: PageHeadingType) => {
    return (
        <div
            className={`${colorConstants.primatyTextColor} flex capitalize font-korona_one lg:text-4xl text-3xl lg:my-4`}
        >
            {props.firstTitle}
            <div
                className={`${colorConstants.activeTextColor} mx-2 lg:mx-3 border-b-4 ${colorConstants.activeBorderColor}`}
            >
                {props.lastTitle}
            </div>
        </div>
    );
};
export default PageHeading;
