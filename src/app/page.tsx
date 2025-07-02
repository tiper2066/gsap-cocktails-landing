import Navbar from '@/components/Navbar'; // Navbar 가져옴
import Hero from '@/components/Hero'; // Hero 가져옴

export default function Home() {
    return (
        <main>
            <Navbar /> {/* Navbar 추가 */}
            <Hero /> {/* Hero 추가 */}
            {/* ****** 현재 화면 높이와 같은 높이를 갖는 요소 추가 */}
            <div className='h-dvh bg-black'></div>
        </main>
    );
}
