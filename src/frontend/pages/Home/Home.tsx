import {homePageConstants} from '../../constants/StringConstants';
import { screenSizeConstants } from '../../constants/SizeConstants';

const Home = () => {
  return <section className={`${screenSizeConstants.mainScreenSize}`}>{homePageConstants.heroTitle}</section>;
}

export default Home
