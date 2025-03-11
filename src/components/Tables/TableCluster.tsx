"use client";

import Image from "next/image";
import Checkbox from "@/components/FormElements/Checkbox/Checkbox";
import { useState } from "react";
import GPUSelect from "../FormElements/GPUSelect";
import SelectGroupGPU from "../FormElements/SelectGroup/SelectGroupGPU";
import RadioButtonClusterPeriod from "../Buttons/RadioButtonClusterPeriod";
import RadioButtonClusterDeliveryTime from "../Buttons/RadioButtonClusterDeliveryTime";
import toast from "react-hot-toast";
import ProgressBar from "../ProgressBar";

const clusters: any[] = [
  // {
  //   name: "AB4567XY",
  //   region: "Maple Valley",
  //   nodes: "10",
  //   cpus: "24",
  //   status: "complete",
  //   ide: "description",
  // },
  // {
  //   name: "AB4567XY",
  //   region: "Cedar Groove",
  //   nodes: "21",
  //   cpus: "100",
  //   status: "pending",
  //   ide: "description",
  // },
];

const TableCluster = () => {
  const [showModal, setShowModal] = useState(-1);

  const handleCloseModal = () => {
    setShowModal(-1);
  };

  const handleRequestCluster = () => {
    toast.success("Success! Request is submitted.");
    handleCloseModal();
  };

  return (
    <div className="flex  w-full flex-col dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-border flex h-[64px] items-center justify-between border-b px-5 dark:border-dark-3 lg:px-10">
        <h4 className="text-appBlack text-2xl font-medium  dark:text-white lg:text-[28px]">
          Cluster
        </h4>
        <button
          className="bg-prim2 flex h-[40px] w-[125px] items-center  justify-center font-medium  text-white "
          onClick={() => {
            setShowModal(1);
          }}
        >
          Request
        </button>
      </div>
      <div className="w-full overflow-x-scroll lg:w-auto">
        <div className="grid w-full min-w-[700px] grid-cols-[1fr,1fr,0.5fr,0.5fr,1fr,0.7fr] border-stroke px-5 py-4.5 dark:border-dark-3 md:px-10  ">
          <div className="flex items-center">
            <Checkbox />
            <p className="md:text-md text-sm">Name</p>
          </div>
          <div className="flex items-center">
            <p className="md:text-md text-sm">Region</p>
          </div>
          <div className="flex items-center">
            <p className="md:text-md text-sm">Nodes</p>
          </div>
          <div className="flex items-center">
            <p className="md:text-md text-sm">CPUs</p>
          </div>
          <div className="flex items-center">
            <p className="md:text-md text-sm">Status</p>
          </div>
          <div className="flex items-center">
            <p className="md:text-md text-sm">Cloud IDE</p>
          </div>
        </div>
        {clusters.map((item, index) => (
          <div className="mx-4 mb-[6px] grid  h-[72px] w-full min-w-[700px] grid-cols-[1fr,1fr,0.5fr,0.5fr,1fr,0.7fr] border-stroke bg-white px-5 py-4.5 dark:border-dark-3 md:px-10  lg:w-auto">
            <div className="flex items-center">
              <Checkbox />
              <p className="md:text-md text-appBlack text-sm">{item.name}</p>
            </div>
            <div className="flex items-center">
              <p className="md:text-md text-sm">{item.region}</p>
            </div>
            <div className="flex items-center">
              <p className="md:text-md text-appBlack text-sm">{item.nodes}</p>
            </div>
            <div className="flex items-center">
              <p className="md:text-md text-appBlack text-sm">{item.cpus}</p>
            </div>
            <div className="flex  items-center gap-1">
              <Image
                src={
                  item.status == "complete"
                    ? "/images/icon/complete.svg"
                    : "/images/icon/pending.svg"
                }
                alt={item.status}
                width={20}
                height={20}
              />
              <p
                className={`md:text-md capitalize ${item.status == "complete" ? "text-[#097C4C]" : item.status == "pending" ? "text-[#DD5906]" : "text-appBlack"} text-sm`}
              >
                {item.status}
              </p>
            </div>
            <div className="flex items-center">
              <p className="md:text-md text-appBlack text-sm capitalize">
                {item.ide}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* empty status */}
      {clusters.length == 0 && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <Image
            width={212}
            height={198.12}
            src={"/images/clusters/empty-cluste.png"}
            alt="Logo"
            className="dark:hidden"
          />
          <div className="mt-[56px] flex flex-col items-center   gap-[6px]">
            <h6 className=" text-[22px] font-semibold text-black lg:text-[28px]">
              Oh, it's empty
            </h6>
            <p className="text-base text-black/50">
              The table is still empty for now
            </p>
          </div>
        </div>
      )}

      {/* step-1 */}
      {showModal === 1 && (
        <div
          id="modal"
          className=" fixed left-0 top-0 z-9999 flex min-h-screen w-screen items-center justify-center bg-dark bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="h-max w-[335px] rounded-lg bg-white p-5 shadow-lg dark:bg-gray-500  lg:w-[560px] lg:p-10">
            <div className="flex flex-col items-center justify-between p-4">
              <Image
                width={156}
                height={130}
                src={"/images/clusters/empty-cluste.png"}
                alt="Logo"
                className="dark:hidden"
              />
              <div className="my-5 flex flex-col items-center gap-[6px]   lg:my-[40px]">
                <h6 className=" text-[22px] font-medium text-black lg:text-[28px]">
                  Request Cluster
                </h6>
                <p className="text-base text-black/50">Select Instance type</p>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col">
                <ProgressBar showModal={showModal} />

                <GPUSelect id="multiselect" />
                {/* <div className="text-appBlack my-2 text-sm  dark:text-white">
                  How many GPUs are you looking for*
                </div> */}
                <SelectGroupGPU />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between p-4 text-xs font-bold">
              <button
                className="bg-prim2 flex h-[50px] w-full items-center justify-center rounded text-white lg:h-[60px]"
                onClick={() => {
                  setShowModal(2);
                }}
              >
                Next
              </button>
              <button
                className="flex h-[50px] w-full items-center justify-center rounded bg-transparent text-black/50 lg:h-[60px]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* step-2 */}
      {showModal === 2 && (
        <div
          id="modal"
          className=" fixed left-0 top-0 z-9999 flex min-h-screen w-screen items-center justify-center bg-dark bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="h-max w-[335px] rounded-lg bg-white p-5 shadow-lg dark:bg-gray-500  lg:w-[560px] lg:p-10">
            <div className="flex flex-col items-center justify-between p-4">
              <Image
                width={156}
                height={130}
                src={"/images/clusters/empty-cluste.png"}
                alt="Logo"
                className="dark:hidden"
              />
              <div className="my-5 flex flex-col items-center gap-[6px]   lg:my-[40px]">
                <h6 className=" text-[22px] font-medium text-black lg:text-[28px]">
                  Rental Period
                </h6>
                <p className="text-base text-black/50">
                  For how long do youo want to rent the cluster?
                </p>
              </div>
            </div>

            <div className="mb-5 lg:mb-10">
              <div className="flex flex-col">
                <ProgressBar showModal={showModal} />
                <RadioButtonClusterPeriod />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between p-4 text-xs font-bold">
              <button
                className="bg-prim2 flex h-[50px] w-full items-center justify-center rounded text-white lg:h-[60px]"
                onClick={() => {
                  setShowModal(3);
                }}
              >
                Next
              </button>
              <button
                className="mt-4 flex h-[50px] w-full items-center justify-center rounded bg-transparent text-black/50 lg:h-[60px]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* step-3 */}
      {showModal === 3 && (
        <div
          id="modal"
          className=" fixed left-0 top-0 z-9999 flex min-h-screen w-screen items-center justify-center bg-dark bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="h-max w-[335px] rounded-lg bg-white p-5 shadow-lg dark:bg-gray-500  lg:w-[560px] lg:p-10">
            <div className="flex flex-col items-center justify-between p-4">
              <Image
                width={156}
                height={130}
                src={"/images/clusters/empty-cluste.png"}
                alt="Logo"
                className="dark:hidden"
              />
              <div className="my-5 flex flex-col items-center gap-[6px]   lg:my-[40px]">
                <h6 className=" text-[22px] font-medium text-black lg:text-[28px]">
                  Delivery Time
                </h6>
                <p className="text-base text-black/50">
                  When do you want the cluster to be ready?
                </p>
              </div>
            </div>

            <div className="mb-5 lg:mb-10">
              <div className="flex flex-col">
                <ProgressBar showModal={showModal} />
                <RadioButtonClusterDeliveryTime />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between p-4 text-xs font-bold">
              <button
                className="bg-prim2 flex h-[50px] w-full items-center justify-center rounded text-white lg:h-[60px]"
                onClick={() => {
                  setShowModal(4);
                }}
              >
                Next
              </button>
              <button
                className="mt-4 flex h-[50px] w-full items-center justify-center rounded bg-transparent text-black/50 lg:h-[60px]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* step-4 */}
      {showModal === 4 && (
        <div
          id="modal"
          className=" fixed left-0 top-0 z-9999 flex min-h-screen w-screen items-center justify-center bg-dark bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="h-max w-[335px] rounded-lg bg-white p-5 shadow-lg dark:bg-gray-500  lg:w-[560px] lg:p-10">
            <div className="flex flex-col items-center justify-between p-4">
              <Image
                width={156}
                height={130}
                src={"/images/clusters/empty-cluste.png"}
                alt="Logo"
                className="dark:hidden"
              />
              <div className="my-5 flex flex-col items-center gap-[6px]   lg:my-[40px]">
                <h6 className=" text-[22px] font-medium text-black lg:text-[28px]">
                  Confirmation
                </h6>
                <p className="text-base text-black/50">
                  When do you want the cluster to be ready?
                </p>
              </div>
            </div>

            <div className="mb-2  lg:mb-5">
              <div className="flex flex-col">
                <ProgressBar showModal={showModal} />
                <div className="flex flex-col">
                  <div className="flex h-[50px] items-center justify-between border-b border-black/5 p-2 lg:h-[60px]">
                    <div className=" text-black/50 dark:text-white">
                      GPU&apos;s
                    </div>
                    <div className="flex">
                      <Image
                        width={20}
                        height={20}
                        src={"/images/clusters/nvidia.png"}
                        alt="Logo"
                        className="m-1"
                      />
                      <div className="  text-black dark:text-white">
                        Nvidia A100s
                      </div>
                    </div>
                  </div>

                  <div className="flex h-[50px] items-center justify-between border-b border-black/5 p-2 lg:h-[60px]">
                    <div className="text-black/50 dark:text-white">
                      Quantity
                    </div>
                    <div className=" text-black dark:text-white">64-128</div>
                  </div>

                  <div className="flex h-[50px] items-center justify-between border-b border-black/5 p-2 lg:h-[60px]">
                    <div className="text-black/50 dark:text-white">
                      Rental Period
                    </div>
                    <div className="text-black dark:text-white">~7 Days</div>
                  </div>

                  <div className="flex h-[50px] items-center justify-between border-b border-black/5 p-2 lg:h-[60px]">
                    <div className="text-black/50 dark:text-white">When</div>
                    <div className="text-black dark:text-white">
                      In 2 Months
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between p-4 text-xs font-bold">
              <button
                className="bg-prim2 flex h-[50px] w-full items-center justify-center rounded text-white lg:h-[60px]"
                onClick={() => {
                  setShowModal(5);
                }}
              >
                Confirm
              </button>
              <button
                className="mt-4 flex h-[50px] w-full items-center justify-center rounded bg-transparent text-black/50 lg:h-[60px]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Finish*/}
      {showModal === 5 && (
        <div
          id="modal"
          className=" fixed left-0 top-0 z-9999 flex min-h-screen w-screen items-center justify-center bg-dark bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="h-max w-[335px] rounded-lg bg-white p-5 shadow-lg dark:bg-gray-500  lg:w-[560px] lg:p-10">
            <div className="flex flex-col items-center justify-between p-4">
              <Image
                width={156}
                height={130}
                src={"/images/clusters/empty-cluste.png"}
                alt="Logo"
                className="dark:hidden"
              />
              <div className="my-5 flex flex-col items-center gap-[6px]   lg:my-[40px]">
                <h6 className=" text-[22px] font-medium text-black lg:text-[28px]">
                  Successfull
                </h6>
                <p className="text-base text-black/50">
                  Your request is submitted
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between p-4 text-xs font-bold">
              <button
                className="bg-prim2 flex h-[50px] w-full items-center justify-center rounded text-white lg:h-[60px]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCluster;
