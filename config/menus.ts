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
        ],
    },
    {
        id: 'examinations',
        title: 'Examinations',
        link: '/examinations',
        icon: FaAd,
        enabled: true,
        children: [
            {
                id: 'examinations',
                title: 'List examinations',
                link: '/examinations',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
            {
                id: 'examinations/create',
                title: 'Create examination',
                link: '/examinations/create',
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
        link: '/plans',
        icon: FaMoneyCheck,
        enabled: true,
        children: [
            {
                id: 'plans',
                title: 'Manage plans',
                link: '/plans',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
            {
                id: 'subscriptions',
                title: 'Manage subscriptions',
                link: '/plans/subscriptions',
                icon: FaListOl,
                enabled: true,
                children: [],
            },
        ],
    },
    // {
    //     id:'tickets',
    //     title: 'Support & Tickets',
    //     link: '/tickets',
    //     icon: FaQuestion,
    //     enabled: true,
    //     children: [
    //         {
    //             id: 'tickets',
    //             title: 'List tickets',
    //             link: '/tickets',
    //             icon: FaListOl,
    //             enabled: true,
    //             children: [],
    //         },
    //     ],
    // }
] as const;
