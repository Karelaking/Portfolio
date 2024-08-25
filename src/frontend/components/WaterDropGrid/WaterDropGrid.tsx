import anime from 'animejs';
import React from 'react';

const WaterDropGrid: React.FC = () => {
    return (
        <div className="absolute top-16 -z-10 left-5">
            <div className="w-full h-full grid place-content-center overflow-x-hidden px-8 py-12">
                <DotGrid />
            </div>
        </div>
    );
};

const GRID_WIDTH = 19;
const GRID_HEIGHT = 12;

const DotGrid: React.FC = () => {
    const handleDotClick = (e: any) => {
        anime({
            targets: '.dot-point',
            scale: [
                { value: 1.35, easing: 'easeOutSine', duration: 250 },
                { value: 1, easing: 'easeInOutQuad', duration: 500 },
            ],
            translateY: [
                { value: -15, easing: 'easeOutSine', duration: 250 },
                { value: 0, easing: 'easeInOutQuad', duration: 500 },
            ],
            opacity: [
                { value: 1, easing: 'easeOutSine', duration: 250 },
                { value: 0.5, easing: 'easeInOutQuad', duration: 500 },
            ],
            delay: anime.stagger(100, {
                grid: [GRID_WIDTH, GRID_HEIGHT],
                from: e.target.dataset.index,
            }),
        });
    };

    const dots = [];
    let index = 0;

    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            dots.push(
                <div
                    className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
                    data-index={index}
                    key={`${i}-${j}`}
                >
                    <div
                        className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
                        data-index={index}
                    />
                </div>,
            );
            index++;
        }
    }

    return (
        <div
            onClick={handleDotClick}
            style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
            className="grid w-fit"
        >
            {dots}
        </div>
    );
};

export default WaterDropGrid;
