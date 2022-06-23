import {Box} from "@mui/material";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import mapIcon from '../../assets/images/map_icon.png';

export const Footer = () => {

    const data = {
        name: 'Cabinet de psihologie Anca Nicoli',
        phoneNumber: '0735532208',
        emailAddress: 'ancanicoli@@gmail.com',
        address: 'Str. Dej, nr. 14, Timișoara',
        socials: [
            {
                icon: <FacebookIcon style={{ fontSize: 30 }} />,
                url: '/'
            },
            {
                icon: <InstagramIcon style={{ fontSize: 30 }} />,
                url: '/'
            },
            {
                icon: <LinkedInIcon style={{ fontSize: 30 }} />,
                url: '/'
            }
        ]
    }

    return (
        <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center' }}
            padding={3}
            paddingLeft={5}
            paddingRight={5}
            bgcolor="#F3DFC1"
            justifyContent={{ md: 'space-between' }}
            gap={{ xs: 2 }}
        >
            <Box
                display="flex"
                flexDirection="column"
            >
                <h2>Contact</h2>
                <strong>{data.name}</strong>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mt={2}
                    mb={1}
                >
                    <PhoneInTalkIcon /> {data.phoneNumber}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                >
                    <EmailIcon /> {data.emailAddress}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                >
                    <FmdGoodIcon /> {data.address}
                </Box>
            </Box>
            <Box>
                <h4>Follow us on</h4>
                {
                    data.socials.map((socialItem, idx) => (
                        <a
                            key={idx}
                            href={socialItem.url}
                            target="_blank"
                            style={{
                                textDecoration: 'none',
                                color: '#000'
                            }}
                        >
                            {socialItem.icon}
                        </a>
                    ))
                }
            </Box>
            <Box>
                <img
                    src={mapIcon}
                    width="100%"
                    style={{
                        maxWidth: 300
                    }}
                    alt=""
                />
            </Box>
        </Box>
    )
}