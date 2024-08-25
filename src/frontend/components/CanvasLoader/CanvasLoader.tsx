import { Html, useProgress } from '@react-three/drei';

const CanvasLoader = () => {
    const { progress } = useProgress();
    return (
        <Html
            //   as='Canvas'
            center
            style={{
                display: 'flex',
                backgroundColor: 'transparent',
                flexDirection: 'column',
            }}
        >
            <span className="canvas-loader"></span>
            <p
                style={{
                    fontSize: 14,
                    fontWeight: 800,
                    marginTop: 40,
                    color: 'GrayText',
                }}
            >
                {progress.toFixed(2)}%
            </p>
        </Html>
    );
};

export default CanvasLoader;
