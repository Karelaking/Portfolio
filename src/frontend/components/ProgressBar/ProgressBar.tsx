type ProgressBarType = {
    persentage: String;
};

const ProgressBar = (props: ProgressBarType) => {
    return (
        <div className="mb-8">
            <div className="bg-stroke dark:bg-dark-3 relative h-4 w-full rounded-2xl">
                <div className="bg-primary absolute top-0 left-0 flex h-full w-1/2 items-center justify-center rounded-2xl text-xs font-semibold text-white">
                    {props.persentage}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
