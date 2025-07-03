'use client';
import { featureLists, goodLists } from '@/constants'; // 데이터
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';

const Art = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 }); // 모바일 여부 (767px 이하)
    useGSAP(() => {
        const start = isMobile ? 'top 20%' : 'top top'; // 모바일 ? 요소 상단, 화면 20%에 접할때 : 요소 상단, 화면 상단에 접할때 시작
        // 애니에인션 순서 설정(스크롤 시)
        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art', // 대상: art 섹션
                start: start, // 애님 시작
                end: 'bottom center', // 요소 하단이 화면 중간에 접할때 애님 종료
                scrub: true, // 부드럽게 애님
                pin: true, // 대상 요소 고정(art 섹션)
            },
        });
        // 실제 애니메이션 설정
        maskTimeline
            // 타이틀, 좌우 목록, 하단 카피를 0.2 초 마다 사라지게 함
            .to('.will-fade', {
                opacity: 0,
                stagger: 0.2,
                ease: 'power1.inOut',
            })
            // 마스크 이미지(칵테일 실루엣 이미지)를 중앙을 기준으로 1.3배 크게하면서, 마스크 영역은 400%로 늘림
            .to('.masked-img', {
                scale: 1.3, // 마스크와 내부 이미지가 같이 늘어남
                maskPosition: 'center',
                maskSize: '400%', // 마스크 이미지만 늘어남(영역 확대)
                duration: 1,
                ease: 'power1.inOut',
            })
            // 마스크 이미지 하단의 숨겨진 이미지 설명문이 1초 동안 나타난다.
            .to('#masked-content', {
                opacity: 1,
                duration: 1,
                ease: 'power1.inOut',
            });
    });

    return (
        <div id='art'>
            <div className='container mx-auto h-full pt-20'>
                {/* ------ 타이틀 -------*/}
                <h2 className='will-fade'>The ART</h2>

                <div className='content'>
                    {/* ------ 좌측 목록 ------- */}
                    <ul className='space-y-4 will-fade'>
                        {goodLists.map((feature, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <img src='/images/check.png' alt='check' />
                                <p>{feature}</p>
                            </li>
                        ))}
                    </ul>

                    {/* ------ 칵테일 실루엣으로 마스킹된 카드 이미지 ------- */}
                    <div className='cocktail-img'>
                        <img
                            src='/images/under-img.jpg'
                            alt='cocktail'
                            className='abs-center masked-img size-full object-contain'
                        />
                    </div>

                    {/* ------ 우측 목록 ------- */}
                    <ul className='space-y-4 will-fade'>
                        {featureLists.map((feature, index) => (
                            <li
                                key={index}
                                className='flex items-center justify-start gap-2'
                            >
                                <img src='/images/check.png' alt='check' />
                                <p className='md:w-fit w-60'>{feature}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* ------ 하단 카피 ------- */}
                <div className='masked-container'>
                    <h2 className='will-fade'>Sip-Worthy Perfection</h2>
                    {/* ------ 스크롤할 때문 보여지는 숨겨진 문구: opacity-0 ------- */}
                    <div id='masked-content'>
                        <h3>Made with Craft, Poured with Passion</h3>
                        <p>
                            This isn’t just a drink. It’s a carefully crafted
                            moment made just for you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Art;
