import React, {useEffect} from "react";
import {PageType} from "./types";
import phoneIcon from "../../assets/images/tel_icon.png";
import emailIcon from "../../assets/images/mail_icon.png";
import locationIcon from "../../assets/images/location_icon.png";
import facebookIcon from '../../assets/images/facebook_icon.png';
import instagramIcon from '../../assets/images/instagram_icon.png';
import linkedinIcon from '../../assets/images/linkedin_icon.png';
import {useContext, useState} from "react";
import {AuthenticationContext} from "../../context";
import {ROUTES} from "../../routes";
import {useLocation, useNavigate} from "react-router-dom";

const useLayout = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { isLoggedIn } = useContext(AuthenticationContext);
    const location = useLocation();
    const [isMiddle, setIsMiddle] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsMiddle(
            location.pathname === '/login' || location.pathname === '/register'
        )
    }, [location]);


    const pages: PageType[] = [
        {
            label: 'Servicii',
            linkTo: ROUTES.services,
        },
        {
            label: 'Prețuri',
            linkTo: ROUTES.prices,
        },
        {
            label: 'Echipă',
            linkTo: ROUTES.team,
        },
        {
            label: 'PROGRAMEAZĂ-TE',
            linkTo: ROUTES.schedule,
            isBig: true
        }
    ];

    const socialIcons = [
        {
            icon: (
                <img
                    src={facebookIcon}
                    width={40}
                    height={40}
                    alt=""
                />
            )
        },
        {
            icon: (
                <img
                    src={instagramIcon}
                    width={40}
                    height={40}
                    alt=""
                />
            )
        },
        {
            icon: (
                <img
                    src={linkedinIcon}
                    width={40}
                    height={40}
                    alt=""
                />
            )
        }
    ]

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (routeName: string = '') => {
        if(routeName && navigate) {
            navigate(routeName);
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const footerItems = [
        {
            icon: (
                <img
                    src={phoneIcon}
                    width={35}
                    height={30}
                    alt=""
                />
            ),
            value: 'Tel: 0735595885'
        },
        {
            icon: (
                <img
                    src={emailIcon}
                    width={35}
                    height={30}
                    alt=""
                />
            ),
            value: 'E-mail: cabinet.nicoli@gmail.com'
        },
        {
            icon: (
                <img
                    src={locationIcon}
                    width={35}
                    height={30}
                    alt=""
                />
            ),
            value: 'Adresa: Str. Dej, nr. 14, Timisoara'
        }
    ];

    const handleGotoProfile = () => {
        const user = localStorage.getItem('currentUser');

        if(user) {
            const currentUser = JSON.parse(user);

            if(currentUser.accountType === 'admin') {
                navigate(ROUTES.admin)
            } else {
                navigate(ROUTES.profile)
            }
        }
    }

    return {
        handleOpenNavMenu,
        anchorElNav,
        handleCloseNavMenu,
        pages,
        handleOpenUserMenu,
        anchorElUser,
        settings,
        handleCloseUserMenu,
        footerItems,
        socialIcons,
        isLoggedIn,
        isMiddle,
        handleGotoProfile
    }
}

export {
    useLayout
}