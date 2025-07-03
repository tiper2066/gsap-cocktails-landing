'use client';
import { sliderLists } from '@/constants'; // 칵테일 메뉴 리스트 데이터
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react'; // ************************ useGSAP 훅
import gsap from 'gsap'; // ************************ gsap 라이브러리

const CocktailMenu = () => {
    const contentRef = useRef<HTMLDivElement>(null); // 현재 칵테일 메뉴 레시피 문구 요소
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 선택 메뉴 순서의 상태변수, 초기값 0
    const totalCocktails = sliderLists.length; // 총 메뉴 갯수
    // 메뉴 또는 슬라이드 순서 이동하게 하기 함수
    const goToSlide = (index: number) => {
        const newIndex = (index + totalCocktails) % totalCocktails; // 메뉴 끝이면 처음으로 돌아가게함
        setCurrentIndex(newIndex); // 현재 선택 메뉴를 이동할 다음 메뉴로 변경함
    };
    // 이동할 칵테일 메뉴의 인덱스를 구하는 함수
    const getCocktailAt = (indexOffset: number) => {
        return sliderLists[
            // (현재 칵테일 인덱스 + 이동할 숫자 + 총 칵테일 메뉴 갯수) 를 총칵테일 갯수로 나눈값의 배열 위치
            (currentIndex + indexOffset + totalCocktails) % totalCocktails
        ];
    };

    const currentCocktail = getCocktailAt(0); // 현재 0번째 이동할 칵테일 메뉴 (즉, 현재 선택된 칵테일 메뉴임)
    const prevCocktail = getCocktailAt(-1); // 이전 칵테일 메뉴
    const nextCocktail = getCocktailAt(1); // 다음 칵테일 메뉴

    // ********************************* gsap 애니메이션 수행 함수
    useGSAP(() => {
        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 }); // 메뉴 제목이 서서히 나타남
        gsap.fromTo(
            '.cocktail img', // 칵테일 이미지가
            { opacity: 0, xPercent: -100 }, // 좌측에서..
            {
                xPercent: 0, // 원래 자리로...
                opacity: 1, // 서서히 나타남
                duration: 1,
                ease: 'power1.inOut',
            }
        );
        gsap.fromTo(
            '.details h2', // 레시피 제목이..
            { yPercent: 100, opacity: 0 }, // 아래에서 부터
            {
                yPercent: 0, // 원래 위치로
                opacity: 1, // 서서히 나타남
                ease: 'power1.inOut',
            }
        );
        gsap.fromTo(
            '.details p', // 레시피 상세설명 문구가..
            { yPercent: 100, opacity: 0 }, // 아래에서 부터
            {
                yPercent: 0, // 원래 위치로
                opacity: 1, // 서서히 나타남
                ease: 'power1.inOut',
            }
        );
    }, [currentIndex]); // 현재 선택 순서가 변경될 때마다 애니메이션 실행

    return (
        <section id='menu' aria-labelledby='menu-heading'>
            {/* ---------- 화면 좌/우 나뭇잎 이미지 ---------- */}
            <img
                src='/images/slider-left-leaf.png'
                alt='left-leaf'
                id='m-left-leaf'
            />
            <img
                src='/images/slider-right-leaf.png'
                alt='right-leaf'
                id='m-right-leaf'
            />

            {/* ---------- 섹션 타이틀 ---------- */}
            <h2 id='menu-heading' className='sr-only'>
                Cocktail Menu
            </h2>
            {/* ---------- 메뉴 리스트 ---------- */}
            <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
                {sliderLists.map((cocktail, index) => {
                    const isActive = index === currentIndex; // 현재 선택된 메뉴인지 여부 저장
                    return (
                        <button
                            key={cocktail.id}
                            className={`
                        ${
                            isActive
                                ? 'text-white border-white' // 선택 메뉴면 흰색
                                : 'text-white/50 border-white/50' // 선택 메뉴가 아니면 회색(흰색 50%)
                        }
                     `}
                            onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    );
                })}
            </nav>

            <div className='content'>
                {/* ---------- 좌/우 이동 화살표 ---------- */}
                <div className='arrows'>
                    <button
                        className='text-left'
                        onClick={() => goToSlide(currentIndex - 1)}
                    >
                        <span>{prevCocktail.name}</span>
                        <img
                            src='/images/right-arrow.png'
                            alt='right-arrow'
                            aria-hidden='true'
                        />
                    </button>
                    <button
                        className='text-left'
                        onClick={() => goToSlide(currentIndex + 1)}
                    >
                        <span>{nextCocktail.name}</span>
                        <img
                            src='/images/left-arrow.png'
                            alt='left-arrow'
                            aria-hidden='true'
                        />
                    </button>
                </div>
                {/* ---------- 현재 선택된 칵테일 메뉴 이미지 ---------- */}
                <div className='cocktail'>
                    <img
                        src={currentCocktail.image}
                        className='object-contain'
                    />
                </div>
                {/* ---------- 현재 선택된 칵테일 메뉴 레시피문구 ---------- */}
                <div className='recipe'>
                    <div ref={contentRef} className='info'>
                        <p>Recipe for:</p>
                        <p id='title'>{currentCocktail.name}</p>
                    </div>
                    <div className='details'>
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default CocktailMenu;
