export default function Test1() {
    return (
        <div
            id="upgrade-modal"
            className="hs-overlay fixed inset-0 z-50 overflow-y-auto w-full h-full bg-gray-900/50"
        >
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">
                            Upgrade to PRO
                        </h3>
                        <button
                            type="button"
                            className="hs-overlay-close text-gray-500 hover:text-gray-900"
                        >
                            {/* <XMarkIcon className="w-5 h-5" /> */}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {/* Left - Billing form */}
                        <form className="space-y-4">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="w-1/2 py-2 bg-blue-600 text-white rounded-md"
                                >
                                    Pay by Card
                                </button>
                                <button
                                    type="button"
                                    className="w-1/2 py-2 bg-gray-200 rounded-md"
                                >
                                    Pay with PayPal
                                </button>
                            </div>

                            <div className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="Billing email"
                                    className="w-full border rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Company name"
                                    className="w-full border rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    className="w-full border rounded-md p-2"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="w-1/2 border rounded-md p-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="ZIP code"
                                        className="w-1/2 border rounded-md p-2"
                                    />
                                </div>
                                <select className="w-full border rounded-md p-2">
                                    <option>Country</option>
                                    <option>United States</option>
                                    <option>Canada</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Card at7fl"
                                    className="w-full border rounded-md p-2"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Expiration"
                                        className="w-1/2 border rounded-md p-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="w-1/2 border rounded-md p-2"
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-gray-500">
                                🔒 This is a secure form
                            </p>
                        </form>

                        {/* Right - Summary */}
                        <div className="bg-gray-50 rounded-md p-4 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Currency
                                </span>
                                <span className="text-sm font-medium">USD</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Billing period
                                </span>
                                <span className="text-sm font-medium">
                                    Free - (Free forever)
                                </span>
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>1 seat rjx3z Pro</span>
                                    <span>$59</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span>$0</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Due today</span>
                                    <span>$59</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white rounded-md py-2">
                                Pay and upgrade
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                You can cancel your plan at any time. Purchases
                                made by credit card can’t be refunded, although
                                your credit can be transferred to another
                                account.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
