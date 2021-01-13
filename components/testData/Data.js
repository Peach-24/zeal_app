// initial example challenge set
export const challengeSet = [
  {
    challengeNum: 1,
    topic: "Portrait",
  },
  {
    challengeNum: 2,
    topic: "Rule of Thirds",
  },
  {
    challengeNum: 3,
    topic: "Texture",
  },
  {
    challengeNum: 4,
    topic: "Reflections",
  },
  {
    challengeNum: 5,
    topic: "Black & White",
  },
];

const mixSet = {
  id: 1,
  setTitle: "Mix",
  challenges: [
    {
      name: "challenge1",
      topic: "Portrait",
      desc: "",
    },
    {
      name: "challenge2",
      topic: "Rule of Thirds",
      desc: "",
    },
    {
      name: "challenge3",
      topic: "Texture",
      desc: "",
    },
    {
      name: "challenge4",
      topic: "Reflections",
      desc: "",
    },
    {
      name: "challenge5",
      topic: "Black & White",
      desc: "",
    },
  ],
};

const techSet = {
  id: 2,
  setTitle: "Technical",
  challenges: [
    {
      name: "challenge1",
      topic: "Leading Lines",
      desc: "",
    },
    {
      name: "challenge2",
      topic: "Frame in a Frame",
      desc: "",
    },
    {
      name: "challenge3",
      topic: "Low Angle",
      desc: "",
    },
    {
      name: "challenge4",
      topic: "Rule of Thirds",
      desc: "",
    },
    {
      name: "challenge5",
      topic: "Macro",
      desc: "",
    },
  ],
};

const creativeSet = {
  id: 3,
  setTitle: "Creative",
  challenges: [
    {
      name: "challenge1",
      topic: "Comfort",
      desc: "",
    },
    {
      name: "challenge2",
      topic: "Resilience",
      desc: "",
    },
    {
      name: "challenge3",
      topic: "Precision",
      desc: "",
    },
    {
      name: "challenge4",
      topic: "Connection",
      desc: "",
    },
    {
      name: "challenge5",
      topic: "Opposites",
      desc: "",
    },
  ],
};

export const challengeSets = [techSet, creativeSet, mixSet];
