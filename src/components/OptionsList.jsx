import BaseButton from "./ui/BaseButton";

function OptionsList({
  optionSelection,
  anwserOptions,
  anwserName,
  showAnwser,
}) {
  const options =
    anwserOptions && anwserName
      ? anwserOptions.map((option) => {
          let selectColor;

          if (showAnwser === true && option.capital === anwserName) {
            selectColor =
              option.capital === anwserName ? "rgba(0, 128, 0, 0.5)" : null;
          }

          return (
            <li key={option.capital} className="option-item">
              <BaseButton
                showAnwser={showAnwser}
                color={selectColor}
                value={option.capital}
                optionSelection={optionSelection}
              />
            </li>
          );
        })
      : null;

  return <ul className="options-list">{options && options}</ul>;
}

export default OptionsList;
