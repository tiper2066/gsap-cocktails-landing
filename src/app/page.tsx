import { gsap } from 'gsap'; // gsap 라이브러리 가져옴
import { ScrollTrigger, SplitText } from 'gsap/all'; // ScrollTrigger, SplitText 플러그인 가져옴

gsap.registerPlugin(ScrollTrigger, SplitText); // ScrollTrigger, SplitText 플러그인 등록

export default function Home() {
    return (
        <div className='flex-center h-screen'>
            <h1 className='text-3xl text-indigo-300'>Hello, GSAP!</h1>
        </div>
    );
}
