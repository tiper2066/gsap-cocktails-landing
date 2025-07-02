'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText, ScrollTrigger } from 'gsap/all';
import { useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoContainerRef = useRef<HTMLDivElement | null>(null); // 비디오 컨테이너 참조 추가
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText('.title', {
            type: 'chars, words',
        });

        const paragraphSplit = new SplitText('.subtitle', {
            type: 'lines',
        });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.set('.title', { visibility: 'visible' });
        gsap.set('.subtitle', { visibility: 'visible' });

        gsap.from(heroSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0);

        if (!videoRef.current || !videoContainerRef.current) return;

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? 'bottom 20%' : 'bottom 10%';

        gsap.timeline({
            scrollTrigger: {
                trigger: videoContainerRef.current, // 비디오 컨테이너를 트리거로 사용
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
                markers: true, // 디버깅용 마커 활성화
            },
        }).to(videoRef.current, {
            currentTime: videoRef.current.duration || 0, // 비디오 길이가 정의되지 않은 경우 0
            ease: 'none',
        });
    }, []);

    // 비디오 로드 상태 디버깅
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
