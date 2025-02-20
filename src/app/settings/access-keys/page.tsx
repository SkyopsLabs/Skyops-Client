import APIKeyField from "@/components/SettingBoxes/APIKeyField";

const SettingsAccessKeysPage = () => {
  return (
    <div className="max-w-8xl rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
        <h3 className="text-large my-2 font-bold text-dark dark:text-white">
          API Keys
        </h3>
        <h3 className="text-medium my-2 text-dark dark:text-white">
          API Keys allow users to interact with Intelliphy Cloud through an HTTP API.
          Learn more about API keys in our docs page.
        </h3>
        <APIKeyField />

        <h3 className="text-large my-5 font-bold text-dark dark:text-white">
          SSH Keys
        </h3>
        <div className="my-2 flex flex-col">
          <div className="flex">
            {/* Public Key */}
            <h3 className="my-5 mr-5 text-sm font-bold text-dark dark:text-white">
              Public key
            </h3>
            <div className="relative w-100">
              <textarea
                rows={4}
                placeholder=""
                value={
                  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOlEUG4XMCCEnRgDLYFS8mLj/66Y06eh5oqaYxeVvsx+"
                }
                style={{ resize: "none" }}
                className="my-5 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 pr-15 text-dark outline-none focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              <button className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 top-10 mt-1 -translate-y-1/2 border-l"
                  width="45"
                  height="45"
                  viewBox="0 0 28 28"
                  fill="currentColor"
                >
                  <g>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z"
                      fill="#080341"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
          {/* Private Key */}
          <div className="flex">
            <h3 className="my-5 mr-5 text-sm font-bold text-dark dark:text-white">
              Private key
            </h3>
            <button
              className="
                flex 
                rounded-[10px] 
                border 
                border-dark-3 
                px-2 
                pt-2 
                text-dark 
                transition 
                duration-500 
                ease-in-out 
                hover:border-2 
                hover:border-dark-3
                dark:text-white
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <g>
                  <path
                    className="fil0"
                    d="M5.15481 1.68666l-2.71465 0 0 2.21042c0,0.066252 -0.0537402,0.119992 -0.119992,0.119992 -0.066252,0 -0.119992,-0.0537402 -0.119992,-0.119992l0 -2.33041c0,-0.066252 0.0537402,-0.119992 0.119992,-0.119992l2.91464 0c0.0320866,0 0.0625157,0.0128268 0.0851772,0.0354921l0.77802 0.77802c0.0225512,0.0225472 0.0351496,0.0529488 0.0351496,0.0848386l3.93701e-006 1.55205c0,0.066252 -0.0537402,0.119992 -0.119992,0.119992 -0.066252,0 -0.119992,-0.0537402 -0.119992,-0.119992l0 -1.47206 -0.269189 0c-0.129106,0 -0.246421,-0.0527638 -0.331417,-0.137756 -0.0849921,-0.0849961 -0.137756,-0.202311 -0.137756,-0.331417l0 -0.269189zm-2.71465 4.96002l3.45301 0 0 -0.62522c0,-0.066252 0.0537402,-0.119992 0.119992,-0.119992 0.066252,0 0.119992,0.0537402 0.119992,0.119992l0 0.745213c0,0.066252 -0.0537402,0.119992 -0.119992,0.119992l-3.693 0c-0.066252,0 -0.119992,-0.0537402 -0.119992,-0.119992l0 -0.745213c0,-0.066252 0.0537402,-0.119992 0.119992,-0.119992 0.066252,0 0.119992,0.0537402 0.119992,0.119992l0 0.62522z"
                  />
                  <polygon
                    className="fil0"
                    points="3.0052,2.8249 5.32812,2.8249 5.32812,3.02489 3.0052,3.02489 "
                  />
                  <polygon
                    className="fil0"
                    points="3.0052,3.2995 5.32812,3.2995 5.32812,3.49949 3.0052,3.49949 "
                  />
                  <polygon
                    className="fil0"
                    points="3.0052,2.3503 4.64759,2.3503 4.64759,2.5503 3.0052,2.5503 "
                  />
                  <path
                    className="fil0"
                    d="M2.7318 4.45162l0.328811 0c0.124579,0 0.205894,0.00520079 0.243717,0.0153661 0.0581496,0.0151299 0.107083,0.0482244 0.146323,0.0992835 0.0392402,0.0510591 0.0588622,0.117012 0.0588622,0.197618 0,0.0624055 -0.0113465,0.114886 -0.0340394,0.157197 -0.0226929,0.0425512 -0.0512992,0.0758819 -0.0862835,0.100228 -0.034748,0.0241142 -0.0702047,0.040185 -0.106138,0.0479882 -0.0489331,0.00969291 -0.119846,0.0146535 -0.212748,0.0146535l-0.133555 0 0 0.382949 -0.204949 0 0 -1.01528zm0.946016 1.01528l0 -1.01528 0.752657 0 0 0.171854 -0.547709 0 0 0.225039 0.50965 0 0 0.170909 -0.50965 0 0 0.276335 0.567094 0 0 0.171146 -0.772043 0zm0.943185 0l0 -1.01528 0.306831 0 0.184146 0.692614 0.18202 -0.692614 0.307535 0 0 1.01528 -0.190291 0 0 -0.799224 -0.201638 0.799224 -0.197382 0 -0.200929 -0.799224 0 0.799224 -0.190291 0zm-2.18084 0.634551l3.45301 0 0.239984 0 0.401661 0c0.0441811,0 0.08,-0.0358189 0.08,-0.08l0 -2.12438c0,-0.0441811 -0.0358189,-0.08 -0.08,-0.08l-0.401661 0 -0.239984 0 -3.45301 0 -0.239984 0 -0.401661 0c-0.0441811,0 -0.08,0.0358189 -0.08,0.08l0 2.12438c0,0.0441811 0.0358189,0.08 0.08,0.08l0.401661 0 0.239984 0z"
                  />
                  <path
                    className="fil0"
                    d="M3.03579 4.62347l-0.0990433 0 0 0.287921 0.112043 0c0.0808465,0 0.134976,-0.00520079 0.162161,-0.0158386 0.027185,-0.0106378 0.0484606,-0.027185 0.064063,-0.049878 0.0153661,-0.0226929 0.0231654,-0.0489331 0.0231654,-0.0789528 0,-0.036878 -0.010874,-0.0673701 -0.032622,-0.0914843 -0.0215118,-0.023874 -0.0491693,-0.0390039 -0.0822638,-0.0449134 -0.0245827,-0.00472835 -0.073752,-0.00685433 -0.147504,-0.00685433z"
                  />
                </g>
              </svg>
              <h2 className="m-2 ml-0 font-bold">Download</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccessKeysPage;
