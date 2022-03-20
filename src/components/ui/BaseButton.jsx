import { useState } from "react";

function BaseButton({ optionSelection, value, color, showAnwser }) {
  const [buttonColor, setButtonColor] = useState(null);

  function actionButton(value) {
    setButtonColor("rgba(255, 0, 0, 0.5)");

    optionSelection(value);
  }

  return (
    <button
      className="base-button"
      disabled={showAnwser}
      style={{ backgroundColor: color ? color : buttonColor }}
      onClick={() => actionButton(value)}
    >
      <span className="button-title">{value}</span>
    </button>
  );
}

export default BaseButton;
