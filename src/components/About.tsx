'use client';
import gsap from 'gsap'; // gsap 라이브러리
import { useGSAP } from '@gsap/react'; // useGSAP 훅
import { SplitText } from 'gsap/all'; // gsap 플러그인

// gsap.registerPlugin(SplitText); // SplitText 플러그인 등록

const About = () => {
    useGSAP(() => {
        // 제목을 단어로 분리한 배열 생성
        const titleSplit = SplitText.create('#about h2', { type: 'words' });
        // 애님 타임 라인 설정
        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#about', // 대상: about 요소
                start: 'top center', // 요소의 상단이 화면 중앙에 닿을 때 애님 시작
                end: 'bottom bottom', // 요소의 하단이 화면 하단에 닿을 때 애님 종료
                scrub: true, // 부드러운 애님
            },
        });
        // 제목 텍스트 시작 전 초기 설정
        scrollTimeline
            .from(titleSplit.words, {
                opacity: 0,
                yPercent: 100, // 대상요소 높이 만큼 아래로 이동
                duration: 1,
                ease: 'expo.out',
                stagger: 0.02, // 애님 간격
            })
            // 카드 이미지 첫줄과 둘째줄 컨테이너의 애님 시작 전 초기 설정
            .from(
                '.top-grid div, .bottom-grid div',
                {
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.inOut',
                    stagger: 0.04,
                },
                '-=0.5' // 이전 애님 종료 시점 0.5초 전에 애님 시작됨
            );
    });

    return (
        <div id='about'>
            {/* --------- 페이지 제목 및 설명 --------- */}
            <div className='mb-16 md:px-0 px-5'>
                <div className='content'>
                    <div className='md:col-span-8'>
                        <p className='badge'>Best Cocktails</p>
                        <h2>
                            Where every detail matters{' '}
                            <span className='text-white'>-</span>
                            from muddle to garnish
                        </h2>
                    </div>

                    <div className='sub-content'>
                        <p>
                            Every cocktail we serve is a reflection of our
                            obsession with detail — from the first muddle to the
                            final garnish. That care is what turns a simple
                            drink into something truly memorable.
                        </p>

                        <div>
                            <p className='md:text-3xl text-xl font-bold'>
                                <span>4.5</span>/5
                            </p>
                            <p className='text-sm text-white-100'>
                                More than +12000 customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* --------- 카드이미지: 12 그리드(xl:grid-cols-12, 1280 이상)를 3컬럼으로 나눔, 각각 3, 6, 3 칸 너비 설정 --------- */}
            <div className='top-grid'>
                <div className='md:col-span-3'>
                    <div className='noisy' />
                    <img src='/images/abt1.png' alt='grid-img-1' />
                </div>

                <div className='md:col-span-6'>
                    <div className='noisy' />
                    <img src='/images/abt2.png' alt='grid-img-2' />
                </div>

                <div className='md:col-span-3'>
                    <div className='noisy' />
                    <img src='/images/abt5.png' alt='grid-img-5' />
                </div>
            </div>
            {/* --------- 카드이미지: 12 그리드(md:grid-cols-12, 768 이상)를 2컬럼으로 나눔, 각각 8, 4 칸 너비 설정 --------- */}
            <div className='bottom-grid'>
                <div className='md:col-span-8'>
                    <div className='noisy' />
                    <img src='/images/abt3.png' alt='grid-img-3' />
                </div>

                <div className='md:col-span-4'>
                    <div className='noisy' />
                    <img src='/images/abt4.png' alt='grid-img-4' />
                </div>
            </div>
        </div>
    );
};
export default About;
