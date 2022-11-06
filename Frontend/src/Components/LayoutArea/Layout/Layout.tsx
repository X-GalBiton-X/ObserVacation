import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { useSelector } from 'react-redux';

function Layout(): JSX.Element {
    const user = useSelector((state: any) => state.user);
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            {!!user && (
                <aside>
                    <Menu />
                </aside>
            )}
            
            <main>
                <Routing />
            </main>
            
            <footer>
                <Footer />
            </footer>

        </div>
    );
}

export default Layout;
