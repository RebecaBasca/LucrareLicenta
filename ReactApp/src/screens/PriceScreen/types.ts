export type ServiceItemProps = {
    name: string;
    duration: number;
    price: number;
}

export type PriceProps = {
    title: string;
    bgColor: string;
    type: string;
    items: ServiceItemProps[]
    itemsFontColor?: string;
}