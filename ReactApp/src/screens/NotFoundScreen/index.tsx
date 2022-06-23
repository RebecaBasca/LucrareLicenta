import { Link } from "react-router-dom";
import {ROUTES} from "../../routes";

const NotFoundScreen = () => {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
                <h3>Page Not Found</h3>
                <p>
                    <Link to={ROUTES.home}>Go Home</Link>
                </p>
            </div>
        </>
    )
}

export {
    NotFoundScreen
}