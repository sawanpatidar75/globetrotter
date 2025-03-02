import React from "react";

const Share = ({ username, score }) => {
  const link = `https://api.whatsapp.com/send?text=Join me on Globetrotter! My score: ${score}. Play now: https://globetrotter-game.com/play?ref=${username}&score=${score}`;
  return <a href={link} className="bg-green-500 text-white p-2">Challenge a Friend</a>;
};

export default Share;
