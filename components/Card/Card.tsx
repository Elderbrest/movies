import React from 'react';
import { Movie } from "../../types";

interface CardProps extends Movie {
  categoryId: string;
  handleSelectMovies: (id: string, categoryId: string) => void;
  isSelected: boolean;
}

const Card = ({ id, photoUrL, title, categoryId, isSelected, handleSelectMovies}: CardProps): JSX.Element => (
  <div
    className={
      `flex flex-col max-w-sm rounded overflow-hidden shadow-lg ${isSelected ? 'bg-normal-green' : 'bg-white'}
       hover:bg-normal-green transition duration-200 ease-in-out`
    }
  >
    <div className="px-6 py-4 text-center">
      <span className="font-bold text-xl mb-2 text-blue-dark hover:text-light-grey transition-all ease-in duration-150">
        {title}
      </span>
    </div>
    <div className="flex justify-center py-8">
      <img className="object-cover mb-3 w-48 h-48 rounded-full shadow-lg" src={photoUrL} alt="Sunset in the mountains" />
    </div>
    <div className="px-6 pt-4 pb-2 mt-auto text-center">
      <button
        type="button"
        className={`
          font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-normal-green hover:bg-light-green
          transition-all ease-in duration-200 border-2 border-white
        `}
        onClick={() => handleSelectMovies(id, categoryId)}
      >
        {isSelected ? 'Unselect' : 'Select'}
      </button>
    </div>
  </div>
);

export default Card;
