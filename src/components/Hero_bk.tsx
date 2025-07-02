'use client';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';
import { useRef } from 'react'; // ********************* useRef 추가
import { useMediaQuery } from 'react-responsive'; // ********************* useMediaQuery 추가

gsap.registerPlugin(ScrollTrigger, SplitText); // ScrollTrigger, SplitText 플러그인 등록

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null); // ********************** videoRef 객체 생성
    const isMobile = useMediaQuery({ maxWidth: 767 }); // ******************** 767px 이하면 모바일 화면으로 인식

    useGSAP(() => {
        // .title 요소를 글자로 분리된 배열과 단어로 분리된 배열 생성
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        // .subtitle 요소를 줄단위로 분리된 배열 생성
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        // 타이틀은 글자마다 .text-gradient 클래스 적용 (흰색에서 회색으로 라인 그라디언트)
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        // 애니메이션 시작 직전에 타이틀을 다시 보이게 설정
        gsap.set('.title', { visibility: 'visible' });
        gsap.set('.subtitle', { visibility: 'visible' });

        // 타이틀을 0.06초 마다 한글자씩 서서히 위로 나타나는 파도효과 적용
        gsap.from(heroSplit.chars, {
            opacity: 0,
            yPercent: 100, // 아래로 요소의 높이만큼 이동
            duration: 1.8,
            ease: 'expo.out', // 빠르게시작해서 서서히 완만해지는 속도
            stagger: 0.06,
        });

        // 서브타이틀을 0.06초 마다 한줄씩 서서히 위로 나타나는 효과 적용
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100, // 아래로 요소의 높이만큼 이동
            duration: 1.8,
            ease: 'expo.out', // 빠르게시작해서 서서히 완만해지는 속도
            stagger: 0.06,
            delay: 1, // 1 초 후에 시작
        });

        // 스크롤 시 나뭇잎 애니메이션하기
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero', // 대상: #hero 요소
                start: 'top top', // 대상의 상단이 화면 상단에 닿을 때 애님 시작
                end: 'bottom top', // 대상의 바닥이 화면 상단에 닿을 때 애님 종료
                scrub: true, // 부드러운 애님
            },
        })
            .to('.right-leaf', { y: 200 }, 0) // 우측 나뭇잎은 아래로 200 이동
            .to('.left-leaf', { y: -200 }, 0); // 좌측 나뭇잎을 위로 200 이동

        // *********************** 스크롤 시 비디오 애니메이션 시작과 종료값 설정
        // 모바일이면 대상 상단이 화면 50%에 닿을 때, 웹이면 대상 중앙이 화면 60%에 닿을 때 애님 시작
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        // 모바일이면 대상높이 120%가 화면 상단에 닿을 때, 웹이면 대상 바닥이 화면 상단에 닿을 때 애님 종료
        const endValue = isMobile ? '120% top' : 'bottom top';

        const video = videoRef.current;
        if (!video) return;

        video.onloadedmetadata = () => {
            // ************************ 실제 비디오 애니메이션
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: 'section.video', // 대상 요소
                    start: startValue, //  애님 시작 시점
                    end: endValue, // 애님 종료 시점
                    scrub: true, // 부드러운 애님
                    pin: video, // 스크롤 동안 비디오 화면 고정 (videoRef.current)
                },
            });

            tl.to(videoRef.current, {
                currentTime: videoRef.current?.duration,
            });
        };
    }, []);

    return (
        <>
            {/* noizy : 적용대상에 노이즈 효과 적용 */}
            <section id='hero' className='noizy'>
                <h1 className='title'>MOJITO</h1>
                <img
                    src='/images/hero-left-leaf.png'
                    alt='left-leaf'
                    className='left-leaf'
                />
                <img
                    src='/images/hero-right-leaf.png'
                    alt='right-leaf'
                    className='right-leaf'
                />
                <div className='body'>
                    <div className='content'>
                        {/* 기본적으로 숨겨져 있다가 768px 이상에서 보임 */}
                        <div className='space-y-5 hidden md:block'>
                            <p>Cool. Crisp. Classic.</p>
                            <p className='subtitle'>
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>
                        <div className='view-cocktails'>
                            <p className='subtitle'>
                                Every cockail on our menu is a blend of premium
                                ingredients, creative flair, and timeless
                                recipes - designed to delight your senses.
                            </p>
                            <a href='#cocktails'>View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* ************************ video 클래스: 좌측 하단을 기준으로 화면높이 50% 크기로 설정 */}
            {/* --- 비디오를 위한 새로운 섹션 추가 --- */}
            {/* <section id='video-section' className='relative h-[100vh]'> */}
            <section className='video absolute inset-0'>
                {/* ****************************** 비디오 소스 및 설정 */}
                <video
                    src='/videos/input.mp4'
                    muted // 음소거
                    playsInline // 트랙바 없는 스타일
                    preload='auto' // 사전 로딩함
                    ref={videoRef} // 요소 참조
                />
            </section>
            {/* </section> */}
        </>
    );
};
export default Hero;
