const randomColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 9);
  }
  return color;
};

const normalize = (voted, key) => {
  const map = new Map();
  for (let vote of voted) {
    let count = 0;
    if (map.has(vote[key])) {
      count = map.get(vote[key]);
    }
    map.set(vote[key], count + 1);
  }
  return map;
};

const getTime = voted => {
  return [...normalize(voted, "time").entries()].map(el => [
    ...el,
    randomColor()
  ]);
};

const getEvent = (voted, inner) => {
  const res = [];
  for (let part of inner) {
    const events = Array.from(
      normalize(
        voted.filter(vote => vote.time === part[0]),
        "event"
      ).entries()
    ).map(el => [...el, part[2]]);
    res.push(...events);
  }
  return res;
};

const getWinner = voted => {
  let tie = false;
  const events = normalize(voted, "event");
  const obj = {};
  for (let event of events.keys()) {
    obj[event] = {};
    const times = voted.filter(vote => vote.event === event);
    for (let time of times) {
      let value = 0;
      if (time.time in obj[event]) {
        value = obj[event][time.time];
      }
      obj[event][time.time] = value + 1;
    }
  }
  let winner = { event: "", time: "", count: 0 };
  for (let event of Object.keys(obj)) {
    for (let time of Object.keys(obj[event])) {
      if (obj[event][time] === winner.count) {
        tie = true;
      } else if (obj[event][time] > winner.count) {
        winner = { event, time, count: obj[event][time] };
        tie = false;
      }
    }
  }
  return { winner, tie };
};

const getVoterList = (voted, winner, tie) => {
  const winnerList = voted
    .filter(vote => vote.event === winner.event && vote.time === winner.time)
    .map(vote => vote.email);
  const voterList = voted
    .filter(vote => !winnerList.includes(vote.email))
    .map(vote => vote.email);

  return { winnerList, voterList };
};

export const getFirstPhaseResult = voted => {
  const inner = getTime(voted);
  const outer = getEvent(voted, inner);
  const { winner, tie } = getWinner(voted);
  const { winnerList, voterList } = getVoterList(voted, winner, tie);
  return { inner, outer, winner, tie, winnerList, voterList };
};
