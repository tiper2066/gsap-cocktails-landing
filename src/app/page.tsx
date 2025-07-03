import Navbar from '@/components/Navbar'; // Navbar 가져옴
import Hero from '@/components/Hero'; // Hero 가져옴
import Cocktails from '@/components/Cocktails'; // Cocktails 가져옴
import About from '@/components/About'; // About 가져옴
import Art from '@/components/Art'; // Art 가져옴
import CocktailMenu from '@/components/CoctailMenu'; // CocktailMenu 가져옴
import Contact from '@/components/Contact'; // Contact 가져옴

export default function Home() {
    return (
        <main>
            <Navbar /> {/* Navbar 추가 */}
            <Hero /> {/* Hero 추가 */}
            <Cocktails /> {/* Cocktails 추가 */}
            <About /> {/* About 추가 */}
            <Art /> {/* Art 추가 */}
            <CocktailMenu /> {/* CocktailMenu 추가 */}
            <Contact /> {/* Contact 추가 */}
        </main>
    );
}
