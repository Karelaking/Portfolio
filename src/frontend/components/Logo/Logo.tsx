import { Link } from "react-router-dom"
import { logoConstants } from "../../constants/StringConstants";
import { colorConstants } from "../../constants/ColorsConstants";


const outerLogoCssStyle = `${colorConstants.primatyTextColor} font-lalezar p-0 m-0 uppercase flex justify-center lg:text-3xl text-xl`;
const innerLogoCssStyle = `${colorConstants.activeTextColor} lg:mx-2 p-0 m-0 flex justify-center`;

const Logo = () => {
  return <Link className={`flex flex-1`} to="/" key="/">
    <div className={`${outerLogoCssStyle}`}>
        {logoConstants.firstPart}
        <div className={`${innerLogoCssStyle}`}>
            {logoConstants.lastPart}
        </div>
    </div>
  </Link>;
}

export default Logo
