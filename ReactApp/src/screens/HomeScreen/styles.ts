import {makeStyles} from "@mui/styles";
import headerImage from "../../assets/images/headerImage.png";

export const useStyles = makeStyles({
    headerContent: {
        backgroundImage: `url(${headerImage})`,
        minHeight: 800,
        backgroundPosition: '0 -230%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        paddingTop: 50,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingRight: 30

    },
    headerTitle: {
        margin: 0,
        paddingTop: 60,
        color: '#fff',
        fontSize: 60,
        maxWidth: 560,
        textAlign: 'right',
        fontFamily: 'Georgia',
        fontWeight: 400,
        paddingRight: 170
    }
});