
export default function GiveRating({ maxStars = 5,handleStarClick,rating } : any) {

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          className='cursor-pointer'
          style={{ color: index < rating ? 'yellow' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
