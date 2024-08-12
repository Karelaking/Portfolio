import {homePageConstants} from '../../constants/StringConstants';
import { screenSizeConstants } from '../../constants/SizeConstants';
import LeftHome from './LeftHome';
import RightHome from './RightHome';

const Home = () => {
  return <section className={`${screenSizeConstants.mainScreenSize}`}>
    <LeftHome/>
    <RightHome/>
  </section>;
}

export default Home
