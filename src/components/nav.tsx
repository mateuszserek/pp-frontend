import { Link } from "react-router-dom"
export default function Nav() {
    return (
        <nav className="nav-container">
            <Link to="/">Home</Link>
            <Link to = "/products">Products</Link>
            <Link to = "/test">Test</Link>
        </nav>
    )
}


