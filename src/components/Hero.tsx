'use client';
import gsap from 'gsap'; // *************************** gsap 라이브러리
import { useGSAP } from '@gsap/react'; // ************************** useGSAP 훅
import { SplitText, ScrollTrigger } from 'gsap/all'; // ********************** 플러그인 추가
import { useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'; // ******************** 반응형 처리 라이브러리

gsap.registerPlugin(ScrollTrigger, SplitText); // ********************* GSAP 플러그인 등록

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null); // 비디오 참조 추가
    const videoContainerRef = useRef<HTMLDivElement | null>(null); // 비디오 컨테이너 참조 추가
    const isMobile = useMediaQuery({ maxWidth: 767 }); // 모바일 화면 여부

    useGSAP(() => {
        /* =====================================================================
        /*  GSAP 텍스트 애니메이션 - SplitText
        ===================================================================== */
        // *********************** 타이틀을 글자로 분리한 배열과 단어로 분리한 배열 생성
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        // ************************ 서브타이틀을 줄단위로 분리한 배열 생성
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        // ************************ 타이틀 글자마다 .text-gradient 클래스 적용(그라디언트 색상)
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
        // ************************ 미리 숨긴 타이틀 및 서브타이틀을 보이게 사전 설정
        gsap.set('.title', { visibility: 'visible' });
        gsap.set('.subtitle', { visibility: 'visible' });

        // ************************ 타이틀을 0.06초 마다 한글자씩 서서히 위로 나타나는 효과 적용
        gsap.from(heroSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
        });

        // ************************ 1초 후, 서브타이틀을 0.06초 마다 한줄씩 서서히 위로 나타나는 효과 적용
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        });

        /* =====================================================================
        /*  GSAP 나뭇잎 애니메이션 - scrollTrigger
        ===================================================================== */
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero', // 대상 요소
                start: 'top top', // hero 요소 상단이 화면 상단에 닿으면 애님 시작
                end: 'bottom top', // hero 요소 하단이 화면 상단에 닿면 애님 완료
                scrub: true, // 부드럽게 실행
            },
        })
            .to('.right-leaf', { y: 200 }, 0) // 좌측 나뭇잎 아래로 이동, 0은 딜레이 시간
            .to('.left-leaf', { y: -200 }, 0); // 우측 나뭇잎 위로 이동, 0: 스크롤 즉시 애님 시작됨

        /* =====================================================================
        /*  GSAP 스크롤 시 비디오 플레이하기 - scrollTrigger
        ===================================================================== */
        if (!videoRef.current || !videoContainerRef.current) return; // 대상요소가 있는지 확인함

        // 스크롤 시 애님 시작 및 종료 시점 설정
        const startValue = isMobile ? 'top 50%' : 'center 60%'; // 모바일: 컨테이너 상단이 화면 50%, 웹: 중앙이 화면 60% 위치에서 애님 시작
        const endValue = isMobile ? 'bottom 20%' : 'bottom 10%'; // 모바일: 컨테이너 하단이 화면 20%, 웹: 하단이 화면 10% 위치에서 애님 종료

        gsap.timeline({
            scrollTrigger: {
                trigger: videoContainerRef.current, // 비디오 컨테이너를 트리거로 사용
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true, // 스크롤 시 대상 고정 여부
                // markers: true, // 디버깅용 마커 활성화: 브라우저에서 스크롤 및 애님 시작과 종료(start, end) 시점이 표시되도록 함
            },
        })
            // 스크롤 시 트리거 되면, 스크롤 위치를 비디오 요소의 시간과 매칭하여 애님 시작
            .to(videoRef.current, {
                currentTime: videoRef.current.duration || 0, // 비디오 시간 || 비디오 길이가 정의되지 않은 경우 0
                ease: 'none', // 효과 사용 안함
            });
    }, []);

    // 비디오 로드 상태 디버깅: 비디오 로딩 여부를 콘솔에 출력해 줌
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                console.log(
                    'Video metadata loaded:',
                    videoRef.current?.duration
                );
            };
            videoRef.current.onerror = () => {
                console.error('Video failed to load');
            };
        }
    }, []);

    return (
        <>
            <section id='hero' className='noisy'>
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
                        <div className='space-y-5 hidden md:block'>
                            <p>Cool. Crisp. Classic.</p>
                            <p className='subtitle'>
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className='view-cocktails'>
                            <p className='subtitle'>
                                Every cocktail on our menu is a blend of premium
                                ingredients, creative flair, and timeless
                                recipes — designed to delight your senses.
                            </p>
                            <a href='#cocktails'>View cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* *************************************** 비디오 컨테이너와 비디오에 각각 ref 참조 설정 */}
            <div className='video-container' ref={videoContainerRef}>
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload='auto'
                    src='/videos/output.mp4'
                    className='video'
                />
            </div>
        </>
    );
};

export default Hero;
