import {SearchBar} from '../components/SearchBar';
import {Hero} from '../components/HeroSection'


export function Home(){
    return (
        <div>
            <header>
                <div className="Navmenu">
                <img alt=''/>
                <figcaption>EMIO</figcaption>
                </div>
            </header>
            <SearchBar />
            <Hero />
        </div>
    );
}

