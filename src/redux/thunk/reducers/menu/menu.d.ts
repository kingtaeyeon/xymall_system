interface IMenu {
    breadcrumb: {
        [key: string]: {
            icon: React.ReactNode;
            name: string
        }
    },
    topMenu: Array<IMenuItem>;
}

type IMenuItem = {
    name: string;
    path: string;
    icon?: React.ReactNode
};
