import {useState, useReducer, createContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import CarouselCard from "./CarouselCard";
import CarouselArrow from "./CarouselArrow";
import {addCardToCarouselThunk, deleteCardFromCarouselThunk} from "../store";

export const SET_BUTTONS_DISABLED = "SET_BUTTONS_DISABLED";

const buttonDisabledReducer = (state, action) => {
  switch (action.type) {
    case SET_BUTTONS_DISABLED:
      return {
        ...state,
        buttonsDisabled: action.payload,
      };
    default:
      return state;
  }
};

export const ButtonsDisabledContext = createContext();

export default function Carousel({carouselId}) {
  const [buttonsDisabledState, buttonsDisabledDispatch] = useReducer(
      buttonDisabledReducer,
      {
        buttonsDisabled: false,
      }
  );

  const dispatch = useDispatch();
  const state = useSelector((state) => state.reducer.carousels);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardDeletable, setCardDeletable] = useState(1 <
                                                     state.data[carouselId].length)

  const validPrevArrow = currentCardIndex > 0;
  const validNextArrow = currentCardIndex < state.data[carouselId].length - 1;

  useEffect(() =>
      setCardDeletable(1 < state.data[carouselId].length), [state.data])

  const handleCardAdd = () => {
    dispatch(addCardToCarouselThunk(carouselId)).then(() => {
      setCurrentCardIndex(state.data[carouselId].length);
    });
  };

  const handleCardDelete = () => {
    setCurrentCardIndex(
        !currentCardIndex ? currentCardIndex : currentCardIndex - 1
    );
    console.log("step1");
    dispatch(
        deleteCardFromCarouselThunk({
          id: carouselId,
          i: currentCardIndex,
        })
    );
  };

  const handlePrevClick = () => {
    validPrevArrow > 0 && setCurrentCardIndex(currentCardIndex - 1);
  };

  const handleNextClick = () => {
    validNextArrow && setCurrentCardIndex(currentCardIndex + 1);
  };

  console.log("beforecarouselrender");
  console.log(currentCardIndex);
  console.log(state.data[carouselId]);
  console.log(state.data[carouselId][currentCardIndex]);
  return (
      <ButtonsDisabledContext.Provider
          value={{
            buttonsDisabledState,
            buttonsDisabledDispatch,
          }}
      >
        <div className="carousel-colors carousel-bg flex shrink items-center justify-center gap-12 w-full">
          <CarouselArrow
              onClick={handlePrevClick}
              isDefaultDirection
              showArrow={validPrevArrow}
          />
          <CarouselCard
              cardId={state.data[carouselId][currentCardIndex]}
              onAdd={handleCardAdd}
              onDelete={handleCardDelete}
              cardDeletable={cardDeletable}
          />
          <CarouselArrow onClick={handleNextClick} showArrow={validNextArrow}/>
        </div>
      </ButtonsDisabledContext.Provider>
  );
}
