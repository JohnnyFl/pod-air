'use client'
import { useState } from 'react'

export default function CheckoutContent() {
    const [activeButton, setActiveButton] = useState<number>(1)
    return (
        <div className="grid grid-cols-2">
            <div className="p-4 w-full">
                <div className="flex w-full">
                    <div className="flex w-full bg-gray-100 hover:bg-gray-100 rounded-lg transition p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600">
                        <nav
                            className="flex gap-x-1 w-full"
                            aria-label="Tabs"
                            role="tablist"
                            aria-orientation="horizontal"
                        >
                            <button
                                type="button"
                                className="hs-tab-active:bg-white w-1/2 justify-center cursor-pointer font-semibold hs-tab-active:text-gray-700 hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-2 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-hidden focus:text-gray-700 rounded-lg  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white"
                                id="segment-item-1"
                                aria-selected="true"
                                data-hs-tab="#segment-1"
                                aria-controls="segment-1"
                                name="Pay by Card"
                                // onClick={() => setActiveButton(1)}
                                role="tab"
                            >
                                Pay by Card
                            </button>
                            <button
                                type="button"
                                className="hs-tab-active:bg-white justify-center cursor-pointer w-1/2 hs-tab-active:text-gray-700 hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-2 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-hidden focus:text-gray-700 font-medium rounded-lg  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white"
                                id="segment-item-2"
                                aria-selected="false"
                                data-hs-tab="#segment-2"
                                aria-controls="segment-2"
                                // onClick={() => setActiveButton(2)}
                                name="Pay with PayPal"
                                role="tab"
                            >
                                <svg
                                    className="size-4"
                                    width="33"
                                    height="32"
                                    viewBox="0 0 33 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.6424 30.9152L11.197 27.3925L9.96162 27.3639H4.06256L8.16211 1.37005C8.17431 1.29063 8.21465 1.21823 8.27577 1.16607C8.33689 1.1139 8.41472 1.08543 8.49508 1.08586H18.4417C21.7438 1.08586 24.0227 1.773 25.2124 3.12927C25.7702 3.76551 26.1255 4.43039 26.2972 5.16208C26.4775 5.92981 26.4807 6.84707 26.3047 7.9658L26.2919 8.04745V8.76429L26.8497 9.08029C27.2755 9.29602 27.6583 9.58784 27.979 9.94134C28.4562 10.4853 28.7648 11.1767 28.8952 11.9964C29.0299 12.8394 28.9854 13.8426 28.7648 14.9783C28.5103 16.2847 28.0989 17.4225 27.5432 18.3536C27.053 19.1876 26.3938 19.91 25.608 20.4744C24.8699 20.9982 23.993 21.3959 23.0015 21.6504C22.0408 21.9007 20.9454 22.0268 19.7439 22.0268H18.9698C18.4163 22.0268 17.8786 22.2262 17.4566 22.5836C17.0352 22.9447 16.7556 23.4438 16.6677 23.9918L16.6093 24.3088L15.6295 30.5175L15.585 30.7455C15.5733 30.8176 15.5532 30.8537 15.5235 30.8781C15.4947 30.9016 15.4588 30.9147 15.4217 30.9152H10.6424Z"
                                        fill="#253B80"
                                    ></path>
                                    <path
                                        d="M27.3778 8.13017C27.3481 8.31998 27.3142 8.51403 27.276 8.71339C25.9643 15.4481 21.4766 17.7746 15.7451 17.7746H12.8268C12.1259 17.7746 11.5352 18.2836 11.426 18.975L9.93191 28.4508L9.5088 31.1368C9.49195 31.2434 9.49838 31.3523 9.52767 31.4561C9.55695 31.5599 9.60838 31.6562 9.67842 31.7382C9.74846 31.8202 9.83545 31.8861 9.9334 31.9313C10.0313 31.9765 10.1379 31.9999 10.2458 32H15.4217C16.0346 32 16.5552 31.5546 16.6517 30.9502L16.7026 30.6872L17.6771 24.5029L17.7397 24.1636C17.8351 23.557 18.3569 23.1116 18.9698 23.1116H19.7439C24.7586 23.1116 28.6842 21.0757 29.8316 15.184C30.3109 12.7228 30.0627 10.6677 28.7945 9.22239C28.3925 8.77528 27.9124 8.40516 27.3778 8.13017Z"
                                        fill="#179BD7"
                                    ></path>
                                    <path
                                        d="M26.0056 7.58299C25.5868 7.46183 25.1607 7.36727 24.7299 7.29986C23.8788 7.16905 23.0185 7.10629 22.1574 7.11217H14.3612C14.0645 7.11194 13.7776 7.21787 13.5521 7.41079C13.3267 7.60372 13.1778 7.87092 13.1322 8.1641L11.4737 18.6685L11.426 18.975C11.4777 18.6406 11.6473 18.3357 11.9043 18.1155C12.1612 17.8954 12.4885 17.7744 12.8268 17.7746H15.7451C21.4766 17.7746 25.9642 15.447 27.276 8.71339C27.3152 8.51403 27.3481 8.31998 27.3778 8.13017C27.0316 7.94865 26.6709 7.79648 26.2993 7.67525C26.2019 7.64293 26.104 7.61217 26.0056 7.58299Z"
                                        fill="#222D65"
                                    ></path>
                                    <path
                                        d="M13.1321 8.1641C13.1773 7.87084 13.3262 7.60351 13.5517 7.41068C13.7772 7.21785 14.0644 7.11231 14.3611 7.11323H22.1573C23.0809 7.11323 23.943 7.17368 24.7298 7.30092C25.2623 7.3846 25.7874 7.50976 26.3003 7.67525C26.6874 7.80356 27.0468 7.9552 27.3787 8.13017C27.769 5.64138 27.3756 3.94685 26.0299 2.41243C24.5464 0.7232 21.8688 0 18.4427 0H8.49601C7.79614 0 7.19913 0.508997 7.09097 1.20144L2.94795 27.4625C2.92865 27.5844 2.93599 27.7091 2.96947 27.8279C3.00294 27.9467 3.06176 28.0569 3.14187 28.1508C3.22198 28.2447 3.32149 28.3202 3.43354 28.3719C3.54559 28.4237 3.66753 28.4506 3.79097 28.4508H9.93181L11.4736 18.6685L13.1321 8.1641Z"
                                        fill="#253B80"
                                    ></path>
                                </svg>
                                Pay with PayPal
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-3">
                    <div
                        id="segment-1"
                        role="tabpanel"
                        aria-labelledby="segment-item-1"
                    >
                        <div className="max-w-sm space-y-3">
                            <input
                                type="text"
                                className="py-2.5 border-1 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                placeholder="E-mail"
                            />
                        </div>
                        <select className="py-3 cursor-pointer mt-2 px-4 pe-9 border-1 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                            <option className="text-gray-200">Country</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div
                        id="segment-2"
                        className="hidden"
                        role="tabpanel"
                        aria-labelledby="segment-item-2"
                    >
                        <p className="text-gray-500 dark:text-neutral-400">
                            This is the{' '}
                            <em className="font-semibold text-gray-800 dark:text-neutral-200">
                                second
                            </em>{' '}
                            item's tab body.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 p-4">2</div>
        </div>
    )
}
