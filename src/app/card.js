const Card = ({ title, content }) => {
  return (
    <div className="bg-yellow-300 rounded-2xl shadow-md p-6 max-w-sm">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Card;
