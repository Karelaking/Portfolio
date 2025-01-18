interface skillCardProps {
    imgPath: string;
    skillName: string;
}

const SkillsCard = ({ imgPath, skillName }: skillCardProps) => {
    return (
        <div>
            <img src={imgPath} alt={skillName} />
            <h1>{skillName}</h1>
        </div>
    );
};

export default SkillsCard;
