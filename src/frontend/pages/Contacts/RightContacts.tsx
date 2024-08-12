import PageHeading from "../../components/Headings/PageHeading";
import { colorConstants } from "../../constants/ColorsConstants";
import { screenSizeConstants } from "../../constants/SizeConstants"
import { constactsPageConstants } from "../../constants/StringConstants";

const RightContacts = () => {
    return <div className={`${screenSizeConstants.subScreenSize} flex-col items-center justify-center`}>
        <PageHeading firstTitle={constactsPageConstants.titleFirst} lastTitle={constactsPageConstants.titleSecond}/>
        <div className={`${screenSizeConstants.pageTextContentSize}`}>{constactsPageConstants.contactText}</div>
    </div>
}

export default RightContacts;
