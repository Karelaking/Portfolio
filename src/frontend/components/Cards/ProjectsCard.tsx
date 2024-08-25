import { colorConstants } from '../../constants/ColorsConstants';

const Card = () => {
    return (
        <SingleCard
            image="https://i.ibb.co/dL9fH7N/image-03-1.jpg"
            CardTitle="The ultimate UX and UI guide to card design"
            CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
            Button="View Details"
        />
    );
};

export default Card;

type CardType = {
    image: string;
    CardTitle: string;
    titleHref?: string;
    btnHref?: string;
    CardDescription: string;
    Button?: string;
};

const SingleCard = ({
    image,
    Button,
    CardDescription,
    CardTitle,
    titleHref,
    btnHref,
}: CardType) => {
    return (
        <div
            className={`mb-10 ${colorConstants.secondaryBackgroundColor} snap-start overflow-hidden rounded-lg shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3`}
        >
            <img src={image} alt="" className="w-full" />
            <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                <h3>
                    <a
                        href={titleHref ? titleHref : '/#'}
                        className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                        {CardTitle}
                    </a>
                </h3>
                <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                    {CardDescription}
                </p>

                {Button && (
                    <a
                        href={btnHref ? btnHref : '#'}
                        className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
                    >
                        {Button}
                    </a>
                )}
            </div>
        </div>
    );
};
