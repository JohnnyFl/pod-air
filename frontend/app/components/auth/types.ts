export interface SubscriptionInfo {
    subscription: 'Free' | 'Pro';
    uploads_amount: number;
    subscription_id: string;
}

export interface PlanDetails {
    price: number;
    description: string;
}

export type PlanType = 'Free' | 'Pro';

export type Plans = {
    [key in PlanType]: PlanDetails;
};