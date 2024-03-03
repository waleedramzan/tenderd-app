import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div className="d-flex flex-row p-20 bg-light-grey">
                <Link to="/" className="pr-20 fg-black font-weight-bold">
                    Home
                </Link>
                <Link to="/vehicle" className="fg-black font-weight-bold">
                    Vehicle
                </Link>
            </div>
        </>
    )
}