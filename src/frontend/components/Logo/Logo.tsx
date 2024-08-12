import { Link } from "react-router-dom"
import { logoConstants } from "../../constants/StringConstants";
import { colorConstants } from "../../constants/ColorsConstants";


const outerLogoCssStyle = `${colorConstants.primatyTextColor} font-lalezar uppercase text-3xl`;
const innerLogoCssStyle = `${colorConstants.activeTextColor} lg:mx-2`;

const Logo = () => {
  return <Link to="/" key="/">
    <span className={`${outerLogoCssStyle}`}>
        {logoConstants.firstPart}
        <span className={`${innerLogoCssStyle}`}>
            {logoConstants.lastPart}
        </span>
    </span>
  </Link>;
}

export default Logo
