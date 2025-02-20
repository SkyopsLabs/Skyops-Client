import TableCluster from "@/components/Tables/TableCluster";

const CalendarPage = () => {
  return (
    <div className="">
      <div
        className="
            mt-5
            h-[80vh]
            w-full
            rounded-[10px]
            bg-white
            shadow-1
            dark:bg-gray-dark
            dark:shadow-card
          "
      >
        <div className="flex flex-col gap-10">
          <TableCluster />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
