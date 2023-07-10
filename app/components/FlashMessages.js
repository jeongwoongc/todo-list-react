import React, { useEffect } from "react";

function FlashMessages({messages, flashType}) {
  console.log(flashType);
  return (
    <div className="floating-alerts">
      {messages.map((msg, index) => {
        return (
          <div key={index} className={`alert alert-success text-center floating-alert ${flashType} shadow-sm`}>
            {msg}
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;
