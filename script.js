// 1. 스토리 데이터 (백엔드 데이터 역할을 수행)
var 선배="아섭선배";
const storyData = {
    start: {
        text: "연습이 끝난 방과 후 운동장. 저 멀리서 아섭선배가 땀을 닦으며 걸어온다.",
        character: "images/선배1.png", // 지정하신 파일 경로
        background: "images/배경1.jpg",
        name: "나",
        choices: [
            { text: 선배+", 오늘 연습 고생하셨어요!", next: "praise" },
            { text: "아직도 안 가셨어요? 지독한 연습벌레네요.", next: "tease" },
            { text: 선배+", 사랑해요", next: "거절" }
        ]
    },
    praise: {
        text: "어, 너 있었구나? (선배가 쑥스러운 듯 웃으며) 고맙다. 덕분에 힘이 나네.",
        character: "images/선배_웃음.png",
        background: "images/배경1.jpg",
        name: 선배,
        choices: [
            { text: "같이 시원한 거 마시러 갈까요?", next: "cafe" },
            { text: "내일 경기 꼭 보러 갈게요!", next: "stadium" }
        ]
    },
    tease: {
        text: "뭐? 하긴, 프로가 되려면 이 정도는 당연하지. 너도 참 별나다.",
        character: "images/선배_당황.png",
        background: "images/배경1.jpg",
        name: "아섭선배",
        choices: [
            { text: "기분 나쁘셨다면 죄송해요.", next: "start" },
            { text: "멋있어서 그래요, 멋있어서!", next: "praise" }
        ]
    },
    거절:{
        text: "음.. 그런 말은 좀.. (선배가 당황한 표정으로) 고마워, 하지만 난 그냥 친구로 생각해.",
        character: "images/선배_당황.png",
        background: "images/배경1.jpg",
        name: "아섭선배",
        choices: [
            { text: "아, 네.. 이해해요.", next: "start" },
            { text: "그럼 친구로서 더 친하게 지내요!", next: "praise" }
        ]
    }
    // 여기에 계속해서 분기를 추가할 수 있습니다.
};

// 2. 게임 엔진 로직
let currentScene = "start";

function renderScene(sceneKey) {
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
        button.onclick = () => renderScene(choice.next);
        choiceContainer.appendChild(button);
    });
}

// 메뉴 열고 닫기 로직
const menuBtn = document.getElementById('menu-btn');
const menuModal = document.getElementById('menu-modal');
const closeBtn = document.getElementById('close-menu');

menuBtn.onclick = () => menuModal.classList.remove('hidden');
closeBtn.onclick = () => menuModal.classList.add('hidden');

// 저장 기능
function saveGame() {
    // currentScene은 현재 진행 중인 스토리의 키값 (예: 'scene_01')
    localStorage.setItem('sunbae_save_point', currentScene);
    // 호감도 점수도 같이 저장하고 싶다면?
    // localStorage.setItem('sunbae_love_score', loveScore);
    
    alert("선배와의 추억이 저장되었습니다!");
    menuModal.classList.add('hidden');
}

// 불러오기 기능
function loadGame() {
    const savedScene = localStorage.getItem('sunbae_save_point');
    
    if (savedScene && storyData[savedScene]) {
        currentScene = savedScene;
        renderScene(currentScene);
        alert("이전에 멈췄던 곳에서 시작합니다.");
    } else {
        alert("저장된 기록이 없습니다!");
    }
    menuModal.classList.add('hidden');
}

// 처음부터 기능
function resetGame() {
    if (confirm("정말 처음부터 다시 시작하시겠어요?")) {
        currentScene = 'start';
        renderScene(currentScene);
        menuModal.classList.add('hidden');
    }
}

// 초기 실행
renderScene("start");
