import { screenSizeConstants } from '../../constants/SizeConstants';
import Card from '../../components/Cards/ProjectsCard';
const LeftProjects: React.FC = () => {
    return (
        <div className={`${screenSizeConstants.subScreenSize}`}>
            <div
                className={`grid lg:grid-cols-2 gap-4 lg:max-h-[34rem] overflow-hidden overflow-y-scroll snap-y snap-mandatory`}
            >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default LeftProjects;
