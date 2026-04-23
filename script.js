// 1. 스토리 데이터 (백엔드 데이터 역할을 수행)
var 선배="아섭선배";
const storyData = {
    start: {
        text: "연습이 끝난 방과 후 운동장. 저 멀리서 아섭선배가 땀을 닦으며 걸어온다.",
        character: "images/선배1.png", // 지정하신 파일 경로
        background: "images/배경1.jpg",
        name: "나",
        choices: [
            { text: 선배+", 오늘 연습 고생하셨어요!", next: "praise", score: 10 },
            { text: "아직도 안 가셨어요? 지독한 연습벌레네요.", next: "tease" ,score: 5},
            { text: 선배+", 사랑해요", next: "거절", score: -10 }
        ]
    },
    praise: {
        text: "어, 너 있었노? (선배가 쑥스러운 듯 웃으며) 고맙데이. 덕분에 힘이 나노.",
        character: "images/선배_웃음.png",
        background: "images/배경1.jpg",
        name: 선배,
        choices: [
            { text: "같이 시원한 거 마시러 갈까요?", next: "cafe", score: 0 },
            { text: "내일 경기 꼭 보러 갈게요!", next: "stadium", score: 10 }
        ]
    },
    tease: {
        text: "프로가 될라믄 이 정도는 해야한데이. 니도 참 별나다.",
        character: "images/선배_당황.png",
        background: "images/배경1.jpg",
        name: 선배,
        choices: [
            { text: "기분 나쁘셨다면 죄송해요.", next: "tease1" },
            { text: "멋있어서 그래요, 멋있어서!", next: "praise" }
        ]
    },
    tease1: {
        text: "아니, 기분 나쁘다기보단.. (선배가 잠시 생각하다가) 그래도 고맙데이.",
        character: "images/선배_당황.png",
        background: "images/배경1.jpg",
        name: 선배,
        choices: [
            { text: "그래도 선배는 멋있어요!", next: "day1end" }
        ]
    },
    거절:{
        text: "음.. 그런 말은 좀.. (선배가 당황한 표정으로) 고마워, 하지만 난 그냥 친구로 생각해.",
        character: "images/선배_당황.png",
        background: "images/배경1.jpg",
        name: 선배,
        choices: [
            { text: "아, 네.. 이해해요.", next: "start" },
            { text: "그럼 친구로서 더 친하게 지내요!", next: "praise" }
        ]
    },
    day1end: {
        text: "선배가 잠시 멈칫하다가, 갑자기 웃으며 말한다. (선배가 웃으며) 어디서 이런후배가 왔노 니 오늘부터 내 꼬붕해라.",
        character: "images/선배_웃음.png",
        background: "images/배경1.jpg",
        name: 선배,
        choices: [
            { text: "(헉 너무 잘생긴 선배의 꼬붕이라니)ㅎ..헉 좋아요..!!!! 그럼 내일 봐요 선배!!", next: "day2start" }
        ]
    },  
    // 여기에 계속해서 분기를 추가할 수 있습니다.
    
};
function checkEnding() {
    if (loveScore >= 80) {
        renderScene("happy_ending"); // 고백 성공!
    } else if (loveScore >= 40) {
        renderScene("normal_ending"); // 그냥 친한 선후배
    } else {
        renderScene("bad_ending"); // 모르는 사이가 됨
    }
}

// 2. 게임 엔진 로직
let currentScene = "start";
let loveScore = 0; // 호감도 점수




function renderScene(sceneKey, earnedScore = 0) {
    loveScore += earnedScore; // 선택에 따른 점수 반영
    updateLoveUI(); // UI 업데이트 (호감도 점수 표시)
    currentScene = sceneKey;
    const scene = storyData[sceneKey];
    
    
    // 텍스트 및 이름 변경
    document.getElementById("dialogue-box").innerText = scene.text;
    document.getElementById("name-box").innerText = scene.name;
    
    // 이미지 변경
    document.getElementById("background").style.backgroundImage = `url('${scene.background}')`;
    document.getElementById("character-img").src = scene.character;
    
    // 선택지 초기화 및 생성
    const choiceContainer = document.getElementById("choice-container");
    choiceContainer.innerHTML = "";
    
    scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.onclick = () => renderScene(choice.next, choice.score || 0);
        choiceContainer.appendChild(button);
    });
}

// 화면에 호감도를 표시하는 함수
function updateLoveUI() {
    const scoreElement = document.getElementById("love-status");
    if (scoreElement) {
        scoreElement.innerText = `선배와의 호감도: ${loveScore} ❤️`;
    }
}

// script.js
// 메뉴 열고 닫기 로직
const menuBtn = document.getElementById('menu-btn');
const menuModal = document.getElementById('menu-modal');
const closeBtn = document.getElementById('close-menu');

menuBtn.onclick = () => menuModal.classList.remove('hidden');
closeBtn.onclick = () => menuModal.classList.add('hidden');

// 메뉴 열기
function openMenu() {
    const modal = document.getElementById('menu-modal');
    modal.classList.remove('hidden');
    console.log("메뉴 열림"); // 확인용
}

// 메뉴 닫기
function closeMenu() {
    const modal = document.getElementById('menu-modal');
    modal.classList.add('hidden');
}

// 저장 기능 (다시 점검)
function saveGame() {
    // currentScene은 현재 진행 중인 스토리의 키값 (예: 'scene_01')
    localStorage.setItem('sunbae_save_point', currentScene);
    localStorage.setItem('sunbae_love_score', loveScore);
    // 호감도 점수도 같이 저장하고 싶다면?
    // localStorage.setItem('sunbae_love_score', loveScore);
    
    alert("선배와의 추억이 저장되었습니다!");
    menuModal.classList.add('hidden');
}

// 불러오기 기능 (다시 점검)
function loadGame() {
    const savedData = localStorage.getItem('sunbae_save_point');
    const savedScore = localStorage.getItem('sunbae_love_score');

    if (savedData && storyData[savedData]&& savedScore) {
        console.log("불러온 데이터: " + savedData); // 확인용
        renderScene(savedData);
        loveScore = parseInt(savedScore) || 0; // 저장된 점수 불러오기
        renderScene(savedScene, 0); // 불러올 때는 점수를 더하지 않음 (0)
        alert("데이터를 성공적으로 불러왔습니다.");
        closeMenu();
    } else if (savedData) {
        alert("저장된 데이터가 손상되었거나 스토리가 변경되었습니다. 처음부터 시작합니다.");
        resetGame();
    } else {
        alert("저장된 기록이 없습니다.");
    }
}

function resetGame() {
    if (confirm("정말 처음부터 다시 시작하시겠어요?")) {
        currentScene = 'start';
        loveScore = 0;
        updateLoveUI();
        renderScene(currentScene);
        menuModal.classList.add('hidden');
        alert("게임이 초기화되었습니다.");
    }
}

// 초기 실행
renderScene("start");
