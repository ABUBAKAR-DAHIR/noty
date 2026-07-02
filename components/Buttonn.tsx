import React from "react";

function Buttonn() {
  return (
    <li
      role="status"
      aria-live="off"
      tabIndex={0}
      data-state="open"
      data-swipe-direction="right"
      className="flex justify-end _toastAnimation_14na3_2"
      data-radix-collection-item=""
      style={{
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <div
        data-color-context="warning"
        className="max-w-lg rounded-xl border-0.5 shadow-md p-2 text-sm overflow-hidden bg-bg-000 border-border-100 pointer-events-auto bg-warning-900 border-warning-200"
      >
        <div className="flex gap-2 justify-between ml-1 text-warning-000">
          <div className="flex min-w-0 items-start gap-2">
            <div className="h-6 flex items-center">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Warning"
                  aria-hidden={false}
                  style={{ flexShrink: 0 }}
                >
                  <path d="M8.708 3.708a1.5 1.5 0 0 1 2.466-.173l.118.173 6.5 11.03A1.5 1.5 0 0 1 16.5 17h-13a1.5 1.5 0 0 1-1.292-2.262zm1.684.45a.5.5 0 0 0-.823.058l-6.5 11.03A.5.5 0 0 0 3.5 16h13a.5.5 0 0 0 .43-.754l-6.5-11.03zM10 13a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m0-5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 10 8" />
                </svg>
              </div>
            </div>

            <div className="mt-0.5 min-w-0 break-words">
              <div className="select-text">
                Your previous message wasn't sent. You can try again.
              </div>
            </div>
          </div>

          <button
            className="inline-flex items-center justify-center relative isolate shrink-0 can-focus select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none border-transparent transition font-base duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] h-6 w-6 rounded-md _fill_10ocf_9 _ghost_10ocf_96 _colorized_10ocf_192"
            type="button"
            aria-label="Close"
            data-radix-toast-announce-exclude=""
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden={true}
                style={{ flexShrink: 0 }}
              >
                <path d="M15.147 4.146a.5.5 0 0 1 .707.707L10.707 10l5.147 5.147a.5.5 0 0 1-.63.771l-.078-.064L10 10.707l-5.146 5.147a.5.5 0 0 1-.708-.707L9.293 10 4.146 4.853a.5.5 0 0 1 .708-.707L10 9.293z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Buttonn;