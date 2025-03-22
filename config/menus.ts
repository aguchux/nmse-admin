import { IconType } from "react-icons";
import { FaAd, FaListOl, FaUsers } from "react-icons/fa";
type Menu = {
    id: string;
    title: string;
    link: string;
    icon: IconType | string;
    enabled: boolean;
    children: Menu[];
};

export const mainMenus : Menu[]  = [
    {
        id:'users',
        title: 'Users & Signups',
        link: '/users',
        icon:  FaUsers,
        enabled: true,
        children: [
            {
                id: 'users',
                title: 'List users',
                link: '/users',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
            {
                id: 'signups',
                title: 'Signups',
                link: '/signups',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
        ],
    },
    {
        id: 'colleges',
        title: 'Colleges',
        link: '/colleges',
        icon: FaAd,
        enabled: true, 
        children: [
            {
                id: 'colleges',
                title: 'List colleges',
                link: '/colleges',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
        ],
    },
] as const;
