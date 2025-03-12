"use client";

import React, { useEffect, useState } from "react";

import { useApp } from "../Layouts/AppProvider";
import { IOrganization, IService } from "@/types";

import { getServices, getOrganizationById } from "@/apis/api-v1";
import { convertDateToString, shortenAddress } from "@/utils/collection-v1";

const members = [
  {
    name: "-",
    address: "0x8A7...73766",
    joined: "2025-02-28",
    role: "owner",
  },
  {
    name: "-",
    address: "0x8A7...73766",
    joined: "2025-02-28",
    role: "owner",
  },
  {
    name: "-",
    address: "0x8A7...73766",
    joined: "2025-02-28",
    role: "owner",
  },
  // {
  //   name: "-",
  //   address: "0x8A7...73766",
  //   joined: "2025-02-28",
  //   role: "owner",
  // },
  // {
  //   name: "-",
  //   address: "0x8A7...73766",
  //   joined: "2025-02-28",
  //   role: "owner",
  // },
  // {
  //   name: "-",
  //   address: "0x8A7...73766",
  //   joined: "2025-02-28",
  //   role: "owner",
  // },
];

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
    <div className="w-full">
      <div className="flex h-[64px] items-center justify-between border-b border-border px-5 dark:border-dark-3 lg:px-10">
        <h4 className="text-2xl font-medium text-appBlack  dark:text-white lg:text-[28px]">
          Organisation Settings
        </h4>
      </div>
      <div className="mb-4 bg-white p-5 dark:bg-dark-2 lg:mx-4 lg:mb-3 lg:mt-6 lg:p-6">
        {/* General Part */}
        <h3 className="mb-4 text-[20px] font-medium text-appBlack  dark:text-white lg:mb-6 lg:text-[22px]">
          Service Quote
        </h3>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
          {/* Organization ID */}
          <input
            className=" h-[60px]  w-full  border-[1px] border-black/10 bg-white px-4.5 py-2.5 text-black/30 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2  dark:text-white/[.48] dark:focus:border-primary lg:w-1/3"
            type="text"
            name="organization_id"
            placeholder="Organization ID"
            defaultValue={
              organization ? organization._id.toUpperCase() : "Organization ID"
            }
            disabled
          />

          {/* Organization Name */}

          <input
            className=" h-[60px] w-full   border-[1px] border-black/10 bg-white px-4.5 py-2.5 text-black/30 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2  dark:text-white/[.48] dark:focus:border-primary lg:w-1/3"
            type="text"
            name="organization_name"
            placeholder="Organization Name"
            defaultValue={
              organization ? organization.name : "Organization Name"
            }
            disabled
          />

          {/* Create Time */}

          <input
            className=" h-[60px] w-full   border-[1px] border-black/10 bg-white px-4.5 py-2.5 text-black/30 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2  dark:text-white/[.48] dark:focus:border-primary lg:w-1/3"
            type="text"
            name="create_time"
            placeholder="Organizatoin Created Time"
            defaultValue={
              organization
                ? convertDateToString(organization.created_at)
                : "Organization Creation Time"
            }
            disabled
          />
        </div>
      </div>
      {/* Members Part */}
      <div className="mb-4 bg-white p-5 dark:bg-dark-2 lg:mx-4 lg:mb-3 lg:mt-6 lg:p-6">
        <h3 className="mb-4 text-[20px] font-medium text-appBlack  dark:text-white lg:mb-6 lg:text-[22px]">
          Members
        </h3>
        {/* Header */}
        <div className="grid h-[56px] grid-cols-[0.5fr,1.2fr,1fr,0.7fr] border-b border-border2 px-4 py-3 dark:border-dark-3 md:px-6 lg:h-[64px]  lg:grid-cols-[1.5fr,1fr,1fr,1fr] 2xl:px-7.5">
          <div className="flex items-start">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Name
            </p>
          </div>
          <div className="flex items-start justify-center lg:justify-start">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Address
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Joined
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Role
            </p>
          </div>
        </div>
        {/* Body */}
        {members.map((item, index) => (
          <div
            key={index.toString()}
            className="grid h-[56px] grid-cols-[0.5fr,1.2fr,1fr,0.7fr] place-content-center border-b border-border2 px-4 pb-3 dark:border-dark-3 md:px-6 lg:h-[64px]  lg:grid-cols-[1.5fr,1fr,1fr,1fr] 2xl:px-7.5"
          >
            <div className="flex items-start">
              <p className="text-xs text-appBlack dark:text-white lg:text-sm">
                {item.name}
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-xs text-appBlack dark:text-white lg:text-sm">
                {item.address}
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-xs text-appBlack dark:text-white lg:text-sm">
                {item.joined}
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-xs capitalize text-appBlack dark:text-white lg:text-sm">
                {item.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Service Quota Part */}
      <div className="mb-4 bg-white p-5 dark:bg-dark-2 lg:mx-4 lg:mb-3 lg:mt-6 lg:p-6">
        <h3 className="mb-4 text-[20px] font-medium text-appBlack  dark:text-white lg:mb-6 lg:text-[22px]">
          Service Quota
        </h3>
        {/* Header */}
        <div className="grid  h-[56px] grid-cols-[1fr,0.7fr,0.7fr,1fr] border-b border-border2 px-4  py-3 dark:border-dark-3 md:px-6 lg:h-[64px] lg:grid-cols-[1.5fr,1fr,1fr,1fr] 2xl:px-7.5">
          <div className="flex items-center">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Quota Name
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Default Value
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Current Value
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-black/50 dark:text-white/[.48] lg:text-sm">
              Utilization
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="grid h-[56px] grid-cols-[1fr,0.7fr,0.7fr,1fr] place-content-center border-b border-border2 px-4 pb-3 dark:border-dark-3 md:px-6 lg:h-[64px]  lg:grid-cols-[1.5fr,1fr,1fr,1fr] 2xl:px-7.5">
          <div className="flex items-start">
            <p className="text-xs text-appBlack dark:text-white lg:text-sm">
              {"-"}
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-xs text-appBlack dark:text-white lg:text-sm">
              {"-"}
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-xs text-appBlack dark:text-white lg:text-sm">
              {"-"}
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-xs capitalize text-appBlack dark:text-white lg:text-sm">
              {"-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingBoxes;
