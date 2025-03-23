import { IconType } from "react-icons";
import { FaAd, FaListOl, FaMoneyCheck, FaQuestion, FaUsers } from "react-icons/fa";
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
                link: '/users/signups',
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
    {
        id:'bank',	
        title: 'Questions Bank',
        link: '/bank',
        icon: FaQuestion,
        enabled: true,
        children: [
            {
                id: 'questions',
                title: 'List questions',
                link: '/banks',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
            {
                id: 'categories',
                title: 'Categories',
                link: '/banks/categories',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
        ],
    },
    {
        id:'subscriptions',
        title: 'Subscriptions',
        link: '/subscriptions',
        icon: FaMoneyCheck,
        enabled: true,
        children: [
            {
                id: 'plans',
                title: 'List plans',
                link: '/subscriptions',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
            {
                id: 'subscriptions',
                title: 'List subscriptions',
                link: '/subscriptions/subscriptions',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
        ],
    },{
        id:'tickets',
        title: 'Support & Tickets',
        link: '/tickets',
        icon: FaQuestion,
        enabled: true,
        children: [
            {
                id: 'tickets',
                title: 'List tickets',
                link: '/tickets',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
        ],
    }
] as const;
