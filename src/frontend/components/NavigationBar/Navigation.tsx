import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import { colorConstants } from "../../constants/ColorsConstants";
import { navigationPathConstants } from "../../constants/PathConstants";


const navigationBarCssStyle = `w-full h-max backdrop-blur-sm sticky top-0 justify-between gap-24 items-center flex start-0 z-50 px-6 lg:px-12 py-2`;

const navigationCssStyle = "flexjustify-around items-center hidden lg:block"

const navigationItemCssStyle = `${colorConstants.primatyTextColor} p-2 lg:text-xl lg:mx-2 capitalize hover:text-white`;

const Navigation = () => {
  return (
    <nav className={`${navigationBarCssStyle}`}>

      <ul className={`${navigationCssStyle}`}>
      {navigationPathConstants.map((path) => (
        <NavLink
          key={path.name}
          to={path.path}
          className={`${navigationItemCssStyle}`}
        >
          {path.name}
        </NavLink>
      ))};
      </ul>

      <Logo/>

      <div className={`flex`}>
      </div>
    </nav>
  );
};

export default Navigation;
