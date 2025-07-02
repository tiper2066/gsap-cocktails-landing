'use client';
import { cocktailLists, mockTailLists } from '@/constants'; // 데이터
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger); // ScrollTrigger 플러그인을 gsap에 등록함

const Cocktails = () => {
    useGSAP(() => {
        const parallaxTimline = gsap
            .timeline({
                scrollTrigger: {
                    trigger: '#cocktails', // 대상: #cocktails 섹션요소
                    start: 'top 30%', // 요소 상단이 화면 30% 위치에 닿을 때 애님 시작
                    end: 'bottom bottom', // 요소 하단이 화면 80% 위치에 닿을 때 애님 완료
                    scrub: true, // 부드러운 애님
                },
            })
            .from('#c-left-leaf', { x: -100, y: 100 }) // 좌측 나뭇잎이 좌측 하단에서 현재 위치로 이동
            .from('#c-right-leaf', { x: 100, y: 100 }); // 우측 나뭇잎이 우측 하단에서 현재 위치로 이동
    });

    return (
        <section id='cocktails' className='noisy'>
            <img
                src='/images/cocktail-left-leaf.png'
                alt='left-leaf'
                id='c-left-leaf'
            />
            <img
                src='/images/cocktail-right-leaf.png'
                alt='right-leaf'
                id='c-right-leaf'
            />

            <div className='list'>
                <div className='popular'>
                    <h2>Most popular cocktails:</h2>
                    <ul>
                        {cocktailLists.map(
                            ({ name, country, detail, price }) => (
                                <li key={name}>
                                    {/* me-28 (margin-inline-end, 우측에 마진): 4 x 28 = 112px */}
                                    {/* div 가 클래스로 인해 inline 으로 변경되었기에(me) span 이 우측에 배치됨 */}
                                    {/* 768px 이하(md) 에서는 다시 block 이되므로 popular 와 아래 loved 가 하나의 컬럼으로 배치됨 */}
                                    <div className='md:me-28'>
                                        <h3>{name}</h3>
                                        <p>
                                            {country} | {detail}
                                        </p>
                                    </div>
                                    <span>- {price}</span>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className='loved'>
                    <h2>Most loved cocktails:</h2>
                    <ul>
                        {mockTailLists.map(
                            ({ name, country, detail, price }) => (
                                <li key={name}>
                                    {/* me-28 (margin-inline-end, 우측에 마진): 4 x 28 = 112px */}
                                    {/* div 가 클래스로 인해 inline 으로 변경되었기에(me) span 이 우측에 배치됨 */}
                                    <div className='me-28'>
                                        <h3>{name}</h3>
                                        <p>
                                            {country} | {detail}
                                        </p>
                                    </div>
                                    <span>- {price}</span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};
export default Cocktails;
