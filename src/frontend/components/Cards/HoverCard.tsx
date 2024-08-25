import { useRef } from 'react';
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from 'framer-motion';

// const HoverTitleCard = () => {
//   return (
//     <div className="grid w-full place-content-center">
//       <TiltCard />
//     </div>
//   );
// };

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

type PropsType = {
    link: string;
};

const TiltCard = (props: PropsType) => {
    const ref: any = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (events: React.MouseEvent) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (events.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (events.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                transform,
            }}
            className="relative flex justify-center items-center lg:h-96 h-[23rem] lg:w-72 w-full rounded-xl bg-transparent"
        >
            <div
                style={{
                    transform: 'translateZ(75px)',
                    transformStyle: 'preserve-3d',
                }}
                className="absolute grid place-content-center rounded-xl bg-transparent shadow-lg"
            >
                <img src={props.link} alt="" className="w-full rounded-2xl" />
            </div>
        </motion.div>
    );
};

export default TiltCard;
