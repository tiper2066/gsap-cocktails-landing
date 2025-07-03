'use client'; // ******************** client-side 훅
import { useGSAP } from '@gsap/react'; // ******************** useGSAP 훅
import { SplitText } from 'gsap/all'; // ******************** gsap 플러그인
import gsap from 'gsap'; // ******************** gsap 라이브러리
import { openingHours, socials } from '@/constants'; // 가계 오픈 시간, SNS 정보 데이터

const Contact = () => {
    // ******************** GSAP 애니메이션 실행 함수
    useGSAP(() => {
        // 섹션 타이틀을 단어로 분리한 배열 생성
        const titleSplit = SplitText.create('#contact h2', { type: 'words' });
        // 스크롤 트리거 애니메이션 선언
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact', // contact 컨테이너 요소를 대상
                start: 'top center', // contact 컨테이너 상단이 화면 중앙에 접근하면
            },
            ease: 'power1.inOut', // 애니메이션 시작
        });
        // 애니메이션 설정들 정리
        timeline
            // 세션 타이틀 애니메이션 시작
            .from(titleSplit.words, {
                opacity: 0, // 서서히 나타나면서..
                yPercent: 100, // 아래에서 올라오면서...
                stagger: 0.02, // 0.02 초 마다
            })
            // 가계 주소 애니메이션 시작
            .from('#contact h3, #contact p', {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
            })
            // 우측 나뭇잎 애니메이션
            .to('#f-right-leaf', {
                y: '-50',
                duration: 1,
                ease: 'power1.inOut',
            })
            // 좌측 나뭇잎 애니메이션
            .to(
                '#f-left-leaf',
                {
                    y: '-50',
                    duration: 1,
                    ease: 'power1.inOut',
                },
                '<' // 이전 나뭇잎 애니메이션과 같은 시간에 움직인다.
            );
    });

    return (
        <footer id='contact'>
            {/* ----------- 좌/우 나뭇잎 ----------- */}
            <img
                src='/images/footer-right-leaf.png'
                alt='leaf-right'
                id='f-right-leaf'
            />
            <img
                src='/images/footer-left-leaf.png'
                alt='leaf-left'
                id='f-left-leaf'
            />
            {/* ----------- 섹션 컨턴츠 영역 ----------- */}
            <div className='content'>
                {/* ----------- 섹션 타이틀 ----------- */}
                <h2>Where to Find Us</h2>
                {/* ----------- 가계 주소 ----------- */}
                <div>
                    <h3>Visit Our Bar</h3>
                    <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
                </div>
                {/* ----------- 가계 연락처, 이메일 ----------- */}
                <div>
                    <h3>Contact Us</h3>
                    <p>(555) 987-6543</p>
                    <p>hello@jsmcocktail.com</p>
                </div>
                {/* ----------- 오픈 시간 정보 ----------- */}
                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    ))}
                </div>
                {/* ----------- 소셜 링크 영역 ----------- */}
                <div>
                    <h3>Socials</h3>
                    {/* ----------- 소셜 링크 아이콘 ----------- */}
                    <div className='flex-center gap-5'>
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={social.name}
                            >
                                <img src={social.icon} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Contact;
