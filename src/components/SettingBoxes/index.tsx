"use client";

import React, { useEffect, useState } from "react";

import { useApp } from "../Layouts/AppProvider";
import { IOrganization, IService } from "@/types";

import { getServices, getOrganizationById } from "@/apis/api-v1";
import { convertDateToString, shortenAddress } from "@/utils/collection-v1";

const SettingBoxes = () => {
  const { user } = useApp();

  const [services, setServices] = useState<IService[] | null>(null);
  const [organization, setOrganization] = useState<IOrganization | null>(null);

  useEffect(() => {
    (async () => {
      const _services = await getServices();
      setServices(_services);

      const _org = await getOrganizationById();
      setOrganization(_org);
    })();
  }, []);

  return (
    <>
      <div className="max-w-8xl rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
          <h3 className="text-body-2xlg font-bold text-dark dark:text-white">
            Organization settings
          </h3>
        </div>
        <div className="p-7">
          <div className="mb-5.5 flex flex-col gap-5.5">
            {/* General Part */}
            <h3 className="font-large font-bold text-dark dark:text-white">
              General
            </h3>
            <div className="flex">
              {/* Organization ID */}
              <div className="mr-5 w-full sm:w-full">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="organization_id"
                >
                  Organization ID
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="organization_id"
                    placeholder="255135536985804800"
                    defaultValue={
                      organization
                        ? organization._id.toUpperCase()
                        : "Organization ID"
                    }
                    disabled
                  />
                </div>
              </div>

              {/* Organization Name */}
              <div className="mx-5 w-full sm:w-full">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="organization_name"
                >
                  Organization Name
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="organization_name"
                    placeholder="-"
                    defaultValue={
                      organization ? organization.name : "Organization Name"
                    }
                    disabled
                  />
                </div>
              </div>

              {/* Create Time */}
              <div className="ml-5 w-full sm:w-full">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="create_time"
                >
                  Create Time
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="create_time"
                    placeholder="2024-12-04"
                    defaultValue={
                      organization
                        ? convertDateToString(organization.created_at)
                        : "Organization Creation Time"
                    }
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Members Part */}
            <h3 className="font-large mt-5 font-bold text-dark dark:text-white">
              Members
            </h3>
            {/* Header */}
            <div className="grid grid-cols-6 border-b border-t border-gray-300 px-4 py-3 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Name</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Address</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Joined date</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Organization role</p>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-6 border-b border-gray-300 px-4 pb-3 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <p className="font-medium">-</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">
                  {user ? shortenAddress(user.wallet, 5) : "[USER WALLET]"}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">
                  {user
                    ? convertDateToString(user.created_at)
                    : "[USER JOINED AT]"}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">owner</p>
              </div>
            </div>

            {/* Service Quota Part */}
            <h3 className="font-large mt-5 font-bold text-dark dark:text-white">
              Service Quota
            </h3>
            {/* Header */}
            <div className="grid grid-cols-6 border-b border-t border-gray-300 px-4 py-3 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Quota Name</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Default Value</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Current Value</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Utilization</p>
              </div>
            </div>

            {/* Body */}
            {services &&
              services.length > 0 &&
              services.map((service, index) => (
                <div
                  className="grid grid-cols-6 border-b border-gray-300 px-4 pb-3 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={index}
                >
                  <div className="col-span-2 flex items-center">
                    <p className="font-medium">{service.name}</p>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="font-medium">{service.defaultValue}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="font-medium">{service.defaultValue}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="font-medium">0</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingBoxes;
