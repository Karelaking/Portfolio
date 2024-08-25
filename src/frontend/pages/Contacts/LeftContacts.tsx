'use client';

import React, { useState } from 'react';
import { Field, Label, Switch } from '@headlessui/react';
import { colorConstants } from '../../constants/ColorsConstants';
import { screenSizeConstants } from '../../constants/SizeConstants';

const LeftContacts: React.FC = () => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div
            className={`${colorConstants.primaryBackgroundColor} items-center justify-center order-2 lg:order-1 ${screenSizeConstants.subScreenSize}`}
        >
            <form
                action="#"
                method="POST"
                className="w-full lg:pr-20 lg:pl-0 px-2 mt-12 max-w-xl sm:mt-9"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="first-name"
                            className={`block text-sm font-semibold leading-6 ${colorConstants.primatyTextColor} font-comfortaa`}
                        >
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="last-name"
                            className={`block text-sm font-semibold leading-6 ${colorConstants.primatyTextColor} font-comfortaa`}
                        >
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="email"
                            className={`block text-sm font-semibold leading-6 ${colorConstants.primatyTextColor} font-comfortaa`}
                        >
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className={`block text-sm font-semibold leading-7 ${colorConstants.primatyTextColor}`}
                        >
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={10}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                    <Field className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                            >
                                <span className="sr-only">
                                    Agree to policies
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                                />
                            </Switch>
                        </div>
                        <Label className="text-sm leading-6 text-gray-600">
                            By selecting this, you agree to our{' '}
                            <a
                                href="#"
                                className={`font-semibold ${colorConstants.activeTextColor}`}
                            >
                                privacy&nbsp;policy
                            </a>
                            .
                        </Label>
                    </Field>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className={`block w-full rounded-md ${colorConstants.activeBackgroundColor} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${colorConstants.hoverActiveBackgroundColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                    >
                        Let's talk
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LeftContacts;
