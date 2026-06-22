"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setDate } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const TableFilterBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [verifiedBadge, setVerifiedBadge] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [travelType, setTravelType] = useState<string>("");
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathName = usePathname();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    // search
    if (searchText && pathName === "/admin/dashboard/users") {
      params.set("searchTerm", searchText);
    } else {
      params.delete("searchTerm");
    }

    // role
    if (role && role !== "ALL" && pathName === "/admin/dashboard/users") {
      params.set("role", role);
    } else {
      params.delete("role");
    }

    // status
    if (status && status !== "ALL" && pathName === "/admin/dashboard/users") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    // gender
    if (gender && gender !== "ALL" && pathName === "/admin/dashboard/users") {
      params.set("gender", gender);
    } else {
      params.delete("gender");
    }

    // verified
    if (
      verifiedBadge &&
      verifiedBadge !== "ALL" &&
      pathName === "/admin/dashboard/users"
    ) {
      params.set("verifiedBadge", verifiedBadge);
    } else {
      params.delete("verifiedBadge");
    }

    // destination
    if (
      destination &&
      (pathName === "/admin/dashboard/travel-plans" ||
        pathName === "/user/dashboard/my-travel-plans")
    ) {
      params.set("searchTerm", destination);
    } else {
      params.delete("destination");
    }

    // start date
    if (
      startDate &&
      (pathName === "/admin/dashboard/travel-plans" ||
        pathName === "/user/dashboard/my-travel-plans")
    ) {
      params.set("startDate", startDate.toISOString());
    } else {
      params.delete("startDate");
    }

    // end date
    if (
      endDate &&
      (pathName === "/admin/dashboard/travel-plans" ||
        pathName === "/user/dashboard/my-travel-plans")
    ) {
      params.set("endDate", endDate.toISOString());
    } else {
      params.delete("endDate");
    }

    // travel type
    if (
      travelType &&
      travelType !== "ALL" &&
      (pathName === "/admin/dashboard/travel-plans" ||
        pathName === "/user/dashboard/my-travel-plans")
    ) {
      params.set("travelType", travelType);
    } else {
      params.delete("travelType");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [
    searchText,
    role,
    status,
    gender,
    verifiedBadge,
    destination,
    startDate,
    endDate,
    travelType,
  ]);

  const handleReset = () => {
    setSearchText("");
    setRole("");
    setStatus("");
    setGender("");
    setVerifiedBadge("");
    setDestination("");
    setTravelType("");
    setStartDate(undefined);
    setEndDate(undefined);
    setStartOpen(false);
    setEndOpen(false);

    startTransition(() => {
      router.push(pathName);
    });
  };
  return (
    <div className="flex items-center justify-between flex-col md:flex-row">
      <div className="flex items-center gap-3 flex-col md:flex-row w-full">
        {pathName === "/admin/dashboard/users" && (
          <>
            <Input
              className="w-full"
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search Name or Email"
            />

            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="DELETED">DELETED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="MALE">MALE</SelectItem>
                  <SelectItem value="FEMALE">FEMALE</SelectItem>
                  <SelectItem value="OTHERS">OTHERS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={verifiedBadge} onValueChange={setVerifiedBadge}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select verified status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="true">VERIFIED</SelectItem>
                  <SelectItem value="false">UNVERIFIED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}

        {(pathName === "/admin/dashboard/travel-plans" ||
          pathName === "/user/dashboard/my-travel-plans") && (
          <>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Search destination"
              className="w-full md:w-48"
            />

            <Popover open={startOpen} onOpenChange={setStartOpen}>
              <PopoverTrigger asChild className="w-full md:w-48">
                <Button
                  variant="outline"
                  id="date"
                  className=" justify-between font-normal"
                >
                  {startDate
                    ? startDate.toLocaleDateString()
                    : "Select start date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setStartDate(date);
                    setStartOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild className="w-full md:w-48">
                <Button
                  variant="outline"
                  id="date"
                  className="justify-between font-normal"
                >
                  {endDate ? endDate.toLocaleDateString() : "Select end date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setEndDate(date);
                    setEndOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            <Select value={travelType} onValueChange={setTravelType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select travel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="SOLO">SOLO</SelectItem>
                  <SelectItem value="FAMILY">FAMILY</SelectItem>
                  <SelectItem value="FRIENDS">FRIENDS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <Button
        onClick={handleReset}
        className="mt-3 md:mt-0 w-full md:w-auto bg-blue-800 cursor-pointer"
      >
        Reset
      </Button>
    </div>
  );
};

export default TableFilterBar;
