const Scoreboard = ({ score }) => {
    return (
      <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-md text-gray-800">
        <h3 className="font-bold text-lg">Scoreboard</h3>
        <p>Correct Answers: {score}</p>
      </div>
    );
  };
  
  export default Scoreboard;
  