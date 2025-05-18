export default function Test() {
    return (
        <div className="w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-2xl dark:bg-neutral-800">
            <div className="py-2.5 px-4 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
                <h3
                    id="hs-pro-dutprom-label"
                    className="font-medium text-gray-800 dark:text-neutral-200"
                >
                    <span className="inline-flex items-center gap-x-3">
                        <svg
                            className="w-8.5 h-7.5"
                            width="34"
                            height="30"
                            viewBox="0 0 34 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="7"
                                width="20"
                                height="20"
                                rx="10"
                                fill="currentColor"
                                className="fill-blue-200 dark:fill-blue-500"
                            />
                            <rect
                                y="10"
                                width="20"
                                height="20"
                                rx="10"
                                fill="currentColor"
                                className="fill-blue-300 dark:fill-blue-600"
                            />
                            <rect
                                x="14"
                                y="10"
                                width="20"
                                height="20"
                                rx="10"
                                fill="currentColor"
                                className="fill-blue-500 dark:fill-blue-700"
                            />
                        </svg>
                        Upgrade to PRO
                    </span>
                </h3>
                <button
                    type="button"
                    className="size-8 shrink-0 flex justify-center items-center gap-x-2 rounded-xs border border-black bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                    aria-label="Close"
                    data-hs-overlay="#hs-pro-dutprom"
                    aria-expanded="true"
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>

            {/* Modal Body Start */}
            <div
                id="hs-modal-upgrade-to-pro-body"
                className="overflow-y-auto dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
                <div className="grid md:grid-cols-2 md:gap-10">
                    {/* Left Column: Form Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-es-xl sm:rounded-es-none rounded-ee-none">
                        <form>
                            <div className="space-y-5">
                                <div
                                    id="payment-options"
                                    className="p-0.5 w-full inline-flex bg-gray-100 rounded-lg dark:bg-neutral-700"
                                >
                                    <label
                                        htmlFor="payment-options-by-card"
                                        className="relative w-full inline-flex justify-center py-2 px-4"
                                    >
                                        <input
                                            id="payment-options-by-card"
                                            name="payment-options"
                                            type="radio"
                                            className="peer absolute top-0 end-0 size-full border-black bg-black bg-none text-black rounded-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-md focus:outline-offset-0 checked:before:bg-white checked:before:shadow-2xs checked:bg-none outline-transparent focus:before:bg-gray-50 dark:checked:before:bg-neutral-800 dark:focus:before:bg-neutral-900 dark:focus:ring-offset-transparent"
                                            checked
                                        />
                                        <span className="relative z-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium text-gray-800 cursor-pointer peer-disabled:cursor-default dark:text-neutral-200">
                                            Pay by Card
                                        </span>
                                    </label>
                                    <label
                                        htmlFor="payment-options-with-paypal"
                                        className="relative w-full inline-flex justify-center py-2 px-4"
                                    >
                                        <input
                                            id="payment-options-with-paypal"
                                            name="payment-options"
                                            type="radio"
                                            className="peer absolute top-0 end-0 size-full border-black bg-black bg-none text-black rounded-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-md focus:outline-offset-0 checked:before:bg-white checked:before:shadow-2xs checked:bg-none outline-transparent focus:before:bg-gray-50 dark:checked:before:bg-neutral-800 dark:focus:before:bg-neutral-900 dark:focus:ring-offset-transparent"
                                            disabled
                                        />
                                        <span className="relative z-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium text-gray-800 cursor-pointer peer-disabled:cursor-default peer-disabled:opacity-50 peer-disabled:pointer-events-none dark:text-neutral-200">
                                            Pay with PayPal
                                        </span>
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="hs-pro-dufbi"
                                        className="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200"
                                    >
                                        Billing information
                                    </label>
                                    <input
                                        id="hs-pro-dufbi"
                                        type="text"
                                        className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                        placeholder="Billing email"
                                    />
                                    <input
                                        type="text"
                                        className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                        placeholder="Company name"
                                    />
                                    <input
                                        type="text"
                                        className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                        placeholder="City"
                                    />
                                    <div className="grid grid-cols-2 gap-x-2">
                                        <div>
                                            <label
                                                htmlFor="hs-pro-echddst"
                                                className="sr-only"
                                            >
                                                State
                                            </label>
                                            <input
                                                id="hs-pro-echddst"
                                                type="text"
                                                className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                placeholder="State"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="hs-pro-echddzc"
                                                className="sr-only"
                                            >
                                                ZIP code
                                            </label>
                                            <input
                                                id="hs-pro-echddzc"
                                                type="text"
                                                className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                                placeholder="ZIP code"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="hs-select relative">
                                            <select
                                                data-hs-select='{
                                                  "placeholder": "Country",
                                                  "hasSearch": true,
                                                  "searchPlaceholder": "Country",
                                                  "searchclassNamees": "block w-full sm:text-sm border-gray-200 rounded-lg focus:text-blue-500 focus:outline-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 py-1.5 sm:py-2 px-3",
                                                  "searchWrapperclassNamees": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
                                                  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span data-icon></span><span class=\"text-gray-800 dark:text-neutral-200 \" data-title></span></button>",
                                                  "toggleclassNamees": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 sm:py-2 ps-3 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start sm:text-sm focus:outline-hidden v1cco focus:outline-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
                                                  "dropdownclassNamees": "adv10 ju7it ami92 space-y-0.5 ucmtr w-full overflow-hidden overflow-y-auto bg-white lile3 rrmkk n4ec4 xlk9f rzoxf xcbgk dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                                                  "optionclassNamees": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer ksr3h rounded-lg focus:outline-hidden kf4z7 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                                                  "optionTemplate": "<div><div class=\"flex items-center \"><div class=\"epucs \" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div></div>",
                                                  "preventSearchFocus": false,
                                                  "viewport": "#hs-pro-upsc"
                                                }'
                                                className="hidden"
                                                style={{ display: 'none' }}
                                            >
                                                <option value="">Choose</option>
                                                <option
                                                    value="US"
                                                    data-hs-select-option='{"icon": "<img class=\"inline-block size-4 rounded-xs \" src=\"../../assets/vendor/svg-country-flags/png100px/us.png\" alt=\"United States\" />"}'
                                                >
                                                    United States
                                                </option>
                                                <option
                                                    value="GB"
                                                    data-hs-select-option='{"icon": "<img class=\"inline-block size-4 rounded-xs \" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"United Kingdom\" />"}'
                                                >
                                                    United Kingdom
                                                </option>
                                                {/* Add other countries as needed */}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="hs-pro-dufpi"
                                        className="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200"
                                    >
                                        Payment information
                                    </label>
                                    <div className="relative">
                                        <div className="absolute h5ske uv2uj flex items-center a799i ps-3 cursor-pointer">
                                            <svg
                                                className="shrink-0 size-4 t6rrs dark:text-neutral-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <rect
                                                    width="20"
                                                    height="14"
                                                    x="2"
                                                    y="5"
                                                    rx="2"
                                                />
                                                <line
                                                    x1="2"
                                                    x2="22"
                                                    y1="10"
                                                    y2="10"
                                                ></line>
                                            </svg>
                                        </div>
                                        <input
                                            id="hs-pro-dufpi"
                                            type="text"
                                            className="py-1.5 sm:py-2 ajrjw lw2dp block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                            placeholder="Card number"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2">
                                        <input
                                            type="text"
                                            className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                            placeholder="MM / YY"
                                        />
                                        <input
                                            type="text"
                                            className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:text-blue-500 focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                                            placeholder="CVC"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Summary Panel */}
                    <div className="md:border-s md:border-neutral-300 md:ps-10 dark:border-neutral-700">
                        <div className="sm:grid-cols-2">
                            {/* Currency Dropdown */}
                            <div className="mb-5">
                                <label
                                    htmlFor="hs-select-currency"
                                    className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1"
                                >
                                    Currency
                                </label>
                                <div className="hs-select relative">
                                    <select
                                        id="hs-select-currency"
                                        data-hs-select='{
                                          "placeholder": "Select currency",
                                          "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"text-sm text-gray-500 dark:text-neutral-400\" data-title></span><svg class=\"ms-2 shrink-0 size-4 text-gray-500 dark:text-neutral-400\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 9 6 6 6-6\"/></svg></button>",
                                          "toggleclassNamees": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600",
                                          "dropdownclassNamees": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
                                          "optionclassNamees": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
                                          "optionTemplate": "<div><span class=\"text-sm text-gray-800 dark:text-neutral-200\" data-title></span></div>"
                                        }'
                                        className="hidden"
                                    >
                                        <option value="">
                                            Select currency
                                        </option>
                                        <option value="USD">
                                            USD - US Dollar
                                        </option>
                                        <option value="EUR">EUR - Euro</option>
                                        <option value="GBP">
                                            GBP - British Pound
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Billing Period Dropdown */}
                            <div className="mb-5">
                                <label
                                    htmlFor="hs-select-billing-period"
                                    className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1"
                                >
                                    Billing Period
                                </label>
                                <div className="hs-select relative">
                                    <select
                                        id="hs-select-billing-period"
                                        data-hs-select='{
                                          "placeholder": "Select billing period",
                                          "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"text-sm text-gray-500 dark:text-neutral-400\" data-title></span><svg class=\"ms-2 shrink-0 size-4 text-gray-500 dark:text-neutral-400\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 9 6 6 6-6\"/></svg></button>",
                                          "toggleclassNamees": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600",
                                          "dropdownclassNamees": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
                                          "optionclassNamees": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
                                          "optionTemplate": "<div><span class=\"text-sm text-gray-800 dark:text-neutral-200\" data-title></span></div>"
                                        }'
                                        className="hidden"
                                    >
                                        <option value="">
                                            Select billing period
                                        </option>
                                        <option value="monthly">Monthly</option>
                                        <option value="annually">
                                            Annually
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <h4 className="font-medium text-gray-800 dark:text-neutral-200">
                                Order summary
                            </h4>
                            <p className="mt-0.5 text-sm text-gray-500 dark:text-neutral-500">
                                Review your order before submitting.
                            </p>

                            <div className="mt-5 py-3 border-y border-neutral-200 dark:border-neutral-700">
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-800 dark:text-neutral-200">
                                        Pro plan
                                    </p>
                                    <p className="text-sm text-gray-800 dark:text-neutral-200">
                                        $29.00
                                    </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                    Billed annually
                                </p>
                            </div>

                            <div className="mt-3 py-3 border-b border-neutral-200 dark:border-neutral-700">
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-800 dark:text-neutral-200">
                                        VAT (20%)
                                    </p>
                                    <p className="text-sm text-gray-800 dark:text-neutral-200">
                                        $5.80
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 py-3">
                                <div className="flex justify-between">
                                    <p className="mb-2 font-medium text-gray-800 dark:text-neutral-200">
                                        Total
                                    </p>
                                    <p className="mb-2 font-medium text-gray-800 dark:text-neutral-200">
                                        $34.80
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <button
                                    type="button"
                                    className="py-1.5 sm:py-2 px-3 inline-flex justify-center items-center gap-x-2 text-nowrap w-full bg-white border border-gray-200 rounded-lg text-start sm:text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
                                >
                                    Confirm and pay
                                </button>
                            </div>

                            <div className="mt-5">
                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                    By clicking "Confirm and pay", you agree to
                                    Preline's{' '}
                                    <a
                                        className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:text-blue-700"
                                        href="#"
                                    >
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a
                                        className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:text-blue-700"
                                        href="#"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Body End */}

            {/* Modal Footer */}
            <div className="py-2.5 px-4 flex justify-center items-center gap-x-2 text-nowrap border-b border-gray-200 dark:border-neutral-700">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                    Questions?{' '}
                    <a
                        className="inline-flex items-center gap-x-3 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:text-blue-700"
                        href="#"
                    >
                        Chat with us
                    </a>
                </p>
            </div>
            {/* Modal Footer End */}
        </div>
    )
}
