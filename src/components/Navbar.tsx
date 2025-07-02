'use client';
import { navLinks } from '@/constants';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

const Navbar = () => {
    /*
    gsap.registerPlugin(ScrollTrigger); //  ScrollTrigger 플러그인을 gsap에 등록함
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: '.testGsap', // 대상: nav 요소
                start: 'top top', // 요소의 바닥이 화면 상단에 닿을 때 애님 시작
                // end (애님 종료) 설정은 없음
            },
        });

        navTween.fromTo(
            'nav', // nav 요소가...
            { backgroundColor: 'transparent' }, // 배경이 투명한 상태에서... 스크롤되면...
            {
                backgroundColor: '#00000050', // 배경이 반투명하고..
                backdropFilter: 'blur(10px)', // 아래 배경이 블러효과가 반영된 상태로
                duration: 1, // 1초 동안 상태 변화함
                ease: 'power1.inOut',
            }
        );
    });
    */
    return (
        <nav>
            <div>
                <a href='#home' className='flex items-center gap-2'>
                    <img src='/images/logo.png' alt='logo' />
                    <p>Velvet Pour</p>
                </a>

                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;
