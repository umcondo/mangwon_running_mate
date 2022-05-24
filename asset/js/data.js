// data 형식 객체
// CourseData 배열 - 객체 courseName(코스 이름), courseDistance(코스 거리), coursePath(코스경로), courseInfo(코스 설명)
const CourseData = [
  {
    id: 0,
    courseName: "망원 - 선유도공원",
    courseDistance: "2~3km",
    courseDestination: "선유도공원",
    coursePath: `망원한강공원 → 양화대교 → 선유도공원`,
    courseInfo: `<b>선유도공원을 경유하는 코스</b> 
    <ul>
      <li>비교적 사람들이 붐비는 코스다. 
      <li>양화대교를 올라갈 때 계단을 올라가야 하므로 주의해야 한다. 
      <li>다리 위에서의 한강과 서울 서쪽의 경관을 즐길 수 있다.
      <li>한강 가운데의 섬, 선유도를 체험해 볼 수 있다.
    </ul>`,
  },
  {
    id: 1,
    courseName: "망원 - 홍제천",
    courseDistance: "편도 5km",
    courseDestination: "홍제천",
    coursePath: `망원한강공원 → 홍제천 합수부 → 홍제천 인공폭포`,
    courseInfo: `<b>홍제천을 달리는 코스</b>
    <ul>
      <li>달리기, 걷기를 위한 트랙이 잘 깔려 있다. 
      <li>홍제천은 한강에 비해 비교적 사람이 적다. 
      <li>도착지점에서 안산과 인공폭포를 볼 수 있다.
      <li>초심자라면 도중 돌아오는 것을 추천한다.
    </ul>`,
  },
  {
    id: 2,
    courseName: "경의선 숲길",
    courseDistance: "편도 4~5km",
    courseDestination: "경의선 숲길",
    coursePath: "경의선숲길(연남) → 경의선숲길(홍대) → 경의선숲길(공덕)",
    courseInfo: `<b>경의선숲길을 달리는 코스</b> 
    <ul>
      <li>옛 경의선 길을 이어 달리며 주변 마포의 경관을 볼 수 있다.
      <li>중간에 횡단보도를 몇 개 지나야 하므로 안전에 유의해야 한다.
      <li>연남, 홍대, 공덕 곳곳의 맛집을 찾아가 보는 것도 추천한다.
    </ul>`,
  },
  {
    id: 3,
    courseName: "망원 - 당인리발전소 - 상수",
    courseDistance: "3km",
    courseDestination: "당인리발전소",
    coursePath: `망원한강공원 → 절두산순교지 → 당인리 발전소 → 상수나들목`,
    courseInfo: `<b>당인리 발전소 앞 길을 달리는 코스</b>
    <ul>
      <li>한강에서 절두산 순교지로 들어갈 때 높은 계단을 올라야 한다. 
      <li>비교적 한적하고 동네의 분위기가 조용하다.
      <li>합정에서 당인리발전소로 이어지는 길에는 여러 아기자기한 카페, 가게들이 있다. 
      <li>벚꽃이 피는 시기에는 다른 벚꽃축제 못지않은 광경을 볼 수 있다.
    </ul>`,
  },

  {
    id: 4,
    courseName: "망원 - 마포대교 왕복",
    courseDistance: "9km",
    courseDestination: "마포대교",
    coursePath: `망원한강공원 → 마포대교 → 망원한강공원`,
    courseInfo: `<b>망원에서 마포대교까지 왕복하는 코스</b> 
    <ul>
      <li>마포구의 한강 길을 거의 다 경험해 볼 수 있다.
      <li>양화대교부터는 대부분이 운동하러 나온 사람들이라 비교적 한산하다.
      <li>상수나들목쯤에선 밤섬도 볼 수 있고, 건너편으로 국회의사당을 볼 수 있다.
    </ul>`,
  },
  {
    id: 5,
    courseName: "망원 - 가양대교 왕복",
    courseDistance: "9km",
    courseDestination: "가양대교",
    coursePath: `망원한강공원 → 가양대교 → 망원한강공원`,
    courseInfo: `<b>망원에서 가양대교까지 왕복하는 코스</b>
    <ul>
      <li>마포대교 왕복 코스에 비해 사람이 적다.
      <li>마포대교 코스보다 길이 넓고 생태공원이 잘 갖춰져 있다.
      <li>트랙으로 가도 되지만 생태공원 흙길로 자연 광경을 보며 뛰는 것도 추천한다. 
      <li>중간에 난지공원, 월드컵공원으로 갈 수 있으며, 행주산성까지 이어져 있다.
    </ul>`,
  },
  {
    id: 6,
    courseName: "마포 한바퀴",
    courseDistance: "10km",
    courseDestination: "홍대, 상수, 망원, 연남",
    coursePath: `망원한강공원 → 상수나들목 → 상수역 → 홍대앞 → 경의선책거리 → 경의선 숲길(연남동) → 홍제천 → 망원한강공원`,
    courseInfo: `<b>마포 이곳저곳을 한번에 볼 수 있는 종합코스</b>
    <ul>
      <li>한강, 상수, 홍대, 연남, 홍제천 등의 마포의 볼거리를 경험할 수 있다.
      <li>비교적 사람들이 많아 둘러보는 재미가 있다.
      <li>상수, 홍대 앞에서 횡단보도가 있고, 보도가 좁으므로 안전한 러닝을 필요로 한다. 
    </ul>`,
  },
  {
    id: 7,
    courseName: "망원 - 난지도 왕복",
    courseDistance: "10km",
    courseDestination: "난지도",
    coursePath: `망원한강공원 → 월드컵대교 → 난지도(월드컵공원) → 평화의공원(월드컵공원) → 홍제천 → 망원한강공원`,
    courseInfo: `<b>한강과 난지도를 같이 경험할 수 있는 코스</b> 
    <ul>
      <li>인파가 드물고 길이 넓어 지인들과 함께 달리기 좋은 코스다.
      <li>난지도 공원 언덕을 700m쯤 달리면 하늘공원이 나타난다. 
      <li>체력이 가능하다면 하늘공원을 코스에 넣는 것도 추천한다.
    </ul>`,
  },
];

// 질문 배열 - 객체 question(질문 제목), answer1(답변 선택지 1), answer2(답변 선택지 2)
const Question = [
  {
    id: 0,
    img: "./image/icons-difficulty.png",
    question: `러닝 <span>난이도</span>를 선택해주세요`,
    answer: [
      {
        text: `걷고, 뛰면서 천천히 산책하듯 <br> 뛰고 싶어요`,
        value: "beginner",
      },
      {
        text: `왕복코스, 마포 이곳저곳, <br>10km 이내로 길게 뛰고 싶어요`,
        value: "intermediate",
      },
    ],
  },
  {
    id: 1,
    img: "./image/icons-river.png",
    question: `<span>어디</span>를 더 가보고 싶으신가요?`,
    answer: [
      {
        text: `한강 가보고 싶어요. <br>물을 보면서 달리고 싶어요`,
        value: "Hangang",
      },
      {
        text: `내륙쪽으로 가보고 싶어요. <br>거리, 공원에서 달리고 싶어요`,
        value: "inland",
      },
    ],
  },
  {
    id: 2,
    img: "./image/icons-crowd.png",
    question: `달릴 때 주변 <span>혼잡도</span>는 어느정도가 괜찮나요?`,
    answer: [
      {
        text: `사람 구경하면서 달리고 싶어요`,
        value: "loud",
      },
      {
        text: `조용한 환경에서 달리고 싶어요`,
        value: "quiet",
      },
    ],
  },
];

// coordinates 객체안에 id, Mapcenter(맵의 중심좌표), track(코스의 트랙좌표)
const coordinates = [
  {
    id: 0,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.54736757228941,
      lat: 126.90032767884799,
    },
    track: [
      {
        id: 0,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "양화대교 계단",
        lng: 37.54660785408243,
        lat: 126.90787645923875,
        display: "y",
      },
      {
        id: 2,
        coordinatesName: "선유도 입구",
        lng: 37.54214811702986,
        lat: 126.90256372823616,
        display: "y",
      },
      {
        id: 3,
        coordinatesName: "선유도 전망대",
        lng: 37.544374122554245,
        lat: 126.8978988348067,
        display: "y",
      },
    ],
  },
  {
    id: 1,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.568973491762506,
      lat: 126.92275825560569,
    },
    track: [
      {
        id: 0,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "홍제천 합수부",
        lng: 37.558979,
        lat: 126.893209,
        display: "y",
      },
      {
        id: 2,
        coordinatesName: "홍제천",
        lng: 37.56217080893893,
        lat: 126.90018344725907,
        display: "y",
      },
      {
        id: 3,
        coordinatesName: "홍제천",
        lng: 37.56546873401136,
        lat: 126.91181483465357,
      },

      {
        id: 4,
        coordinatesName: "홍제천 연남",
        lng: 37.567877,
        lat: 126.917174,
        display: "y",
      },
      {
        id: 5,
        coordinatesName: "홍제천",
        lng: 37.57535377224409,
        lat: 126.92655353550624,
        display: "y",
      },
      {
        id: 6,
        coordinatesName: "홍제천",
        lng: 37.57535377224409,
        lat: 126.92655353550624,
      },
      {
        id: 7,
        coordinatesName: "홍제천 인공폭포",
        lng: 37.58145,
        lat: 126.937487,
        display: "y",
      },
    ],
  },
  {
    id: 2,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.55412999600038,
      lat: 126.93282148067331,
    },
    track: [
      {
        id: 0,
        coordinatesName: "경의선 숲길(연남)",
        lng: 37.56660916875451,
        lat: 126.91904634477453,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "경의선 숲길(연남)",
        lng: 37.55855854980043,
        lat: 126.92556279250387,
        // display: "y",
      },
      {
        id: 2,
        coordinatesName: "경의선 책거리(홍대)",
        lng: 37.55674017664135,
        lat: 126.92821290311338,
        display: "y",
      },
      {
        id: 3,
        coordinatesName: "경의선 숲길(홍대)",
        lng: 37.55340974789679,
        lat: 126.93379539140172,
      },
      {
        id: 4,
        coordinatesName: "경의선 숲길(서강대)",
        lng: 37.55094280904419,
        lat: 126.93707940286717,
        display: "y",
      },
      {
        id: 5,
        coordinatesName: "경의선 숲길(대흥)",
        lng: 37.54711553190402,
        lat: 126.94088482097798,
      },
      {
        id: 6,
        coordinatesName: "경의선 숲길(공덕)",
        lng: 37.54415477841195,
        lat: 126.94842336663757,
        display: "y",
      },
    ],
  },
  {
    id: 3,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.54640285763314,
      lat: 126.91078491444449,
    },
    track: [
      {
        id: 0,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "절두산 순교지",
        lng: 37.544289952951836,
        lat: 126.91070256504536,

        display: "y",
      },
      {
        id: 2,
        coordinatesName: "합정",
        lng: 37.5457368884024,
        lat: 126.9118097938179,
      },
      {
        id: 3,
        coordinatesName: "당인리 발전소 앞",
        lng: 37.545407786809856,
        lat: 126.9177226947106,
        display: "y",
      },
      {
        id: 4,
        coordinatesName: "상수동 사거리",
        lng: 37.54498330627045,
        lat: 126.92290011730464,
        display: "y",
      },

      {
        id: 5,
        coordinatesName: "상수 나들목 입구",
        lng: 37.54480026864445,
        lat: 126.92549726437286,
      },
      {
        id: 6,
        coordinatesName: "상수한강공원",
        lng: 37.54423268950395,
        lat: 126.92557703866774,
        display: "y",
      },
    ],
  },
  {
    id: 4,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.54374257921535,
      lat: 126.92011210863753,
    },
    track: [
      {
        id: 0,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "절두산 순교지",
        lng: 37.544289952951836,
        lat: 126.91070256504536,
        display: "y",
      },
      {
        id: 2,
        coordinatesName: "합정한강공원",
        lng: 37.54259664005606,
        lat: 126.91768052250549,
        display: "n",
      },
      {
        id: 3,
        coordinatesName: "상수나들목",
        lng: 37.54423268950395,
        lat: 126.92557703866774,
        display: "y",
      },
      {
        id: 4,
        coordinatesName: "서강한강공원",
        lng: 37.541543670495,
        lat: 126.93393035263757,
        display: "n",
      },

      {
        id: 5,
        coordinatesName: "서강한강공원",
        lng: 37.54163530712178,
        lat: 126.93673645277029,
        display: "n",
      },
      {
        id: 6,
        coordinatesName: "서강한강공원",
        lng: 37.540307620084974,
        lat: 126.9391872818973,
        display: "n",
      },
      {
        id: 7,
        coordinatesName: "마교대교",
        lng: 37.53670517685796,
        lat: 126.94229038079037,
        display: "y",
      },
    ],
  },
  {
    id: 5,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.561804756760324,
      lat: 126.8841006543737,
    },
    track: [
      {
        id: 0,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "한강 합수부",
        lng: 37.558979,
        lat: 126.893209,
        display: "n",
      },
      {
        id: 2,
        coordinatesName: "월드컵공원 앞",
        lng: 37.561772946210276,
        lat: 126.88849219895997,
        display: "y",
      },
      {
        id: 3,
        coordinatesName: "난지공원 앞",
        lng: 37.56718680133595,
        lat: 126.8782290194203,
        display: "y",
      },
      {
        id: 4,
        coordinatesName: "가양대교",
        lng: 37.57488502630036,
        lat: 126.8650849726496,
        display: "y",
      },
      {
        id: 5,
        coordinatesName: "난지공원 앞",
        lng: 37.56718680133595,
        lat: 126.8782290194203,
        display: "n",
      },
      {
        id: 6,
        coordinatesName: "월드컵공원 앞",
        lng: 37.561772946210276,
        lat: 126.88849219895997,
        display: "n",
      },
      {
        id: 7,
        coordinatesName: "한강 합수부",
        lng: 37.558979,
        lat: 126.893209,
        display: "n",
      },
      {
        id: 8,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "n",
      },
    ],
  },
  {
    id: 6,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.55422540293601,
      lat: 126.91331063111693,
    },
    track: [
      {
        id: 0,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "절두산 순교지",
        lng: 37.544289952951836,
        lat: 126.91070256504536,
        display: "y",
      },
      {
        id: 2,
        coordinatesName: "합정한강공원",
        lng: 37.54259664005606,
        lat: 126.91768052250549,
        display: "n",
      },
      {
        id: 3,
        coordinatesName: "상수나들목",
        lng: 37.54423268950395,
        lat: 126.92557703866774,
        display: "y",
      },

      {
        id: 4,
        coordinatesName: "상수 나들목 입구",
        lng: 37.54480026864445,
        lat: 126.92549726437286,
        display: "n",
      },
      {
        id: 5,
        coordinatesName: "상수동 사거리",
        lng: 37.54498330627045,
        lat: 126.92290011730464,
        display: "n",
      },
      {
        id: 6,
        coordinatesName: "홍대 클럽 거리",
        lng: 37.55075435700691,
        lat: 126.92313748044144,
        display: "y",
      },
      {
        id: 7,
        coordinatesName: "홍대 앞",
        lng: 37.55289944755489,
        lat: 126.92424433840836,
        display: "y",
      },
      {
        id: 8,
        coordinatesName: "홍대 앞",
        lng: 37.55321610010108,
        lat: 126.92630371115818,
        display: "n",
      },
      {
        id: 9,
        coordinatesName: "홍대 앞",
        lng: 37.553604741544476,
        lat: 126.92827249600997,
        display: "n",
      },
      {
        id: 10,
        coordinatesName: "산울림 소극장",
        lng: 37.55464204134814,
        lat: 126.93019542784862,
        display: "y",
      },
      {
        id: 11,
        coordinatesName: "경의선 책거리",
        lng: 37.55476010357872,
        lat: 126.93179104713266,
        display: "y",
      },
      {
        id: 12,
        coordinatesName: "경의선 숲길(연남)",
        lng: 37.55855854980043,
        lat: 126.92556279250387,
        display: "y",
      },
      {
        id: 13,
        coordinatesName: "경의선 숲길(연남)",
        lng: 37.56660916875451,
        lat: 126.91904634477453,
        display: "y",
      },
      {
        id: 14,
        coordinatesName: "홍제천(연남)",
        lng: 37.56757620417698,
        lat: 126.91683806053365,
        display: "y",
      },
      {
        id: 15,
        coordinatesName: "홍제천",
        lng: 37.56546873401136,
        lat: 126.91181483465357,
        display: "y",
      },
      {
        id: 16,
        coordinatesName: "홍제천",
        lng: 37.56217080893893,
        lat: 126.90018344725907,
        // display: "y",
      },
      {
        id: 17,
        coordinatesName: "한강 합수부",
        lng: 37.558979,
        lat: 126.893209,
        display: "y",
      },
      {
        id: 18,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
      },
    ],
  },
  {
    id: 7,
    MapCenter: {
      coordinatesName: "지도 가운데",
      mapDepthLevel: 7,
      lng: 37.56468623796848,
      lat: 126.88237574385846,
    },
    track: [
      {
        id: 0,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "y",
      },
      {
        id: 1,
        coordinatesName: "한강 합수부",
        lng: 37.558979,
        lat: 126.893209,
        display: "n",
      },
      {
        id: 2,
        coordinatesName: "월드컵공원 앞",
        lng: 37.561772946210276,
        lat: 126.88849219895997,
        display: "n",
      },
      {
        id: 3,
        coordinatesName: "난지공원 앞",
        lng: 37.56741162878039,
        lat: 126.87782116441814,
        display: "y",
      },

      {
        id: 4,
        coordinatesName: "난지공원 시작",
        lng: 37.56818709104538,
        lat: 126.87840849913619,
        display: "n",
      },
      {
        id: 5,
        coordinatesName: "난지공원 1",
        lng: 37.57527417680263,
        lat: 126.86660119449508,
        display: "n",
      },
      {
        id: 6,
        coordinatesName: "난지공원",
        lng: 37.57589611060701,
        lat: 126.86682083327374,
        display: "y",
      },
      {
        id: 7,
        coordinatesName: "난지공원 3",
        lng: 37.57733078670618,
        lat: 126.86869184390551,
        display: "n",
      },
      {
        id: 8,
        coordinatesName: "난지공원",
        lng: 37.57878036525317,
        lat: 126.87608181945515,
        display: "y",
      },
      {
        id: 9,
        coordinatesName: "난지공원",
        lng: 37.57373314660471,
        lat: 126.88330108422132,
        display: "y",
      },
      {
        id: 10,
        coordinatesName: "난지공원",
        lng: 37.57385065553365,
        lat: 126.8836857847387,
        display: "n",
      },
      {
        id: 11,
        coordinatesName: "난지공원",
        lng: 37.56661406152009,
        lat: 126.89146188516106,
        display: "n",
      },
      {
        id: 12,
        coordinatesName: "하늘 계단 앞",
        lng: 37.565883932977904,
        lat: 126.89111205832816,
        display: "n",
      },
      {
        id: 13,
        coordinatesName: "월드컵공원",
        lng: 37.565042804701264,
        lat: 126.89253378979066,
        display: "y",
      },
      {
        id: 14,
        coordinatesName: "월드컵공원 2",
        lng: 37.565290820029254,
        lat: 126.89279942576994,
        display: "n",
      },
      {
        id: 15,
        coordinatesName: "월드컵공원 3",
        lng: 37.564625085980936,
        lat: 126.8939096142168,
        display: "n",
      },
      {
        id: 16,
        coordinatesName: "월드컵공원 4",
        lng: 37.561901973743474,
        lat: 126.89159322271496,
        display: "n",
      },
      {
        id: 17,
        coordinatesName: "평화의공원",
        lng: 37.5616681091516,
        lat: 126.8920236558886,
        display: "n",
      },
      {
        id: 18,
        coordinatesName: "월드컵공원 6",
        lng: 37.56195723679616,
        lat: 126.89291172638012,
        display: "n",
      },
      {
        id: 19,
        coordinatesName: "월드컵공원 7",
        lng: 37.561615884898586,
        lat: 126.89404970047485,
        display: "n",
      },
      {
        id: 20,
        coordinatesName: "월드컵공원 8",
        lng: 37.56202287901656,
        lat: 126.89578648709657,
        display: "n",
      },
      {
        id: 21,
        coordinatesName: "월드컵공원 놀이터",
        lng: 37.56161336970386,
        lat: 126.89629072023077,
        display: "n",
      },
      {
        id: 22,
        coordinatesName: "홍제천",
        lng: 37.561730925585564,
        lat: 126.89677724338655,
        display: "y",
      },
      {
        id: 23,
        coordinatesName: "홍제천",
        lng: 37.56087198489062,
        lat: 126.89593239656412,
        display: "n",
      },
      {
        id: 24,
        coordinatesName: "한강 합수부",
        lng: 37.55935517313117,
        lat: 126.89243160937251,
        display: "n",
      },
      {
        id: 25,
        coordinatesName: "망원한강공원",
        lng: 37.554862,
        lat: 126.896258,
        display: "n",
      },
    ],
  },
];
