import Navbar from '@/components/Navbar'; // Navbar 가져옴
import Hero from '@/components/Hero'; // Hero 가져옴
import Cocktails from '@/components/Cocktails'; // Cocktails 가져옴

export default function Home() {
    return (
        <main>
            <Navbar /> {/* Navbar 추가 */}
            <Hero /> {/* Hero 추가 */}
            <Cocktails /> {/* Cocktails 추가 */}
        </main>
    );
}
