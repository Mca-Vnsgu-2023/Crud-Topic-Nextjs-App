import Link from "next/link";
import styles from './main.module.scss'

export default function Navbar() {
    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark" style={{ padding: '10px' }}>
            <Link href={"/"} className={styles.navBarLink}>
                <h3>MY ToDo</h3>
            </Link>
            <Link href={"/addTopic"} className={styles.navBarLink}>
                <button className="btn btn-light">Add Topic </button>
            </Link>
        </nav>
    );
}