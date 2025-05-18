const plan = {
    Free: {
        text: 'Downgrade to Free',
        price: 0,
    },
    Pro: {
        text: 'Upgrade to PRO',
        price: 15,
    },
}

export default function CheckoutHeader() {
    return (
        <div className="p-4">
            <h5 className="text-lg font-semibold dark:text-white">
                {plan.Pro.text}
            </h5>
        </div>
    )
}
