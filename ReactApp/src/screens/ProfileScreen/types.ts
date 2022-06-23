export type CommonTableProps = {
    headers: any[];
    rows: any[];
    handleDelete?: any;
};

export type CommonHeaderProps = {
    title: string;
};

export type CommonRowProps = {
    name: string;
    data: string;
    ora: string;
    terapeut: string;
};

export type HeaderType = {
    name: string;
    type: string;
};
