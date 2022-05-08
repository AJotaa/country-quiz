import React, { Fragment } from "react";
import { useState } from "react";

function BaseButton({
  optionSelection,
  value,
  color,
  showAnwser,
  mode,
  children,
  action,
}) {
  const [buttonColor, setButtonColor] = useState(null);

  function actionButton(value) {
    setButtonColor("rgba(255, 0, 0, 0.5)");

    optionSelection(value);
  }

  return (
    <Fragment>
      {mode === "option" ? (
        <button
          className="base-button"
          disabled={showAnwser}
          style={{ backgroundColor: color ? color : buttonColor }}
          onClick={() => actionButton(value)}
        >
          <span className="button-title">{value}</span>
        </button>
      ) : (
        <button className="base-button" onClick={action}>
          <span className="button-title">{children}</span>
        </button>
      )}
    </Fragment>
  );
}

export default BaseButton;
