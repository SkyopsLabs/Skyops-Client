"use client";

import Image from "next/image";
import Checkbox from "@/components/FormElements/Checkbox/Checkbox";
import { useState } from "react";
import GPUSelect from "../FormElements/GPUSelect";
import SelectGroupGPU from "../FormElements/SelectGroup/SelectGroupGPU";
import RadioButtonClusterPeriod from "../Buttons/RadioButtonClusterPeriod";
import RadioButtonClusterDeliveryTime from "../Buttons/RadioButtonClusterDeliveryTime";
import toast from "react-hot-toast";

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
    <div className="w-full rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-7">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Cluster
        </h4>
        <button
          className="rounded-[5px] bg-[#0000FE] px-10 py-2 text-white lg:px-8 xl:px-10"
          onClick={() => {
            setShowModal(1);
          }}
        >
          Request
        </button>
      </div>
      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-7">
        <div className="col-span-2 flex items-center">
          <Checkbox />
          <p className="md:text-md text-sm">Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="md:text-md text-sm">Region</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="md:text-md text-sm">Nodes</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="md:text-md text-sm">CPUs</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="md:text-md text-sm">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="md:text-md text-sm">Cloud IDE</p>
        </div>
      </div>

      {/* empty status */}
      <div className="justify-content-center mt-10 flex flex-col items-center text-center">
        <Image
          width={500}
          height={32}
          src={"/images/empty_state.png"}
          alt="Logo"
          className="mt-20 dark:hidden"
          style={{ width: "auto", height: "auto" }}
        />
        <p className="text-bold mt-5 text-base">No records found</p>
      </div>

      {/* step-1 */}
      {showModal === 1 && (
        <div
          id="modal"
          className="fixed inset-0 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-11/12 rounded-lg bg-white shadow-lg dark:bg-gray-500 md:w-1/3">
            <div className="flex items-center justify-between p-4">
              <h2 id="modalTitle" className="text-xl font-semibold">
                Request Cluster
              </h2>
              <button
                id="closeModalBtn"
                className="text-xl font-bold text-gray-600 hover:text-gray-800"
                aria-label="Close Modal"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div className="px-4">
              <div className="flex flex-col">
                <div className="mb-3 mt-5 text-lg font-bold text-gray-600 dark:text-white">
                  Select Instance type
                </div>
                <div className="flex">
                  <div className="h-[10px] w-1/3 rounded-l bg-blue-600"></div>
                  <div className="mb-5 h-[10px] w-2/3 rounded-r bg-gray-200"></div>
                </div>

                <GPUSelect id="multiselect" />
                <div className="mb-3 mt-5 text-sm font-bold text-gray-600 dark:text-white">
                  How many GPUs are you looking for*
                </div>
                <SelectGroupGPU />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 text-xs font-bold">
              <button
                className="mr-2 w-full rounded bg-gray-200 px-4 py-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                onClick={() => {
                  setShowModal(2);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* step-2 */}
      {showModal === 2 && (
        <div
          id="modal"
          className="fixed inset-0 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-11/12 rounded-lg bg-white shadow-lg dark:bg-gray-500 md:w-1/3">
            <div className="flex items-center justify-between p-4">
              <h2 id="modalTitle" className="text-xl font-semibold">
                Request Cluster
              </h2>
              <button
                id="closeModalBtn"
                className="text-xl font-bold text-gray-600 hover:text-gray-800"
                aria-label="Close Modal"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div className="px-4">
              <div className="flex flex-col">
                <div className="mb-3 mt-5 text-lg font-bold text-gray-600 dark:text-white">
                  Select Instance type
                </div>
                <div className="flex">
                  <div className="h-[10px] w-1/2 rounded-l bg-blue-600"></div>
                  <div className="h-[10px] w-1/2 rounded-r bg-gray-200"></div>
                </div>

                <div className="mt-5 text-sm font-bold text-gray-600 dark:text-white">
                  Rental Period
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-white">
                  For how long do you want to rent the cluster?
                </div>

                <RadioButtonClusterPeriod />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 text-xs font-bold">
              <button
                className="mr-2 w-full rounded bg-gray-200 px-4 py-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                onClick={() => {
                  setShowModal(3);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* step-3 */}
      {showModal === 3 && (
        <div
          id="modal"
          className="fixed inset-0 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-11/12 rounded-lg bg-white shadow-lg dark:bg-gray-500 md:w-1/3">
            <div className="flex items-center justify-between p-4">
              <h2 id="modalTitle" className="text-xl font-semibold">
                Request Cluster
              </h2>
              <button
                id="closeModalBtn"
                className="text-xl font-bold text-gray-600 hover:text-gray-800"
                aria-label="Close Modal"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div className="px-4">
              <div className="flex flex-col">
                <div className="mb-3 mt-5 text-lg font-bold text-gray-600 dark:text-white">
                  Select Instance type
                </div>
                <div className="flex">
                  <div className="h-[10px] w-2/3 rounded-l bg-blue-600"></div>
                  <div className="h-[10px] w-1/3 rounded-r bg-gray-200"></div>
                </div>

                <div className="mt-5 text-sm font-bold text-gray-600 dark:text-white">
                  Delivery Time
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-white">
                  When do you want the cluster to be ready?
                </div>

                <RadioButtonClusterDeliveryTime />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 text-xs font-bold">
              <button
                className="mr-2 w-full rounded bg-gray-200 px-4 py-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                onClick={() => {
                  setShowModal(4);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* step-4 */}
      {showModal === 4 && (
        <div
          id="modal"
          className="fixed inset-0 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-11/12 rounded-lg bg-white shadow-lg dark:bg-gray-500 md:w-1/3">
            <div className="flex items-center justify-between p-4">
              <h2 id="modalTitle" className="text-xl font-semibold">
                Request Cluster
              </h2>
              <button
                id="closeModalBtn"
                className="text-xl font-bold text-gray-600 hover:text-gray-800"
                aria-label="Close Modal"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div className="px-4">
              <div className="flex flex-col">
                <div className="mb-3 mt-5 text-lg font-bold text-gray-600 dark:text-white">
                  Select Instance type
                </div>
                <div className="flex">
                  <div className="h-[10px] w-full rounded bg-blue-600"></div>
                </div>

                <div className="mt-5 text-sm font-bold text-gray-600 dark:text-white">
                  Confirmation
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-white">
                  When do you want the cluster to be ready?
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between p-2">
                    <div className="text-sm font-bold text-gray-500 dark:text-white">
                      GPUs
                    </div>
                    <div className="flex">
                      <Image
                        width={20}
                        height={20}
                        src={"/images/clusters/nvidia.png"}
                        alt="Logo"
                        className="m-1"
                      />
                      <div className="text-sm font-bold text-dark dark:text-white">
                        Nvidia A100s
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <div className="text-sm font-bold text-gray-500 dark:text-white">
                      Quantity
                    </div>
                    <div className="text-sm font-bold text-dark dark:text-white">
                      64-128
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <div className="text-sm font-bold text-gray-500 dark:text-white">
                      Rental Period
                    </div>
                    <div className="text-sm font-bold text-dark dark:text-white">
                      ~7 Days
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <div className="text-sm font-bold text-gray-500 dark:text-white">
                      When
                    </div>
                    <div className="text-sm font-bold text-dark dark:text-white">
                      In 2 Months
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 text-xs font-bold">
              <button
                className="mr-2 w-full rounded bg-gray-200 px-4 py-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                onClick={handleRequestCluster}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCluster;
