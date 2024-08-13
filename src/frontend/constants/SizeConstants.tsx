import { colorConstants } from "./ColorsConstants";

const screenSizeConstants = {
    mainScreenSize:`w-full min-h-screen lg:pt-12 h-max max-h-full flex-col lg:flex-row flex justify-center items-center px-2 lg:px-12 ${colorConstants.primaryBackgroundColor}`,
    subScreenSize:"w-full lg:w-1/2 flex justify-center items-center h-full",
    pageTextContentSize:`w-full flex text-center lg:mx-4 my-4 ${colorConstants.primatyTextColor} font-comfortaa font-bold lg:text-xl text-md px-4`
};

export {screenSizeConstants};
